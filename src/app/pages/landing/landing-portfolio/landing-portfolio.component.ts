import { Component, OnInit } from '@angular/core';
import { EnvironmentsComponent } from '../../environments/environments.component';
import { EnvironmentType } from '../../../common/models/environment-type';

@Component({
  selector: 'app-landing-portfolio',
  templateUrl: './landing-portfolio.component.html',
  styleUrls: ['./landing-portfolio.component.scss']
})
export class LandingPortfolioComponent extends EnvironmentsComponent
  implements OnInit {
  ngOnInit() {
    this.environmentTypes = this.environmentService.getTypes({
      orderBy: [['name', 'asc']]
    });
    this.selectEnvironmentType(null);
  }
}
