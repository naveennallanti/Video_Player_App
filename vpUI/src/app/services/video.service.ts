import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
// import 'rxjs/add/operator/map';
import {map} from "rxjs/operators";
import {Observable} from 'rxjs';

// import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private getUrl = "/api/videos";
  private postUrl = "/api/video";
  private updateUrl = "/api/video/";
  private deleteUrl = "/api/video/";

  constructor(private http: Http) {
  }

  getHeaders() {
    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  getVideos(): Observable<any> {
    return this.http.get(this.getUrl, {headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  postVideo(postData): Observable<any> {
    console.log("post Data", postData);
    return this.http.post(this.postUrl, postData, {headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  updateVideo(updateData): Observable<any> {
    console.log("update Data", updateData);
    return this.http.put(this.updateUrl + updateData._id, updateData, {headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  deleteVideo(deleteData): Observable<any> {
    console.log("delete Data", deleteData);
    return this.http.delete(this.deleteUrl + deleteData._id, {headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

}
