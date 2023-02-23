import { UploadImageService } from './../../services/upload-image.service';
import { AlbumnService } from './../../services/albumn.service';
import {Albumn, AlbumnDelete} from './../../models/albumn';
import { Component, Input, OnInit } from '@angular/core';
class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-albumn',
  templateUrl: './albumn.component.html',
  styleUrls: ['./albumn.component.css']
})
export class AlbumnComponent implements OnInit {
  albumnDelete : AlbumnDelete[] = []
  albumns: Albumn[] = [];
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';

  imageHandler: Albumn = {
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

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  // deleteSelected(): void {
  //   const selectedAlbumns = this.albumns.filter(albumnDelete => albumnDelete.selected);
  //   selectedAlbumns.forEach(albumnDelete => {
  //     this.albumnService.deleteSelected(albumnDelete)
  //       .subscribe(() => {
  //         this.albumns = this.albumns.filter(a => a !== albumn);
  //       });
  //   });
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
      next: (imageHandler) => {
      }
    })
  }

  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   this.uploadFile(file);
  // }
}
