import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { EnvironmentService } from '../../../../../common/services/environment.service';
import { FormService } from '../../../../../common/services/forms.service';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { Environment } from '../../../../../common/models/environment';
import { Layer } from '../../../../../common/models/layer';
import { ItemCategory } from '../../../../../common/models/item-category';

@Component({
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class DeleteCategoryComponent {
  public environment: Environment;
  public layer: Layer;
  public category: ItemCategory;

  public isLoading = false;
  public submitted = false;

  constructor(
    protected environmentService: EnvironmentService,
    public modal: NgbActiveModal
  ) {}

  onSubmit() {
    this.submitted = true;

    this.environmentService
      .deleteCategory(
        this.environment.environment_id,
        this.layer.layer_id,
        this.category.category_id
      )
      .toPromise()
      .then(response => this.modal.close(response))
      .catch(response => {
        this.submitted = false;
      });
  }
}
