import { UploadImageService } from './../../services/upload-image.service';
import { AlbumnService } from './../../services/albumn.service';
import { Albumn, ImageHandler } from './../../models/albumn';
import { Component, Input, OnInit } from '@angular/core';
class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-albumn',
  templateUrl: './albumn.component.html',
  styleUrls: ['./albumn.component.css']
})
export class AlbumnComponent implements OnInit {
  albumnDelete: AlbumnDelete[] = []
  albumns: Albumn[] = [];
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';

  imageHandler: ImageHandler = {
    imageLink: '',
    position: '',
  };

  selectedFile: ImageSnippet | undefined;

  constructor(private albumnService: AlbumnService, private uploadImage: UploadImageService) { }

  ngOnInit(): void {
    this.albumnService.getAllAlbumns().subscribe({
      next: (response) => {
        this.albumns = response;
        console.log(this.albumns);
      },
      error: (error) => {
        console.log(error);
      }
    });
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

          addImage() {
            this.albumnService.addAlbumn(this.imageHandler).subscribe({
              next: (imageHandler : Albumn) => {
              }
            })
          }

  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   this.uploadFile(file);
  // }
}
