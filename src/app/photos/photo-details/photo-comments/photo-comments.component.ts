import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';

@Component({
  selector: 'ap-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {

  @Input() photoId: number;
  comments$: Observable<PhotoComment[]>;
  commentForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _photoService: PhotoService) { }

  ngOnInit() {
    this.comments$ = this._photoService.getComments(this.photoId);
    this.commentForm = this._formBuilder.group({
      comment: ['', Validators.maxLength(300)]
    });
  }

  publish() {
    const commentText = this.commentForm.get('comment').value as string;
    this.comments$ = this._photoService
      .addComment(this.photoId, commentText)
      .pipe(switchMap(() => this._photoService.getComments(this.photoId)))
      .pipe(tap(() => this.commentForm.reset()));
  }
}
