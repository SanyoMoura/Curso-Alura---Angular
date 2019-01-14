import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';

import { Photo } from '../../photo/photo';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
  selector: '[apPhotoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {

  @Input() photoOwner: Photo;

  constructor(private _element: ElementRef<any>, private _renderer: Renderer,
    private _userService: UserService) { }

    ngOnInit(): void {

      this._userService
        .getUser()
        .subscribe(user => {
          if (!user || user.id !== this.photoOwner.userId)
            this._renderer.setElementStyle(this._element.nativeElement, 'display', 'none');
        });
    }
  }
