import {Component, OnInit, ViewChild} from '@angular/core';
import {Environment} from '../../../common/models/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EnvironmentType} from '../../../common/models/environment-type';
import {EnvironmentService} from '../../../common/services/environment.service';
import {CreateEnvironmentTypeComponent} from '../environment-type-create/environment-type-create.component';
import {FormService} from '../../../common/services/forms.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material';

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
  public isDragging = false;
  public fs: FormService;
  public imageChangedEvent: any = null;

  @ViewChild(MatAutocompleteTrigger) autoTrigger: MatAutocompleteTrigger;

  constructor(protected environmentService: EnvironmentService,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private router: Router) {
  }

  ngOnInit() {
    this.loadEnvironmentTypes();
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

    this.fs = new FormService(this.environmentForm, this);
  }

  loadEnvironmentTypes() {
    return this.environmentService
      .getTypes({
        orderBy: [
          ['name', 'asc']
        ]
      })
      .pipe(
        tap(environmentTypes => this.environmentTypesFiltered = this.environmentTypes = environmentTypes)
      )
      .subscribe();
  }

  get f() {
    return this.environmentForm.controls;
  }

  imageCropped($event) {
    this.environmentForm.get('preview').setValue($event.file);
    this.environmentForm.get('preview').markAsDirty();
  }

  openAddModal(content) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
        centered: true
      })
      .result
      .then(result => {
        this.loadEnvironmentTypes();
        this.environmentForm.get('environment_type_id').setValue(result);
        this.autoTrigger.closePanel();
      });
  }

  removeImage() {
    this.imageChangedEvent = null;
    this.environmentForm.get('preview').setValue(null);
    this.environmentForm.get('preview').markAsPristine();
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
      this.submitted = false;
      return;
    }

    const input = new FormData();
    input.append('name', this.environmentForm.get('name').value);
    input.append('preview', this.environmentForm.get('preview').value);
    input.append('environment_type_id', this.environmentForm.get('environment_type_id').value.environment_type_id);

    return this.environmentService.post(input).toPromise()
      .then(environment => this.router.navigate([`/admin/ambientes/${environment.slug}/editar`]))
      .catch(response => this.fs.manageErrors(response));
  }
}

export const CreateEnvironmentInternalComponents = [
  CreateEnvironmentPageComponent,
];
