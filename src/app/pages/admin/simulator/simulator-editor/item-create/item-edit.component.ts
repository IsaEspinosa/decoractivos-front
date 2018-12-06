import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {EnvironmentService} from '../../../../../common/services/environment.service';
import {FormService} from '../../../../../common/services/forms.service';
import {SnackService} from '../../../../../common/services/snack.service';
import {ItemCreateComponent} from './item-create.component';

@Component({
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss']
})
export class ItemEditComponent extends ItemCreateComponent implements OnInit {

  constructor(protected environmentService: EnvironmentService,
              protected fb: FormBuilder,
              protected sanitizer: DomSanitizer,
              protected snackBar: SnackService,
              protected modal: NgbActiveModal) {
    super(environmentService, fb, sanitizer, snackBar, modal);
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: [this.item.name, Validators.required],
      category_id: [
        this.item.category_id ? this.layer.categories
          .find(category => category.category_id.toString() === this.item.category_id.toString()) : null,
        (control: FormControl) => this.categoryIdValidator(control)
      ],
      preview: [null, this.imageValidator('preview')],
      image_simulator: [null, this.imageValidator('simulator')]
    });

    this.previewImage = this.item.preview;
    this.simulatorImage = this.item.image_simulator;

    this.categories = this.layer.categories.slice();
    this.fs = new FormService(this.productForm, this);
  }

  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.fs.markFormGroupTouched();
    if (this.productForm.invalid) {
      this.submitted = false;
      return;
    }

    const category_id = this.productForm.get('category_id').value.category_id;
    const preview = this.productForm.get('preview').value;
    const imageSimulator = this.productForm.get('image_simulator').value;

    const input = new FormData();
    input.append('name', this.productForm.get('name').value);
    if (category_id) {
      input.append('category_id', category_id);
    }
    if (preview) {
      input.append('preview', preview);
    }
    if (imageSimulator) {
      input.append('image_simulator', imageSimulator);
    }
    return this.environmentService.putItem(this.environment.environment_id, this.layer.layer_id, this.item.item_id, input).toPromise()
      .then(response => this.modal.close(response))
      .catch(response => {
        this.submitted = false;
      });
  }
}
