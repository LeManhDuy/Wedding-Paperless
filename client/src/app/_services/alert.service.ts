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
  setAlertModel(value:AlertModel){
    this.alertModel.next(value);
  }

  getAlertModel(): Observable<AlertModel>{
    return this.alertModel.asObservable();
  }


}
