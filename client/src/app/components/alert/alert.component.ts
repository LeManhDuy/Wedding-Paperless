import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertModel } from 'src/app/models/alertModel';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

export class AlertComponent {

  constructor(private alerService: AlertService) {
  }
    initAlert: AlertModel =
    {
    isAlert:false,
    type:'success',
    text: 'success',
    }

  alertModel:AlertModel[] = [
    this.initAlert,
  ];

    ngOnInit(): void {
      this.alerService.getAlertModel()
      .subscribe(
        respone =>{
            this.alertModel[0] = respone;
      })
    }
    close()
    {
        this.alertModel[0] = this.initAlert;
    }
}
