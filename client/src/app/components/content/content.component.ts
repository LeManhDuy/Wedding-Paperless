import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Content } from 'src/app/models/content';
import { ContentService } from 'src/app/_services/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  contents?: Content[]

  constructor(
    private contentService: ContentService

  ) {
  }

  ngOnInit(): void {
    this.contentService.getAllContents().subscribe({
      next: (response) => {
        this.contents = response
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  showInvitationInform(content: Content){
    console.log(content.personId)
  }

}
