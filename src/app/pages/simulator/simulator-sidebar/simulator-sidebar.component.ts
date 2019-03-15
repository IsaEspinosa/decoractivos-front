import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {Observable} from 'rxjs/index';
import {Layer} from '../../../common/models/layer';
import {LayerItem} from '../../../common/models/layer-item';
import {ItemCategory} from '../../../common/models/item-category';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-simulator-sidebar',
  templateUrl: './simulator-sidebar.component.html',
  styleUrls: ['./simulator-sidebar.component.scss']
})
export class SimulatorSidebarComponent implements OnInit {

  @Output('updateLayer') updateLayerEmitter = new EventEmitter<LayerItem>();

  public selectedLayer: Layer;
  public selectedCategory: ItemCategory;
  public filteredProducts: Array<LayerItem>;
  public _layers: Array<Layer>;

  @Input()
  set layers(layers: Array<Layer>) {
    this._layers = layers;
    this.changeLayer(this._layers[0]);
  }

  get layers() {
    return this._layers || [];
  }

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  changeLayer(layer: Layer) {
    if (!layer) return;
    this.selectedLayer = layer;
    this.changeCategory(this.selectedLayer, this.selectedLayer.categories[0]);
  }

  changeCategory(layer: Layer, category: ItemCategory) {
    if (!category) {
      this.filteredProducts = layer.items;
      return;
    }
    this.selectedCategory = category;
    this.filteredProducts = layer.items.filter((item) => item.category_id === category.category_id);
  }

  selectProduct(product) {
    this.updateLayerEmitter.emit(product);
  }
}
