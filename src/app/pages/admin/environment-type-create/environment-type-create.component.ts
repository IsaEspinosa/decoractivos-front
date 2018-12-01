import {Observable, of} from 'rxjs';
import {map, last} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EnvironmentType} from '../../../common/models/environment-type';
import {EnvironmentService} from '../../../common/services/environment.service';
import {FormService} from '../../../common/services/forms.service';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-create-environment-type-component',
  templateUrl: './environment-type-create.component.html',
  styleUrls: ['./environment-type-create.component.scss']
})
export class CreateEnvironmentTypeComponent implements OnInit {

  public environment: EnvironmentType = new EnvironmentType();
  public environmentForm: FormGroup;
  public isLoading = false;
  public submitted = false;
  public fs: FormService;

  constructor(protected environmentService: EnvironmentService,
              public fb: FormBuilder,
              public modal: NgbActiveModal) {
  }

  ngOnInit() {
    this.environmentForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.fs = new FormService(this.environmentForm, this);
  }

  get f() {
    return this.environmentForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.fs.markFormGroupTouched();
    if (this.environmentForm.invalid) {
      this.submitted = false;
      return;
    }

    const input = new FormData();
    input.append('name', this.environmentForm.get('name').value);

    this.environmentService.postType(input)
      .toPromise()
      .then(response => this.modal.close(response))
      .catch(response => this.fs.manageErrors(response));
  }
}
