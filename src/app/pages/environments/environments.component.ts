import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs/index";
import {Environment} from "../../common/models/environment";
import {EnvironmentType} from "../../common/models/environment-type";
import {EnvironmentService} from "../../common/services/environment.service";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {EnvironmentListComponent} from "./environment-list/environment-list.component";

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.scss']
})
export class EnvironmentsComponent implements OnInit {

  protected environments: Observable<Array<Environment>>;
  protected environmentTypes: Observable<Array<EnvironmentType>>;
  protected selectedEnvType: EnvironmentType = null;
  protected query = {limit: 10, page: 1, where: {environment_type_id: null}}
  protected isLoading: boolean = false


  constructor(protected environmentService: EnvironmentService) {
  }

  ngOnInit() {
    this.environmentTypes = this.environmentService.getTypes();
    this.selectEnvironmentType(null)
  }

  selectEnvironmentType(type: EnvironmentType) {
    if (!type) {
      delete this.query.where.environment_type_id
    } else {
      this.query.where.environment_type_id = type.environment_type_id
    }
    this.selectedEnvType = type;
    this.isLoading = true;
    setTimeout(() => {
      this.environments = this.environmentService.getList(this.query);
      this.environments.subscribe(() => setTimeout(() => this.isLoading = false, 500))
    }, 500)
  }

  isEnvironmentActive(environment: Environment) {
    return !this.selectedEnvType || environment.environment_type_id === this.selectedEnvType.environment_type_id
  }

  isCategoryActive(type: EnvironmentType) {
    return this.selectedEnvType === type
  }

}

export const EnvironmentsInternalComponents = [
  EnvironmentsComponent,
  SidebarComponent,
  EnvironmentListComponent,
];
