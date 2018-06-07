/**
 * Created by garusis on 4/06/18.
 */
import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {GoToService} from "./go-to.service";

@Directive({
  selector: '[go-to-ref]'
})
export class GoToReferenceDirective implements OnInit, OnDestroy {
  @Input('go-to-ref') ref: string;
  @Input() id: string;

  constructor(private elr: ElementRef, private gotoService: GoToService) {
  }

  ngOnInit() {
    this.ref = this.ref || this.id;
    this.gotoService.setTarget(this.ref, this.elr);
  }

  ngOnDestroy() {
    this.gotoService.removeTarget(this.ref);
  }

}
