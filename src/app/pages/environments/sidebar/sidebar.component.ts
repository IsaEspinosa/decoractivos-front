import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs/index';
import { EnvironmentType } from '../../../common/models/environment-type';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() environmentTypes: Observable<Array<EnvironmentType>>;
  @Output() selected = new EventEmitter<EnvironmentType>();
  private selectedEnvType: EnvironmentType = null;

  constructor() {}

  ngOnInit() {}

  selectEnvironmentType(selected: EnvironmentType) {
    this.selectedEnvType = selected;
    this.selected.emit(selected);
  }

  isCategoryActive(type: EnvironmentType) {
    return this.selectedEnvType === type;
  }
}
