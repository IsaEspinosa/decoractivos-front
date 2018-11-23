import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ScrollbarModule} from 'ngx-scrollbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule,
  MatSelectModule, MatIconModule, MatTooltipModule,
  MatAutocompleteModule, MatSnackBarModule
} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';

import {AppComponent} from './app.component';
import {StickyDirective} from './common/directives/sticky';
import {PagesComponents, EntryComponents} from './pages';
import {FooterComponent} from './common/components/footer/footer.component';
import {IconComponent} from './common/components/icon/icon.component';
import {MinFooterComponent} from './common/components/min-footer/min-footer.component';

import {GoToDeclarations} from './common/directives/GoTo';
import {BackendInterceptors} from './interceptors/backend/index';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/AuthInterceptor';
import {ErrorInterceptor} from './interceptors/ErrorInterceptor';
import {ResponseTransformInterceptor} from './interceptors/ResponseTransformInterceptor';


@NgModule({
  declarations: [
    AppComponent,
    StickyDirective,
    FooterComponent,
    MinFooterComponent,
    IconComponent,
    ...GoToDeclarations,
    ...PagesComponents,
    ...EntryComponents,
  ],
  entryComponents: [
    ...EntryComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollbarModule,
    NgbModule.forRoot(),
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    DragDropModule,
    ImageCropperModule,
  ],
  providers: [
    [
      {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
      {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
      {provide: HTTP_INTERCEPTORS, useClass: ResponseTransformInterceptor, multi: true},
    ],
    BackendInterceptors
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
