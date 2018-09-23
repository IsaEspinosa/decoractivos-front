/**
 * Created by garusis on 4/06/18.
 */
import {Directive, ElementRef, Input, OnInit, Renderer2} from "@angular/core";
import {ScrollService} from "../services/scroll.service";

@Directive({
  selector: '[sticky]'
})
export class StickyDirective implements OnInit {
  @Input() position: number = 10;

  constructor(private renderer: Renderer2, private elr: ElementRef, private scrollService: ScrollService) {
  }

  ngOnInit() {
    this.scrollService.subscribe((data) => {
      if (!data) return;
      this.onScroll(data.target.scrollTop);
    })
  }

  onScroll(position: number): void {
    if (position >= this.position) {
      this.renderer.addClass(this.elr.nativeElement, "sticky");
      this.renderer.setStyle(this.elr.nativeElement, "top", `${position}px`);
    } else {
      this.renderer.removeClass(this.elr.nativeElement, "sticky");
    }
  }
}
