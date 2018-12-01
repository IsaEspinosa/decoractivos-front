import {Observable, of} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EnvironmentService} from '../../../../../common/services/environment.service';
import {FormService} from '../../../../../common/services/forms.service';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, OnInit} from '@angular/core';
import {Environment} from '../../../../../common/models/environment';
import {Layer} from '../../../../../common/models/layer';

@Component({
  selector: 'app-create-environment-type-component',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  public environment: Environment;
  public layer: Layer;
  public hasGeneralItems: boolean;

  public categoryForm: FormGroup;
  public isLoading = false;
  public submitted = false;
  public fs: FormService;

  constructor(protected environmentService: EnvironmentService,
              public fb: FormBuilder,
              public modal: NgbActiveModal) {
  }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, (control: FormControl) => this.checkCategoryName(control)]]
    });
    this.fs = new FormService(this.categoryForm, this);
  }

  get f() {
    return this.categoryForm.controls;
  }

  checkCategoryName(control: FormControl): { [key: string]: any } | null {
    if (!control.value) return null;
    const name = control.value.toLowerCase();
    const itemFound = this.layer.categories.find(category => category.name.toLowerCase() === name);
    return itemFound ? {exists: true} : null;
  }

  onSubmit() {
    this.submitted = true;
    this.fs.markFormGroupTouched();
    if (this.categoryForm.invalid) {
      this.submitted = false;
      return;
    }

    const input = new FormData();
    input.append('name', this.categoryForm.get('name').value);

    this.environmentService.postCategory(this.environment.environment_id, this.layer.layer_id, input)
      .toPromise()
      .then(response => this.modal.close(response))
      .catch(response => this.fs.manageErrors(response));
  }
}
