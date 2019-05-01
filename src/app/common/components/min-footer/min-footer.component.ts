import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-min-footer',
  templateUrl: './min-footer.component.html',
  styleUrls: ['./min-footer.component.scss']
})
export class MinFooterComponent extends FooterComponent {
  constructor() {
    super();
  }
}
