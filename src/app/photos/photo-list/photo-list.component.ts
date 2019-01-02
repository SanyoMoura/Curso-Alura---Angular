import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';

@Component({
    moduleId: module.id,
    selector: 'ap-photo-list',
    templateUrl: 'photo-list.component.html',
    styleUrls: ['photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter = '';

  constructor(private _activatedRoute: ActivatedRoute) {  }

  ngOnInit(): void {
    this.photos = this._activatedRoute.snapshot.data['photos'];
  }
}
