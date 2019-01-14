import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'ap-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  photo$: Observable<Photo>;
  photoId: number;

  constructor(private _route: ActivatedRoute, private _router: Router,
    private _photoService: PhotoService, private _alertService: AlertService,
    private _userService: UserService) { }

  ngOnInit() {
    this.photoId = this._route.snapshot.params.photoId;
    this.photo$ = this._photoService.findById(this.photoId);
    this.photo$.subscribe(() => {}, err => {
      console.log(err);
      this._router.navigate(['not-found']);
    });
  }

  delete() {
    this._photoService
      .deletePhoto(this.photoId)
      .subscribe(() => {
        this._alertService.success('Photo successfully deleted.', true);
        this._router.navigate(['/user', this._userService.userName], { replaceUrl: true });
      },
      err => {
        console.log(err);
        this._alertService.warning('Could not delete photo!');
      });
  }

  like() {
    this._photoService
      .doLike(this.photoId)
      .subscribe(liked => this.photo$ = this._photoService.findById(this.photoId));
  }
}
