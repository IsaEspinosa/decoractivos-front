/**
 * Created by garusis on 4/06/18.
 */
import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {ScrollService} from "../services/scroll.service";

@Directive({
  selector: '[go-to]'
})
export class GoToDirective {
  @Input('go-to') goTo: string;

  constructor(private elr: ElementRef, private scrollService: ScrollService) {
  }


  @HostListener('click')
  onClick(): void {
  }
}
