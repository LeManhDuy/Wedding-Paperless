import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.css']
})
export class EditContentComponent implements OnInit{
  ngOnInit(): void {
  }

  deleteContent(id: string){
    console.log(id)
  }

}
