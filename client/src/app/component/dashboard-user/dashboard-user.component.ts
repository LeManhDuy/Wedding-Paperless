import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  showContent() {
    this.router.navigate(['/content']);
  }
}
