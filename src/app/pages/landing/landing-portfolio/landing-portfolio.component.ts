import {Component, OnInit} from '@angular/core';
import {EnvironmentService} from "../../../common/services/environment.service";
import {Observable} from "rxjs/index";
import {Environment} from "../../../common/models/environment";

@Component({
  selector: 'app-landing-portfolio',
  templateUrl: './landing-portfolio.component.html',
  styleUrls: ['./landing-portfolio.component.scss']
})
export class LandingPortfolioComponent implements OnInit {

  private environments: Observable<Array<Environment>>;

  constructor(private environmentService: EnvironmentService) {
  }

  ngOnInit() {
    this.environments = this.environmentService.getList();
  }

}
