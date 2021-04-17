import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {WebRequestService} from './web-request.service'
@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private WebReqService: WebRequestService) {}
  getUser(id: string){
    return this.WebReqService.get(`user/${id}`);
  }
  getUsers(){
    return this.WebReqService.get(`users`);
  }

}

