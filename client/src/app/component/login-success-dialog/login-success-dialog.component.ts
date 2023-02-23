import {Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login-success-dialog',
  templateUrl: './login-success-dialog.component.html',
  styleUrls: ['./login-success-dialog.component.css'],
  animations: [
    trigger('appear', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('0.5s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class LoginSuccessDialogComponent implements OnInit{
  constructor(private matDialogRef: MatDialogRef<any>) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.matDialogRef.close();
    }, 3000);
  }
}
