import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {Observable} from 'rxjs/index';
import {DomSanitizer} from '@angular/platform-browser';

import {Layer} from '../../../../../common/models/layer';
import {LayerItem} from '../../../../../common/models/layer-item';
import {ItemCategory} from '../../../../../common/models/item-category';


@Component({
  selector: 'app-admin-simulator-layers-handler',
  templateUrl: './simulator-layers-handler.component.html',
  styleUrls: ['./simulator-layers-handler.component.scss']
})
export class SimulatorLayersHandlerComponent implements OnInit {

  @Output() reorderLayers = new EventEmitter<any>();
  @Output() openAddLayer = new EventEmitter<any>();
  @Output() selectLayers = new EventEmitter<any>();
  @Input() disabled: boolean;

  public _layers: Array<Layer>;


  @Input()
  set layers(layers: Array<Layer>) {
    this._layers = layers;
  }

  get layers() {
    return this._layers || [];
  }

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  moveLayer($event) {
    this.reorderLayers.emit({
      currentIndex: $event.currentIndex,
      previousIndex: $event.previousIndex
    });
  }


}
