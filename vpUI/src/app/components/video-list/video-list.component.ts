import {Component, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  inputs: ['videos'],
  outputs: ['SelectVideo']
})
export class VideoListComponent implements OnInit {

  public SelectVideo = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onSelect(video) {
    this.SelectVideo.emit(video);
  }

}
