import { HttpParams } from '@angular/common/http';

export class BaseService {
  protected parseParams(params): HttpParams {
    const p = {...params};
    delete p.count;
    return Object.keys(p).reduce(
      (paramsAccum, key) =>
        paramsAccum.append(key, JSON.stringify(p[key])),
      new HttpParams()
    );
  }
}
