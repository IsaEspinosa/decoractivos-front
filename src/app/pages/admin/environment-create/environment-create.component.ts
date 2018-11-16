import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, last} from 'rxjs/operators';
import {Environment} from '../../../common/models/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EnvironmentType} from '../../../common/models/environment-type';
import {EnvironmentService} from '../../../common/services/environment.service';
import {CreateEnvironmentTypeComponent} from '../environment-type-create/environment-type-create.component';
import {FormService} from '../../../common/services/forms.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-create-environment-page',
  templateUrl: './environment-create.component.html',
  styleUrls: ['./environment-create.component.scss']
})
export class CreateEnvironmentPageComponent implements OnInit {

  public environment: Environment = new Environment();
  public environmentForm: FormGroup;
  public environmentTypes: Array<EnvironmentType>;
  public environmentTypesFiltered: Array<EnvironmentType> = [];
  public isLoading = false;
  public submitted = false;
  public fs: FormService;


  constructor(protected environmentService: EnvironmentService,
              private fb: FormBuilder,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.environmentService.getTypes().subscribe(environmentTypes => {
      this.environmentTypesFiltered = this.environmentTypes = environmentTypes;
    });
    this.environmentForm = this.fb.group({
      name: ['', Validators.required],
      preview: [null, Validators.required],
      environment_type_id: [null, Validators.required]
    });

    this.environmentForm.get('environment_type_id').valueChanges
      .subscribe(val => {
        if (typeof val === 'object' && val.action === 'add') {
          this.openAddModal(CreateEnvironmentTypeComponent);
        }
      });

    this.openAddModal(CreateEnvironmentTypeComponent);

    this.fs = new FormService(this.environmentForm, this);
  }

  get f() {
    return this.environmentForm.controls;
  }

  onFileChange($event) {
    if ($event.target.files.length > 0) {
      const file = $event.target.files[0];
      this.environmentForm.get('preview').setValue(file);
    }
  }

  openAddModal(content) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
        centered: true
      })
      .result
      .then((result) => {
        console.log(result);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  getTypeName(type) {
    return !type || type === 'add' ? '' : type.name;
  }

  filterTypes(element) {
    if (!this.environmentTypes) {
      return;
    }

    setTimeout(() => {
      if (!element || !element.value) {
        return this.environmentTypesFiltered = this.environmentTypes;
      }
      const value = element.value.toLowerCase().trim();

      return this.environmentTypesFiltered = this.environmentTypes
        .filter(type => type.name.toLowerCase().includes(value));
    });
  }

  onSubmit() {
    this.submitted = true;
    this.fs.markFormGroupTouched();
    if (this.environmentForm.invalid) {
      return;
    }

    const input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by looping through `this.form.controls`, but we'll keep it as simple as possible here
    input.append('name', this.environmentForm.get('name').value);
    input.append('avatar', this.environmentForm.get('preview').value);

    alert('SUCCESS!! :-)');
  }
}

export const CreateEnvironmentInternalComponents = [
  CreateEnvironmentPageComponent,
];
