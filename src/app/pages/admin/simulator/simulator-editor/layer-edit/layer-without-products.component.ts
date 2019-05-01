import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import Compressor from 'compressorjs';
import { EnvironmentService } from '../../../../../common/services/environment.service';
import { FormService } from '../../../../../common/services/forms.service';
import { Environment } from '../../../../../common/models/environment';
import { Layer } from '../../../../../common/models/layer';
import { DomSanitizer } from '@angular/platform-browser';
import { SnackService } from '../../../../../common/services/snack.service';

@Component({
  selector: 'app-admin-layer-without-products',
  templateUrl: './layer-without-products.component.html',
  styleUrls: ['./layer-without-products.component.scss']
})
export class LayerWithoutProductsComponent implements OnChanges {
  // tslint:disable-next-line
  @Input("environment") environment: Environment;
  // tslint:disable-next-line
  @Input("layer") originalLayer: Layer;
  @Output() close = new EventEmitter<any>();
  @Output() removeLayer = new EventEmitter<Array<Layer>>();
  @Output() update = new EventEmitter<Layer>();

  public layer: Layer;
  public layerForm: FormGroup;
  public fs: FormService;
  public imageChangedEvent: any = null;
  public isDragging = false;
  public submitted = false;
  public image: any;
  public editMode = false;

  constructor(
    protected environmentService: EnvironmentService,
    private sanitizer: DomSanitizer,
    private snackBar: SnackService,
    private fb: FormBuilder
  ) {}

  ngOnChanges() {
    this.editMode = false;
    this.layer = {
      ...this.originalLayer,
      items: [...this.originalLayer.items]
    };

    if (this.layer.items.length) {
      this.image = this.layer.items[0].image_simulator;
    }

    this.layerForm = this.fb.group({
      name: [this.layer.name, Validators.required],
      image: [null, (control: FormControl) => this.checkImageValid(control)]
    });
    this.layerForm
      .get('name')
      .valueChanges.subscribe(val => (this.layer.name = val));

    this.fs = new FormService(this.layerForm, this);
  }

  get f() {
    return this.layerForm.controls;
  }

  checkImageValid(control: FormControl) {
    if (this.layer.items.length && this.image) return null;
    return Validators.required(control);
  }

  imageCropped(files) {
    if (files.length) {
      // tslint:disable-next-line
      new Compressor(files[0], {
        quality: 0.6,
        success: result => {
          this.layerForm.get('image').setValue(result);
          this.layerForm.get('image').markAsDirty();
          this.image = this.sanitizer.bypassSecurityTrustResourceUrl(
            URL.createObjectURL(result)
          );
        },
        error: err => {
          this.snackBar.snackError(err);
        }
      });
    }
  }

  removeImage() {
    this.image = null;
    this.layerForm.get('image').setValue(null);
    this.layerForm.get('image').markAsDirty();
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
    const image = this.layerForm.get('image').value;
    if (image) input.append('image', image);

    return this.environmentService
      .putLayer(this.environment.environment_id, this.layer.layer_id, input)
      .toPromise()
      .then(layer => {
        this.submitted = false;
        this.editMode = false;
        this.update.emit(layer);
      })
      .catch(response => this.fs.manageErrors(response));
  }

  remove() {
    return this.environmentService
      .removeLayer(this.environment.environment_id, this.layer.layer_id)
      .toPromise()
      .then(layers => {
        this.removeLayer.emit(layers);
        this.close.emit();
      });
  }
}
