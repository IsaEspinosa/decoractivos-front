import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs/index';
import { Environment } from '../../../common/models/environment';
import { EnvironmentType } from '../../../common/models/environment-type';
import { EnvironmentService } from '../../../common/services/environment.service';

@Component({
  templateUrl: './environment-list.component.html',
  styleUrls: ['./environment-list.component.scss']
})
export class EnvironmentListPageComponent implements OnInit {
  public environments: Observable<Array<Environment>>;
  public environmentTypes: Observable<Array<EnvironmentType>>;
  public selectedEnvType: EnvironmentType = null;
  public query = {
    limit: 10,
    page: 1,
    where: null
  };
  public isLoading = false;

  constructor(protected environmentService: EnvironmentService) {}

  ngOnInit() {
    this.environmentTypes = this.environmentService.getTypes({
      orderBy: [['name', 'asc']]
    });
    this.selectEnvironmentType(null);
  }

  selectEnvironmentType(type: EnvironmentType) {
    if (!type) {
      delete this.query.where;
    } else {
      this.query.where = ['environment_type_id', type.environment_type_id];
    }
    this.selectedEnvType = type;
    this.isLoading = true;
    setTimeout(() => {
      this.environments = this.environmentService.getList(this.query);
      this.environments.subscribe(() =>
        setTimeout(() => (this.isLoading = false), 500)
      );
    }, 500);
  }

  isEnvironmentActive(environment: Environment) {
    return (
      !this.selectedEnvType ||
      environment.environment_type_id ===
        this.selectedEnvType.environment_type_id
    );
  }

  isCategoryActive(type: EnvironmentType) {
    return this.selectedEnvType === type;
  }
}

export const EnvironmentListInternalComponents = [EnvironmentListPageComponent];
