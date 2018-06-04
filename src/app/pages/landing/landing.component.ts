import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LandingHeaderComponent} from "./landing-header/landing-header.component";
import {LandingNavComponent} from "./landing-nav/landing-nav.component";
import {LandingAboutComponent} from "./landing-about/landing-about.component";
import {LandingPortfolioComponent} from "./landing-portfolio/landing-portfolio.component";
import {LandingContactComponent} from "./landing-contact/landing-contact.component";
import {ScrollbarComponent} from "ngx-scrollbar";
import {ScrollService} from "../../common/services/scroll.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  @ViewChild(ScrollbarComponent) scrollRef: ScrollbarComponent;

  constructor(private scrollService: ScrollService) {
  }

  ngOnInit() {
    this.scrollService.instance = this.scrollRef;
  }

  ngOnDestroy(){
    this.scrollService.instance = null;
  }
}

export const LandingInternalComponents = [
  LandingHeaderComponent,
  LandingNavComponent,
  LandingPortfolioComponent,
  LandingContactComponent,
  LandingAboutComponent
];
