import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Content} from 'src/app/models/content';
import {ContentService} from 'src/app/_services/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input() content: Content | undefined;
  isContentComponentVisible = true;
  isEditContentComponentVisible = false;
  isLoading: boolean = false;

  contents?: Content[]

  constructor(
    private contentService: ContentService,
    private router: Router
  ) {
  }

  showComponent(content: Content) {
    this.content = content
    this.isContentComponentVisible = false;
    this.isEditContentComponentVisible = true;
  }

  back(){
    this.isContentComponentVisible = true;
    this.isEditContentComponentVisible = false;
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.contentService.getAllContents().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.contents = response
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error)
      }
    })
  }

}
