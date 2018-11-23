import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {Observable} from 'rxjs/index';
import {Environment} from '../../../../../common/models/environment';

@Component({
  selector: 'app-admin-simulator-panel',
  templateUrl: './simulator-panel.component.html',
  styleUrls: ['./simulator-panel.component.scss']
})
export class SimulatorPanelComponent implements OnInit {

  @Input() environment: Environment;
  private _layers: Array<any>;


  @Input() set layers(layers: Array<any>) {
    if (!layers) return;
    this._layers = layers.filter(layer => layer.currentItem);
  }

  get layers(): Array<any> {
    return this._layers;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
