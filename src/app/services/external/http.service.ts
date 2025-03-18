import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private utils: UtilsService
  ) { }

  processUrl(request_url: string, params: any = null) {
    if(params != null) {
      let sparams = this.utils.json_parameters_to_query(params)
      request_url = request_url + '?' + sparams
    }
    return request_url
  }

  getData(request_url: string, parameters: any|null = null) {
    request_url = this.processUrl(request_url, parameters);
    console.log("Making http call to " + request_url)
    return this.http.get(request_url)
  }

  postData(request_url: string, body: any) {
    request_url = this.processUrl(request_url)
    return this.http.post(request_url, body)
  }
}
