import { UploadImageService } from './../../services/upload-image.service';
import { AlbumnService } from './../../services/albumn.service';
import { Albumn } from './../../models/albumn';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-albumn',
  templateUrl: './albumn.component.html',
  styleUrls: ['./albumn.component.css']
})
export class AlbumnComponent implements OnInit {
  albumns: Albumn[] = [];
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';

  imageInfos?: Observable<any>;

  constructor(private albumnService: AlbumnService, private uploadImage: UploadImageService) { }

  ngOnInit(): void {
    this.albumnService.getAllAlbumns().subscribe({
      next: (response) => {
        this.albumns = response;
      },
      error: (error) => {
        console.log(error);
      }
    });

    //this.imageInfos = this.uploadImage.getFiles();
  }

  // selectFile(event: any): void {
  //   this.message = '';
  //   this.preview = '';
  //   this.progress = 0;
  //   this.selectedFiles = event.target.files;

  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles.item(0);

  //     if (file) {
  //       this.preview = '';
  //       this.currentFile = file;

  //       const reader = new FileReader();

  //       reader.onload = (e: any) => {
  //         this.preview = e.target.result;
  //       };

  //       reader.readAsDataURL(this.currentFile);
  //     }
  //   }
  // }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        console.log("ab",this.currentFile);
        this.uploadImage.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              //this.imageInfos = this.uploadImage.getFiles();
            }
          },
          error: (err: any) => {
            console.log("1", err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the image!';
            }

            this.currentFile = undefined;
          },
        });
      }

      this.selectedFiles = undefined;
    }
  }
}
