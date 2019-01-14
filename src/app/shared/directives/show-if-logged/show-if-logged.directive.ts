import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';

import { UserService } from 'src/app/core/user/user.service';

@Directive({
  selector: '[apShowIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

  currentDisplay: string;

  constructor(private _element: ElementRef<any>, private _renderer: Renderer,
    private _userService: UserService) { }

  ngOnInit(): void {

    this.currentDisplay = getComputedStyle(this._element.nativeElement).display;

    this._userService.getUser().subscribe(user => {
      if (user)
        this._renderer.setElementStyle(this._element.nativeElement, 'display', this.currentDisplay);
      else {
        this.currentDisplay = getComputedStyle(this._element.nativeElement).display;
        this._renderer.setElementStyle(this._element.nativeElement, 'display', 'none');
      }
    });
  }
}
