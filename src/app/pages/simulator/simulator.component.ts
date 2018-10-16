import {omit} from "lodash"
import {flatMap} from "rxjs/operators";
import {Component, OnInit} from '@angular/core';
import {forkJoin, Observable} from "rxjs/index";
import {ActivatedRoute, Router} from "@angular/router";

import {SimulatorSidebarComponent} from "./simulator-sidebar/simulator-sidebar.component";
import {EnvironmentService} from "../../common/services/environment.service";
import {Environment} from "../../common/models/environment";
import {Layer} from "../../common/models/layer";
import {SimulatorPanelComponent} from "./simulator-panel/simulator-panel.component";
import {LayerItem} from "../../common/models/layer-item";

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})
export class SimulatorComponent implements OnInit {

  public environment: Environment = new Environment();
  public _layers: Array<Layer> = [];
  public layersInSimulator: Array<any> = [];
  public layersInSidebar: Array<Layer> = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private environmentService: EnvironmentService) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        flatMap(params => {
          const id = params.environment_slug.replace(/^[a-zA-Z\-\d]+\-(\d+)$/, "$1");
          return forkJoin([
            this.environmentService.getOne(id),
            this.environmentService.getLayers(id)
          ])
        })
      )
      .subscribe(([environment, layers]) => {
        this.environment = <Environment>environment;
        this.layers = <Array<Layer>>layers;
      });
  }

  resetLayers() {
    this.layersInSimulator = this.layers.map((layer) => {
      const newLayer = <any>omit(layer, ["items", "default_item", "customizable"]);
      newLayer.currentItem = layer.items.find(item => item.item_id === layer.default_item);
      return newLayer
    });
  }

  set layers(layers) {
    layers = layers.sort((prev, next) => prev.layer_index - next.layer_index);
    this._layers = layers;

    this.layersInSidebar = layers.filter((layer) => layer.customizable);
    this.resetLayers()
  }

  get layers() {
    return this._layers
  }

  updateLayer(item: LayerItem) {
    const layer = this.layersInSimulator.find((layer) => layer.layer_id === item.layer_id);
    layer.currentItem = item;
    this.layersInSimulator = this.layersInSimulator.slice();
  }

}

export const SimulatorInternalComponents = [
  SimulatorComponent,
  SimulatorSidebarComponent,
  SimulatorPanelComponent
];
