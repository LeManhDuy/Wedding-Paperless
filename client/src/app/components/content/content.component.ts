import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Content } from 'src/app/models/content';
import { ContentService } from 'src/app/_services/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input() content: Content | undefined;
  isContentComponentVisible = true;
  isEditContentComponentVisible = false;

  contents?: Content[]

  constructor(
    private contentService: ContentService,
    private router : Router
  ) {
  }

  showComponent(content: Content){
    
  this.content = content
  this.isContentComponentVisible = false;
  this.isEditContentComponentVisible = true;
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

}
