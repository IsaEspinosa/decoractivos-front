import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EnvironmentService} from '../../../../../common/services/environment.service';
import {FormService} from '../../../../../common/services/forms.service';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Component} from '@angular/core';
import {Environment} from '../../../../../common/models/environment';
import {Layer} from '../../../../../common/models/layer';
import {ItemCategory} from '../../../../../common/models/item-category';

@Component({
  templateUrl: './layer-delete.component.html',
  styleUrls: ['./layer-delete.component.scss']
})
export class DeleteLayerComponent {

  public environment: Environment;
  public layer: Layer;

  public isLoading = false;

  constructor(protected environmentService: EnvironmentService,
              public modal: NgbActiveModal) {
  }

  onSubmit() {
    this.modal.close(true);
  }
}
