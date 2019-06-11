import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ScrollbarModule } from "ngx-scrollbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatListModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatDividerModule,
  MatDatepickerModule,
  MatPaginatorIntl
} from "@angular/material";
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ImageCropperModule } from "ngx-image-cropper";

import { AppComponent } from "./app.component";
import { StickyDirective } from "./common/directives/sticky";
import { PagesComponents, EntryComponents } from "./pages";
import { FooterComponent } from "./common/components/footer/footer.component";
import { IconComponent } from "./common/components/icon/icon.component";
import { MinFooterComponent } from "./common/components/min-footer/min-footer.component";
import { TableComponent } from "./common/components/table/table";

import { GoToDeclarations } from "./common/directives/GoTo";
import { BackendInterceptors } from "./interceptors/backend";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/AuthInterceptor";
import { ErrorInterceptor } from "./interceptors/ErrorInterceptor";
import { ResponseTransformInterceptor } from "./interceptors/ResponseTransformInterceptor";
import { MatPaginatorProvider } from "./common/services/MatPaginatorProvider";

@NgModule({
  declarations: [
    AppComponent,
    StickyDirective,
    FooterComponent,
    MinFooterComponent,
    TableComponent,
    IconComponent,
    ...GoToDeclarations,
    ...PagesComponents,
    ...EntryComponents
  ],
  entryComponents: [...EntryComponents],
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
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDividerModule,
    MatMomentDateModule,
    MatDatepickerModule,
    DragDropModule,
    ImageCropperModule
  ],
  providers: [
    [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ResponseTransformInterceptor,
        multi: true
      }
    ],
    BackendInterceptors,
    { provide: MAT_DATE_LOCALE, useValue: "es-CO" },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MatPaginatorIntl, useClass: MatPaginatorProvider }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
