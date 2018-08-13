import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PagesComponents} from './pages';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ScrollbarModule} from "ngx-scrollbar";
import {StickyDirective} from "./common/directives/sticky";
import {FooterComponent} from './common/components/footer/footer.component';
import {MinFooterComponent} from './common/components/min-footer/min-footer.component';
import {GoToDeclarations} from "./common/directives/GoTo";
import {BackendInterceptors} from "./interceptors/backend/index";
import {HttpClientModule} from "@angular/common/http";
import { EnvironmentsComponent } from './pages/environments/environments.component';
import { SidebarComponent } from './pages/environments/sidebar/sidebar.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { EnvironmentListComponent } from './pages/environments/environment-list/environment-list.component';


@NgModule({
  declarations: [
    AppComponent,
    StickyDirective,
    FooterComponent,
    MinFooterComponent,
    ...GoToDeclarations,
    ...PagesComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScrollbarModule,
    NgbModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    BackendInterceptors
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
