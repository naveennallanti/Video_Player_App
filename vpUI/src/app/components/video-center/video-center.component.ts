import {Component, OnInit} from '@angular/core';
import {Video} from '../../video';
import {VideoService} from "../../services/video.service";
import {Observable} from 'rxjs';

// import {Http} from '@angular/http';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {

  videos: Array<Video>;
  // public videos = [];

  selectedVideo: Video;
  private hidenewVideo: boolean = true;

  constructor(private videoService: VideoService) {
  }

  ngOnInit() {
    this.getVideos();
  }

  getVideos() {
    this.videoService.getVideos().subscribe((res) => {
      console.log("response", res);
      this.videos = res;
    }, (err) => {
      console.log("error", err);
    });
  }

  onSelectVideo(video: any) {
    this.selectedVideo = video;
    this.hidenewVideo = true;
    console.log(this.selectedVideo);
  }

  onSubmitAddVideo(video) {
    this.videoService.postVideo(video).subscribe((res) => {
      console.log("post response", res);
      this.videos.push(res);
      this.hidenewVideo = true;
      this.selectedVideo = res;
    }, (err) => {
      console.log("error", err);
    });
  }

  onUpdateVideoEvent(video: any) {
    this.videoService.updateVideo(video).subscribe((res) => {
      console.log("updated response", res);
      // this.videos.push(res);
      // this.hidenewVideo = true;
      video = res;
      this.selectedVideo = null;
    }, (err) => {
      console.log("error", err);
    });
  }

  onDeleteVideoEvent(video: any) {
    let videosArray = this.videos;
    this.videoService.deleteVideo(video).subscribe((res) => {
        console.log("deleted response", res);
        for (let i = 0; i < videosArray.length; i++) {
          if (videosArray[i]._id === video._id) {
            videosArray.splice(i, 1);
            console.log("this videos", this.videos, "videosArray", videosArray);
          }
        }
        this.selectedVideo = null;
      },
      (err) => {
        console.log("error", err);
      });
  }

  newVideo() {
    this.hidenewVideo = false;
  }

}
