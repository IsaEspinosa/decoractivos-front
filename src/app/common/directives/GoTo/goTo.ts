/**
 * Created by garusis on 4/06/18.
 */
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import { GoToService } from './go-to.service';

@Directive({
  selector: '[go-to]'
})
export class GoToDirective {
  @Input('go-to') goTo: string;

  constructor(
    private renderer: Renderer2,
    private elr: ElementRef,
    private scrollService: ScrollService,
    private gotoService: GoToService
  ) {
    renderer.setAttribute(elr.nativeElement, 'href', 'javascript:void(0)');
  }

  @HostListener('click', ['$event'])
  handleClick($event: Event) {
    const target: ElementRef = this.gotoService.getTarget(this.goTo);
    if (!target) return;
    this.scrollService.instance.scrollYTo(target.nativeElement.offsetTop, 1000);
  }
}
