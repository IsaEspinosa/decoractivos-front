import { Component, Input, OnInit } from '@angular/core';
import { Environment } from '../../../common/models/environment';

@Component({
  selector: 'app-landing-environment-card',
  templateUrl: './landing-environment-card.component.html',
  styleUrls: ['./landing-environment-card.component.scss']
})
export class LandingEnvironmentCardComponent implements OnInit {
  @Input() environment: Environment;

  constructor() {}

  ngOnInit() {}
}
