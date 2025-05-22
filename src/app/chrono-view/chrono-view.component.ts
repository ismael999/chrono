import { Component, inject, Input } from '@angular/core';
import { Direction } from '../chrono/models/chrono';
import { ChronoService } from '../chrono/chrono.service';

@Component({
  selector: 'app-chrono-view',
  imports: [],
  templateUrl: './chrono-view.component.html',
  styleUrl: './chrono-view.component.css'
})
export class ChronoViewComponent {

  @Input() showStatus = true;
  @Input() showDirection = true;

  directions = Direction
  readonly chornoService = inject(ChronoService);
}
