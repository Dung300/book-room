import { Injectable } from '@angular/core';
import { WebRequestService } from '../shared/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private WebReqService: WebRequestService) {}

  createAccount( body){
      return this.WebReqService.post('users', body)
  }
}
