import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {

}
