import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertModel } from '../models/alertModel';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertModel: BehaviorSubject<AlertModel> = new BehaviorSubject({});
  constructor() { }
  isTimeOutRunning : boolean = false;
  setAlertModel(type:string = "success", text:string =""){
    const alert : AlertModel = {
      isAlert : true,
      type : type,
      text : text,
    }
    this.alertModel.next(alert);
  }

  getAlertModel(): Observable<AlertModel>{
    return this.alertModel.asObservable();
  }


}
