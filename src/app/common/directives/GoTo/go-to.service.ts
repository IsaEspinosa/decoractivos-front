import {ElementRef, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoToService {

  private readonly targets: Object = {};

  constructor() {
  }

  setTarget(key: string, value: ElementRef): void {
    this.targets[key] = value;
  }

  getTarget(key: string): ElementRef {
    return this.targets[key];
  }

  removeTarget(key: string): void {
    delete this.targets[key];
  }

}
