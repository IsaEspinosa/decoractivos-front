import {Component, Input, OnInit} from '@angular/core';
import {Environment} from "../../../common/models/environment";

@Component({
  selector: 'app-environment-list',
  templateUrl: './environment-list.component.html',
  styleUrls: ['./environment-list.component.scss']
})
export class EnvironmentListComponent implements OnInit {

  @Input() environments: Array<Environment>;
  @Input() isLoading: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
