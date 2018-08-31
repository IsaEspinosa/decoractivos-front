import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {Observable} from "rxjs/index";
import {Environment} from "../../../common/models/environment";

@Component({
  selector: 'app-simulator-panel',
  templateUrl: './simulator-panel.component.html',
  styleUrls: ['./simulator-panel.component.scss']
})
export class SimulatorPanelComponent implements OnInit {

  @Input() layers: Array<any>;
  @Input() environment: Environment;

  constructor() {
  }

  ngOnInit() {
  }

}
