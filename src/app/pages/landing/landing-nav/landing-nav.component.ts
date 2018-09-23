import {Component, OnInit} from '@angular/core';
import {smallerThan} from "../../../common/helpers/screen";

@Component({
  selector: 'app-landing-nav',
  templateUrl: './landing-nav.component.html',
  styleUrls: ['./landing-nav.component.scss']
})
export class LandingNavComponent implements OnInit {

  isCollapsed: boolean;

  constructor() {
  }

  ngOnInit() {
    this.isCollapsed = smallerThan('md');
  }

}
