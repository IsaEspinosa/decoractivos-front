import { HttpParams } from '@angular/common/http';

export class BaseService {
  protected parseParams(params): HttpParams {
    return Object.keys(params).reduce(
      (paramsAccum, key) =>
        paramsAccum.append(key, JSON.stringify(params[key])),
      new HttpParams()
    );
  }
}
