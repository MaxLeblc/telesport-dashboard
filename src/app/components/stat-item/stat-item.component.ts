import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-item.component.html',
  styleUrls: ['./stat-item.component.scss']
})
export class StatItemComponent {
  @Input() label: string = '';
  @Input() value: string | number | null = '';
}