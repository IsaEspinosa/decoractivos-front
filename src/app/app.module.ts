import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PagesComponents} from './pages';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ScrollbarModule} from "ngx-scrollbar";
import {StickyDirective} from "./common/directives/sticky";
import { FooterComponent } from './common/components/footer/footer.component';
import {GoToDirective} from "./common/directives/goTo";


@NgModule({
  declarations: [
    AppComponent,
    StickyDirective,
    GoToDirective,
    FooterComponent,
    ...PagesComponents,
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
