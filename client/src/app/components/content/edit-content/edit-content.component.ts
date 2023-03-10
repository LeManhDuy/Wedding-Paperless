import { Component, Input, OnInit } from '@angular/core';
import {Content} from "../../../models/content";
import {ContentService} from "../../../_services/content.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.css']
})
export class EditContentComponent implements OnInit {
  constructor(
    private contentService: ContentService,
    private router: Router
  ) {

  }
  @Input() content: Content | undefined;
  ngOnInit(): void {
    console.log(this.content)
  }

  deleteContent(id?: string){
    this.contentService.deleteContent(id).subscribe(_ =>{})
    location.reload()
  }

}
