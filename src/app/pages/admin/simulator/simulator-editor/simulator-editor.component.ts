import {omit} from 'lodash';
import {flatMap} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {forkJoin, Observable} from 'rxjs/index';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {Environment} from '../../../../common/models/environment';
import {EnvironmentType} from '../../../../common/models/environment-type';
import {EnvironmentService} from '../../../../common/services/environment.service';
import {Layer} from '../../../../common/models/layer';
import {LayerItem} from '../../../../common/models/layer-item';

import {SimulatorPanelComponent} from './simulator-panel/simulator-panel.component';
import {SimulatorLayersHandlerComponent} from './simulator-layers-handler/simulator-layers-handler.component';
import {LayerWithoutProductsComponent} from './layer-edit/layer-without-products.component';
import {LayerWithProductsComponent} from './layer-edit/layer-with-products.component';
import {LayerCreateComponent} from './layer-create/layer-create.component';

@Component({
  templateUrl: './simulator-editor.component.html',
  styleUrls: ['./simulator-editor.component.scss']
})
export class SimulatorEditorPageComponent implements OnInit {

  public environment: Environment = new Environment();
  public _layers: Array<Layer> = [];
  public layersInSimulator: Array<any> = [];
  public layersInSidebar: Array<Layer> = [];
  public __selectedLayer: Layer = null;
  public selectedLayerInSimulator: any = null;
  public updatingLayers = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private environmentService: EnvironmentService) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        flatMap(params => {
          const id = this.environmentService.extractIdFromSlug(params.environment_slug);
          return forkJoin([
            this.environmentService.getOne(id),
            this.environmentService.getLayers(id)
          ]);
        })
      )
      .subscribe(([environment, layers]) => {
        this.environment = environment;
        this.layers = layers;
      });
  }

  set selectedLayer(layer) {
    if (layer) {
      this.__selectedLayer = layer;
      this.selectedLayerInSimulator = this.layersInSimulator.find(layerIS => layerIS.layer_id === layer.layer_id);
    } else {
      this.selectedLayerInSimulator = this.__selectedLayer = layer;
    }
  }

  get selectedLayer() {
    return this.__selectedLayer;
  }

  reorderLayers($event) {
    this.updatingLayers = true;

    const {currentIndex, previousIndex} = $event;
    const layers = this.layers.filter((layer, index) => index !== previousIndex);
    layers.splice(currentIndex, 0, this.layers[previousIndex]);

    const newLayers = layers.map((layer, index) => {
      layer.layer_index = index;
      return {layer_id: layer.layer_id, layer_index: layer.layer_index};
    });

    this.environmentService
      .reorderLayers(this.environment.environment_id, newLayers)
      .toPromise()
      .then(updatedLayers => {
        this.layers = updatedLayers;
        this.updatingLayers = false;
      })
      .catch(() => this.updatingLayers = false);

    this.layers = layers;
  }

  openAddLayerModal() {
    const modalRef = this.modalService
      .open(LayerCreateComponent, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
        centered: true
      });
    modalRef.componentInstance.environment = this.environment;

    modalRef
      .result
      .then(result => {
        this.selectedLayer = result;
        this.layers = [
          ...this.layers,
          result
        ];
      });
  }

  updateLayerData(layer: Layer) {
    const newLayers = this.layers.slice();
    newLayers.splice(layer.layer_index, 1, layer);
    this.layers = newLayers;
    this.selectedLayer = layer;
  }

  removeLayer(layers) {
    this.layers = layers;
  }

  set layers(layers) {
    layers = layers.sort((prev, next) => prev.layer_index - next.layer_index);
    this._layers = layers;

    this.layersInSidebar = layers.filter((layer) => layer.customizable);
    this.resetLayers();
  }

  get layers() {
    return this._layers;
  }

  resetLayers() {
    this.layersInSimulator = this.layers.map((layer) => {
      const newLayer = <any>omit(layer, ['items', 'default_item', 'customizable']);
      newLayer.currentItem = layer.items.find(item => item.item_id === layer.default_item);
      return newLayer;
    });
  }

  updateLayer(item: LayerItem) {
    const layer = this.layersInSimulator.find(layer => layer.layer_id === item.layer_id);
    layer.currentItem = item;
    this.layersInSimulator = this.layersInSimulator.slice();
  }
}

export const SimulatorEditorInternalComponents = [
  SimulatorEditorPageComponent,
  SimulatorPanelComponent,
  SimulatorLayersHandlerComponent,
  LayerWithoutProductsComponent,
  LayerWithProductsComponent,
];
