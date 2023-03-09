import { Albumn, AlbumnDelete, ImageHandler } from '../../models/albumn';
import { AlbumnService } from '../../_services/albumn.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Content } from 'src/app/models/content';
import { ContentService } from 'src/app/_services/content.service';
export class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-albumn',
  templateUrl: './albumn.component.html',
  styleUrls: ['./albumn.component.css']
})
export class AlbumnComponent implements OnInit {
  albumns: Albumn[] = [];

  imageHandler: ImageHandler = {
    imageLink: '',
    row: '',
    contentId: '',
  };

  id?:string

  contents: Content[] = [];

  selectedFile: ImageSnippet | undefined;

  isAlbumnComponentVisible = true;
  isEditAlbumnComponentVisible = false;

  constructor(private albumnService: AlbumnService, private router: Router, private contentService: ContentService) { }

  ngOnInit(): void {
    this.albumnService.getAllAlbumns().subscribe({
      next: (response) => {
        this.albumns = response;
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.contentService.getAllContents().subscribe({
      next: (response) => {
        this.imageHandler.contentId = response[0].id
        this.contents = response
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.imageHandler.imageLink = this.selectedFile.src;
    });
    reader.readAsDataURL(file);
  }

  onContentSelected(value: any) {
    this.imageHandler.contentId = value.target.value ;
  }

  showComponent(albumn: Albumn){
    this.id = albumn.id
    this.isAlbumnComponentVisible = false;
    this.isEditAlbumnComponentVisible = true;
  }

  addImage() {
    if (this.imageHandler.contentId) {
      this.albumnService.addAlbumn(this.imageHandler.contentId, this.imageHandler).subscribe({
        next: (imageHandler) => {
          location.reload()
        }
      })
    }
  }

  // onFileSelected(albumn: Albumn) {
  //   console.log(albumn.id);

  // }
}
