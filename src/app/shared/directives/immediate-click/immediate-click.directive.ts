import { Directive, ElementRef, OnInit } from '@angular/core';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Directive({
  selector: '[apImmediateClick]'
})
export class ImmediateClickDirective implements OnInit {

  constructor(private _element: ElementRef<any>, private _plataformDetector: PlatformDetectorService) { }

  ngOnInit(): void {
    if (this._plataformDetector.isPlatformBrowser) this._element.nativeElement.click();
  }
}
