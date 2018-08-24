import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ScrollbarModule} from "ngx-scrollbar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import {FormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {StickyDirective} from "./common/directives/sticky";
import {PagesComponents} from './pages';
import {FooterComponent} from './common/components/footer/footer.component';
import {MinFooterComponent} from './common/components/min-footer/min-footer.component';

import {GoToDeclarations} from "./common/directives/GoTo";
import {BackendInterceptors} from "./interceptors/backend/index";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/AuthInterceptor";


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
    BrowserAnimationsModule,
    FormsModule,
    ScrollbarModule,
    NgbModule.forRoot(),
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [
    [
      {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ],
    BackendInterceptors
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
