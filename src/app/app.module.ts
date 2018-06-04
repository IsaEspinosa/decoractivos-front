import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PagesComponents} from './pages';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ScrollbarModule} from "ngx-scrollbar";
import {StickyDirective} from "./common/directives/sticky";
import { LandingAboutComponent } from './pages/landing/landing-about/landing-about.component';
import { LandingPortfolioComponent } from './pages/landing/landing-portfolio/landing-portfolio.component';
import { LandingContactComponent } from './pages/landing/landing-contact/landing-contact.component';
import { FooterComponent } from './common/components/footer/footer.component';
import {GoToDirective} from "./common/directives/goTo";


@NgModule({
  declarations: [
    AppComponent,
    StickyDirective,
    GoToDirective,
    ...PagesComponents,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScrollbarModule,
    NgbModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
