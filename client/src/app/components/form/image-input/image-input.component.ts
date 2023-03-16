import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Albumn, AlbumnRequest } from 'src/app/models/albumn';
import { ImageInputModel } from 'src/app/models/imageInputContent';
import { AlbumnService } from 'src/app/_services/albumn.service';
import { UploadImageService } from 'src/app/_services/upload-image.service';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css']
})
export class ImageInputComponent {
  @Input() imageInputModel: ImageInputModel = new ImageInputModel();
  @Output() imageData = new EventEmitter<AlbumnRequest>();

  public imageUrl : string = "https://www.chanchao.com.tw/VietnamPrintPack/images/default.jpg";
  imageObjectOurStory: Array<object> = [];
  imageObjectOurMemory: Array<object> = [];
  isLoading :boolean =false;
  constructor(private album: AlbumnService, private uploadImageService: UploadImageService) {

  }
   async onFileSelected(event: any) {
    this.isLoading =true;
    const row = Number.parseInt(this.imageInputModel.row!);
    const base64 = await this.uploadImageService.processFileToBase64(event.target);
    this.setCurrentAlbum(base64, row);
  }

  public setCurrentAlbum(base64: string, row : number ){
    this.uploadImageService.processConvertBase64ToUrl(base64)
    .subscribe(response =>{
        const album : AlbumnRequest= {
          imageLink : response,
          row : row,
        }
        this.imageData.emit(album);
        console.log(this.imageData);

        row === 2 || row === 4 ? this.addImageToMultipleStorge(album, row) : this.addImageToSingleStorge(album, row);
        this.isLoading =false;
    });
  }

  addImageToSingleStorge(album : AlbumnRequest, row: number){
    this.imageUrl = album.imageLink!;
    switch (row){
      case 1:
        this.album.currentAlbumFirstPo = album;
        break;
      case 3:
        this.album.currentAlbumThirtPo = album;
        break;
      case 5:
        this.album.currentAlbumFifthPo = album;
        break;
    }
  }

  addImageToMultipleStorge(album : AlbumnRequest, row: number){
      var imageObject ={
        image: album.imageLink,
        thumbImage: album.imageLink,
      }
      switch (row){
        case 2:
          this.pushToAlbumList(this.imageObjectOurStory,this.album.currentAlbumSecondListPo,album,imageObject);
          break;
        case 4:
          this.pushToAlbumList(this.imageObjectOurStory,this.album.currentAlbumFourthListPo,album,imageObject);
          break;
      }
  }

  pushToAlbumList(currentObject :Array<object>, list:AlbumnRequest[],album : AlbumnRequest,imageObject ={} ){
    currentObject.push(imageObject);
    list.push(album);
  }

}
