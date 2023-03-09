import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.css']
})
export class EditContentComponent implements OnInit {

  @Input() id: string | undefined;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
