import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  OnInit,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appRequired]'
})
export class RequiredDirective implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document
  ) {}

  ngOnInit() {
    const astrisk = document.createTextNode('*');
    const child = document.createElement('span');
    child.setAttribute('class', 'required');
    child.appendChild(astrisk);
    this.renderer.appendChild(this.elementRef.nativeElement, child);
  }
}
