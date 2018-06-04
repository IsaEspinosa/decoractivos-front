/**
 * Created by garusis on 4/06/18.
 */
import {Directive, ElementRef, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {ScrollService} from "../services/scroll.service";

@Directive({
  selector: '[sticky]'
})
export class StickyDirective implements OnInit, OnDestroy {
  @Input() position: number = 10;

  constructor(private elr: ElementRef, private scrollService: ScrollService) {
  }

  ngOnInit() {
    this.scrollService.subscribe((data) => {
      if (!data) return;
      this.onScroll(data.target.scrollTop);
    })
  }

  ngOnDestroy() {

  }

  onScroll(position: number): void {
    if (position >= this.position) {
      this.elr.nativeElement.classList.add("sticky");
      this.elr.nativeElement.style.top = `${position}px`;
    } else {
      this.elr.nativeElement.classList.remove("sticky");
    }
  }
}
