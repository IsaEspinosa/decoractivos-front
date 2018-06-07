import {Injectable} from '@angular/core';
import {ScrollbarComponent} from "ngx-scrollbar";

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private scrollRef: ScrollbarComponent;

  constructor() {
  }

  set instance(scroll: ScrollbarComponent) {
    if (!scroll && this.scrollRef) {
      this.unsubscribe();
    }
    this.scrollRef = scroll;
  }

  get instance(): ScrollbarComponent {
    return this.scrollRef;
  }

  subscribe(fn: Function) {
    this.scrollRef.scrollState.subscribe(fn);
  }

  unsubscribe() {
    this.scrollRef.scrollState.unsubscribe();
  }
}
