import { Component } from '@angular/core';
import { ChronoViewComponent} from "./chrono-view/chrono-view.component";

@Component({
  selector: 'app-root',
  imports: [ChronoViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
