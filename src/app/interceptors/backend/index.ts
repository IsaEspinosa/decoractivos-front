import {HTTP_INTERCEPTORS, HttpInterceptor} from "@angular/common/http";
import {EnvironmentFakeBackendInterceptor} from "./EnvironmentFakeBackendInterceptor";
import {EnvironmentTypeFakeBackendInterceptor} from "./EnvironmentTypeFakeBackendInterceptor";
/**
 * Created by garusis on 8/06/18.
 */

export const BackendInterceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: EnvironmentFakeBackendInterceptor
  },
  {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: EnvironmentTypeFakeBackendInterceptor
  }
];
