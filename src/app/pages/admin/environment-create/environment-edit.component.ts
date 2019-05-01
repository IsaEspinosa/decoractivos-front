import { Component, OnInit } from '@angular/core';
import { Environment } from '../../../common/models/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnvironmentType } from '../../../common/models/environment-type';
import { EnvironmentService } from '../../../common/services/environment.service';
import { CreateEnvironmentTypeComponent } from '../environment-type-create/environment-type-create.component';
import { FormService } from '../../../common/services/forms.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { flatMap, tap, first } from 'rxjs/operators';
import { Layer } from '../../../common/models/layer';

@Component({
  selector: 'app-create-environment-page',
  templateUrl: './environment-create.component.html',
  styleUrls: ['./environment-create.component.scss']
})
export class EditEnvironmentPageComponent implements OnInit {
  public environment: Environment;
  public environmentForm: FormGroup;
  public environmentTypes: Array<EnvironmentType>;
  public environmentTypesFiltered: Array<EnvironmentType> = [];
  public isLoading = false;
  public submitted = false;
  public isDragging = false;
  public fs: FormService;
  public imageChangedEvent: any = null;

  constructor(
    protected environmentService: EnvironmentService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.environmentForm = this.fb.group({
      name: ['', Validators.required],
      preview: [null],
      environment_type_id: [null, Validators.required]
    });

    this.environmentForm
      .get('environment_type_id')
      .valueChanges.subscribe(val => {
        if (typeof val === 'object' && val.action === 'add') {
          this.openAddModal(CreateEnvironmentTypeComponent);
        }
      });

    this.fs = new FormService(this.environmentForm, this);

    forkJoin(this.loadEnvironmentTypes(), this.loadEnvironment()).subscribe(
      ([types, environment]) => {
        const currentType = types.find(
          type => type.environment_type_id === environment.environment_type_id
        );
        this.f.environment_type_id.setValue(currentType);
      }
    );
  }

  loadEnvironmentTypes() {
    return this.environmentService
      .getTypes({
        orderBy: [['name', 'asc']]
      })
      .pipe(
        tap(
          environmentTypes =>
            (this.environmentTypesFiltered = this.environmentTypes = environmentTypes)
        )
      );
  }

  loadEnvironment() {
    return this.route.params.pipe(
      first(),
      flatMap(params => {
        const id = this.environmentService.extractIdFromSlug(
          params.environment_slug
        );
        return this.environmentService.getOne(id);
      }),
      tap(environment => {
        this.environment = <Environment>environment;
        this.f.name.setValue(environment.name);
      })
    );
  }

  get f() {
    return this.environmentForm.controls;
  }

  imageCropped($event) {
    this.environmentForm.get('preview').setValue($event.file);
    this.environmentForm.get('preview').markAsDirty();
  }

  removeImage() {
    this.imageChangedEvent = null;
    this.environmentForm.get('preview').setValue(null);
    this.environmentForm.get('preview').markAsPristine();
    this.environment.preview = null;
  }

  openAddModal(content) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
        centered: true
      })
      .result.then(result => {
        this.loadEnvironmentTypes();
        this.environmentForm.get('environment_type_id').setValue(result);
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
        return (this.environmentTypesFiltered = this.environmentTypes);
      }
      const value = element.value.toLowerCase().trim();

      return (this.environmentTypesFiltered = this.environmentTypes.filter(
        type => type.name.toLowerCase().includes(value)
      ));
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
    input.append(
      'environment_type_id',
      this.environmentForm.get('environment_type_id').value.environment_type_id
    );

    if (this.environmentForm.get('preview').dirty) {
      input.append('preview', this.environmentForm.get('preview').value);
    }

    return this.environmentService
      .put(this.environment.environment_id, input)
      .toPromise()
      .then(environment => this.reload())
      .catch(response => this.fs.manageErrors(response));
  }

  reload() {
    this.ngOnInit();
  }
}

export const EditEnvironmentInternalComponents = [EditEnvironmentPageComponent];
