import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {groupBy, map} from 'lodash';

import {EnvironmentService} from '../../../../../common/services/environment.service';
import {FormService} from '../../../../../common/services/forms.service';
import {Environment} from '../../../../../common/models/environment';
import {Layer} from '../../../../../common/models/layer';
import {SnackService} from '../../../../../common/services/snack.service';
import {ItemCategory} from '../../../../../common/models/item-category';
import {LayerItem} from '../../../../../common/models/layer-item';
import {CreateCategoryComponent} from '../category-create/category-create.component';
import {UpdateCategoryComponent} from '../category-create/category-update.component';
import {DeleteCategoryComponent} from '../category-create/category-delete.component';
import {ItemCreateComponent} from '../item-create/item-create.component';
import {ItemEditComponent} from '../item-create/item-edit.component';


@Component({
  selector: 'app-admin-layer-with-products',
  templateUrl: './layer-with-products.component.html',
  styleUrls: ['./layer-without-products.component.scss']
})
export class LayerWithProductsComponent implements OnChanges {

  // tslint:disable-next-line
  @Input('environment') environment: Environment;
  // tslint:disable-next-line
  @Input('layer') originalLayer: Layer;
  @Input() layerInSimulator: any;

  @Output() close = new EventEmitter<any>();
  @Output() removeLayer = new EventEmitter<Array<Layer>>();
  @Output() update = new EventEmitter<Layer>();
  @Output() updateSelectedProduct = new EventEmitter<LayerItem>();

  public layer: Layer;
  public layerForm: FormGroup;
  public fs: FormService;
  public submitted = false;
  public image: any;
  public groups: any;
  public groupsIds: Array<any>;

  private __items: Array<ItemCategory>;

  constructor(protected environmentService: EnvironmentService,
              private sanitizer: DomSanitizer,
              private snackBar: SnackService,
              private fb: FormBuilder,
              private modalService: NgbModal) {
  }

  ngOnChanges() {
    this.layer = {
      ...this.originalLayer,
      items: [...this.originalLayer.items]
    };
    this.items = this.layer.items;

    this.layerForm = this.fb.group({
      name: [this.layer.name, Validators.required],
    });
    this.layerForm.get('name').valueChanges
      .subscribe(val => this.layer.name = val);

    this.fs = new FormService(this.layerForm, this);
  }

  set items(items: Array<ItemCategory>) {
    this.__items = items;
    this.groups = map(groupBy(items, 'category_id'), (group, key) => {
      return {
        category: this.layer.categories.find(category => category.category_id === parseInt(key, 10)),
        items: group
      };
    });
    this.groupsIds = this.groups.map(group => group.category ? group.category.category_id.toString() : null);
    this.layer.categories.forEach(category => {
      if (!this.groupsIds.slice().includes(category.category_id.toString())) {
        this.groupsIds.push(category.category_id);
        this.groups.push({
          category,
          items: []
        });
      }
    });
  }

  get items() {
    return this.__items;
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

    return this.environmentService.putLayer(this.environment.environment_id, this.layer.layer_id, input).toPromise()
      .then(layer => {
        this.submitted = false;
        this.update.emit(layer);
      })
      .catch(response => this.fs.manageErrors(response));
  }

  updateDefaultItemLayer(itemLayer: LayerItem) {
    this.submitted = true;

    const input = new FormData();
    input.append('default_item', itemLayer.item_id.toString());

    return this.environmentService.putLayer(this.environment.environment_id, this.layer.layer_id, input).toPromise()
      .then(layer => {
        this.submitted = false;
        this.update.emit(layer);
      })
      .catch(response => this.fs.manageErrors(response));
  }

  remove() {
    return this.environmentService.removeLayer(this.environment.environment_id, this.layer.layer_id).toPromise()
      .then(layers => {
        this.removeLayer.emit(layers);
        this.close.emit();
      });
  }

  updateSelected(item: LayerItem) {
    this.updateSelectedProduct.emit(item);
  }

  openCreateCategory() {
    const modalRef = this.modalService
      .open(CreateCategoryComponent, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
        centered: true
      });
    modalRef.componentInstance.environment = this.environment;
    modalRef.componentInstance.layer = this.layer;
    modalRef.componentInstance.hasGeneralItems = this.groupsIds.includes(null);

    modalRef.result.then(layer => this.update.emit(layer));
  }

  openUpdateCategory(category: ItemCategory) {
    const modalRef = this.modalService
      .open(UpdateCategoryComponent, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
        centered: true
      });
    modalRef.componentInstance.environment = this.environment;
    modalRef.componentInstance.layer = this.layer;
    modalRef.componentInstance.hasGeneralItems = this.groupsIds.includes(null);
    modalRef.componentInstance.category = category;

    modalRef.result.then(layer => this.update.emit(layer));
  }

  openDeleteCategory(category: ItemCategory) {
    const modalRef = this.modalService
      .open(DeleteCategoryComponent, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
        centered: true
      });
    modalRef.componentInstance.environment = this.environment;
    modalRef.componentInstance.layer = this.layer;
    modalRef.componentInstance.category = category;

    modalRef.result.then(layer => this.update.emit(layer));
  }

  openItem(ModalComponent) {
    const modalRef = this.modalService
      .open(ModalComponent, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
        centered: true
      });
    modalRef.componentInstance.environment = this.environment;
    modalRef.componentInstance.layer = this.layer;

    modalRef.result.then(layer => this.update.emit(layer));
    return modalRef;
  }

  openCreateItem() {
    this.openItem(ItemCreateComponent);
  }

  openEditItem(item: LayerItem) {
    const modalRef = this.openItem(ItemEditComponent);
    modalRef.componentInstance.item = item;
  }
}
