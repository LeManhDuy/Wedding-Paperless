import { Albumn, AlbumnDelete, ImageHandler } from '../../models/albumn';
import { AlbumnService } from '../../_services/albumn.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Content } from 'src/app/models/content';
import { ContentService } from 'src/app/_services/content.service';
class ImageSnippet {
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
    position: '',
    contentId: '',
  };

  contents: Content[] = [];

  selectedFile: ImageSnippet | undefined;

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
        this.contents = response;
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      console.log(this.selectedFile)
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.imageHandler.imageLink = this.selectedFile.src;
    });
    reader.readAsDataURL(file);
  }

  onContentSelected(value: any) {
    this.imageHandler.contentId = value.target.value;
    console.log(this.imageHandler.contentId);
  }

  addImage() {
    if (this.imageHandler.contentId) {
      this.albumnService.addAlbumn(this.imageHandler.contentId, this.imageHandler).subscribe({
        next: (imageHandler) => {
          this.router.navigate(['albumn']);
        }
      })
    }
  }

  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   this.uploadFile(file);
  // }
}
