import { computed, effect, Injectable, signal } from '@angular/core';
import { Direction, Status, StatusActions } from './models/chrono';
import { formattedTime } from '../utils/time-format.util';

@Injectable({
  providedIn: 'root'
})
export class ChronoService {

  /** Private atributes */
  private readonly _status = signal<Status>("STOPPED");
  private readonly _direction = signal<Direction>(Direction.UP);
  private readonly _seconds = signal<number>(0);
  private intervalId?: ReturnType<typeof setInterval>;

  private readonly actions: StatusActions = {
    RUNNING: this.__runTimer.bind(this),
    STOPPED: this.__stopTimer.bind(this),
    PAUSED: this.clearInterval.bind(this),
  };

  /** Public atributes */
  readonly time = computed<string>(() => formattedTime(this._seconds()));
  readonly directionName = computed<string>(() => this._direction() == Direction.UP ? 'UP' : 'DOWN');
  readonly status = this._status.asReadonly();
  readonly direction = this._direction.asReadonly();
  readonly seconds = this._seconds.asReadonly();

  constructor() {
    effect(() => this.actions[this._status()]());
    effect(() => this.handleNegativeTime(this._seconds()));
  }

  pause() { this._status.set("PAUSED") }
  resume() { this._status.set("RUNNING") }
  up() { this._direction.set(Direction.UP) }
  down() { this._direction.set(Direction.DOWN) }
  reset() { this._status.set("STOPPED") }
  start() {
    this._direction.set(Direction.UP);
    this._seconds.set(0);
    this._status.set("RUNNING");
  };

  private handleNegativeTime(time: number) {
    if (time < 0) { this._status.set("STOPPED") }
  }

  private clearInterval() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }

  private __runTimer() {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => {
      this._seconds.update(seconds => seconds + this._direction())
    }, 10);
  }

  private __stopTimer() {
    this.clearInterval();
    this._direction.set(Direction.UP);
    this._seconds.set(0);
  }
}
