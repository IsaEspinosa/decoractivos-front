import {Component, OnInit} from '@angular/core';
import {SimulatorSidebarComponent} from "./simulator-sidebar/simulator-sidebar.component";
import {ActivatedRoute, Router} from "@angular/router";
import {EnvironmentService} from "../../common/services/environment.service";
import {flatMap} from "rxjs/operators";
import {Observable} from "rxjs/index";
import {Environment} from "../../common/models/environment";

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})
export class SimulatorComponent implements OnInit {

  private environment: Observable<Environment>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private environmentService: EnvironmentService) {
  }

  ngOnInit() {
    this.environment = this.route
      .params
      .pipe(
        flatMap(params => this.environmentService
          .getOne(params.environment_slug.replace(/^[a-zA-Z\-\d]+\-(\d+)$/, "$1")))
      )
  }

}

export const SimulatorInternalComponents = [
  SimulatorComponent,
  SimulatorSidebarComponent
];
