import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, OnInit} from '@angular/core';
import Compressor from 'compressorjs';
import {DomSanitizer} from '@angular/platform-browser';

import {EnvironmentService} from '../../../../../common/services/environment.service';
import {FormService} from '../../../../../common/services/forms.service';
import {Environment} from '../../../../../common/models/environment';
import {Layer} from '../../../../../common/models/layer';
import {ItemCategory} from '../../../../../common/models/item-category';
import {LayerItem} from '../../../../../common/models/layer-item';
import {SnackService} from '../../../../../common/services/snack.service';

@Component({
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss']
})
export class ItemCreateComponent implements OnInit {
  public environment: Environment;
  public layer: Layer;
  public item: LayerItem;
  public productForm: FormGroup;
  public categories: Array<ItemCategory>;

  public isLoading = false;
  public submitted = false;
  public fs: FormService;
  public simulatorImage: string = null;
  public isDraggingImage = false;
  public previewImage: string = null;
  public isDraggingPreview = false;


  constructor(protected environmentService: EnvironmentService,
              protected fb: FormBuilder,
              protected sanitizer: DomSanitizer,
              protected snackBar: SnackService,
              public modal: NgbActiveModal) {
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category_id: ['', (control: FormControl) => this.categoryIdValidator(control)],
      preview: [null, this.imageValidator('preview')],
      image_simulator: [null, this.imageValidator('simulator')]
    });

    this.categories = this.layer.categories.slice();
    this.fs = new FormService(this.productForm, this);
  }

  imageValidator(image) {
    return (control: FormControl) => {
      if (control.value || this[`${image}Image`]) return null;
      return {required: true};
    };
  }

  categoryIdValidator(control: FormControl) {
    if (!this.layer.categories.length && !control.value) return null;
    const category = control.value;
    if (typeof category === 'string' || !this.layer.categories.includes(category)) return {unselected: true};
    return null;
  }

  get f() {
    return this.productForm.controls;
  }

  imageCropped(files, field, width, componentProp = field) {
    if (files.length) {
      // tslint:disable-next-line
      new Compressor(files[0], {
        quality: 0.8,
        strict: false,
        width,
        maxWidth: width,
        success: result => {
          this.productForm.get(field).setValue(result);
          this.productForm.get(field).markAsDirty();
          this[`${componentProp}Image`] = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(result));
        },
        error: err => {
          this.snackBar.snackError(err);
        },
      });
    }
  }

  removeImage(field, componentProp = field) {
    this.productForm.get(field).setValue(null);
    this.productForm.get(field).markAsPristine();
    this[`${componentProp}Image`] = null;
  }

  getTypeName(type) {
    return type.name;
  }

  filterTypes(element) {
    setTimeout(() => {
      if (!element || !element.value) {
        return this.categories = this.layer.categories.slice();
      }
      const value = element.value.toLowerCase().trim();
      return this.categories = this.layer.categories
        .filter(category => category.name.toLowerCase().includes(value));
    });
  }

  onSubmit() {
    this.submitted = true;
    this.fs.markFormGroupTouched();
    if (this.productForm.invalid) {
      this.submitted = false;
      return;
    }

    const category_id = this.productForm.get('category_id').value.category_id;

    const input = new FormData();
    input.append('name', this.productForm.get('name').value);
    if (category_id) {
      input.append('category_id', category_id);
    }
    input.append('preview', this.productForm.get('preview').value);
    input.append('image_simulator', this.productForm.get('image_simulator').value);
    return this.environmentService.postItem(this.environment.environment_id, this.layer.layer_id, input).toPromise()
      .then(response => this.modal.close(response))
      .catch(response => {
        this.submitted = false;
      });
  }
}
