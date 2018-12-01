import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, Input, OnInit} from '@angular/core';

import {EnvironmentType} from '../../../../../common/models/environment-type';
import {EnvironmentService} from '../../../../../common/services/environment.service';
import {FormService} from '../../../../../common/services/forms.service';
import {Environment} from '../../../../../common/models/environment';

@Component({
  templateUrl: './layer-create.component.html',
  styleUrls: ['./layer-create.component.scss']
})
export class LayerCreateComponent implements OnInit {

  @Input() environment: Environment;
  public layerForm: FormGroup;

  public isLoading = false;
  public submitted = false;
  public fs: FormService;

  constructor(protected environmentService: EnvironmentService,
              public fb: FormBuilder,
              public modal: NgbActiveModal) {
  }

  ngOnInit() {
    this.layerForm = this.fb.group({
      name: ['', Validators.required],
      customizable: [null, Validators.required]
    });
    this.fs = new FormService(this.layerForm, this);
  }

  get f() {
    return this.layerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.fs.markFormGroupTouched();
    if (this.layerForm.invalid) {
      this.submitted = false;
      return;
    }

    const input = new FormData();
    input.append('name', this.layerForm.get('name').value);
    input.append('customizable', this.layerForm.get('customizable').value ? '1' : '0');

    this.environmentService.postLayer(this.environment.environment_id, input)
      .toPromise()
      .then(response => this.modal.close(response))
      .catch(response => this.fs.manageErrors(response));
  }
}
