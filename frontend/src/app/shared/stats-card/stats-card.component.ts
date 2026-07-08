import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.css']
})
export class StatsCardComponent {
  @Input() label = '';
  @Input() value: number | string = 0;
  @Input() icon = 'bi-bar-chart-line';
  @Input() accent = 'primary';
}
