export enum Direction {
  UP = 1,
  DOWN = -1
}

export type Status = "STOPPED" | "RUNNING" | "PAUSED";

export type StatusActions = {[K in Status]: () => void};