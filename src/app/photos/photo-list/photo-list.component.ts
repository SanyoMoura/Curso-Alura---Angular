import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
    selector: 'ap-photo-list',
    templateUrl: 'photo-list.component.html',
    styleUrls: ['photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];
  filter = '';
  hasMore = true;
  currentPage = 1;
  userName = '';

  constructor(private _activatedRoute: ActivatedRoute, private _photoService: PhotoService) {}

  ngOnInit(): void {
    this.userName = this._activatedRoute.snapshot.params.userName;
    this.photos = this._activatedRoute.snapshot.data['photos'];
  }

  load() {
    this._photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe((photos: Photo[]) => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        this.hasMore = photos.length > 0;
      });
  }
}
