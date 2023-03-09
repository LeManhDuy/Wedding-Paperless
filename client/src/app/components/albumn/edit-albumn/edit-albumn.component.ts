import {AlbumnService} from '../../../_services/albumn.service';
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Albumn, ImageHandler} from 'src/app/models/albumn';
import { ContentService } from 'src/app/_services/content.service';
import { Content } from 'src/app/models/content';

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-edit-albumn',
  templateUrl: './edit-albumn.component.html',
  styleUrls: ['./edit-albumn.component.css']
})
export class EditAlbumnComponent implements OnInit {
  @Input() id: string | undefined;

  albumnDetails: Albumn = {
    id: '',
    imageLink: '',
    row: '',
    personName: '',
    contentId: ''
  }

  contents: Content[] = [];

  selectedFile?: ImageSnippet;

  constructor(private router: Router, private route: ActivatedRoute, private albumnService: AlbumnService,private contentService: ContentService) {
  }

  ngOnInit(): void {
    console.log("dasfdasf1",this.id);

    this.route.paramMap.subscribe({
      next: (params) => {
        if (this.id) {
          this.albumnService.getAlbumn(this.id).subscribe({
            next: (response) => {
              this.albumnDetails = response;
            }
          })
        }
      }
    })
    this.contentService.getAllContents().subscribe({
      next: (response) => {
        this.albumnDetails.contentId = response[0].id
        this.contents = response
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onContentSelected(value: any) {
    this.albumnDetails.contentId = value.target.value ;
  }

  processFile(imageInput: any) {
    console.log("loading")
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      console.log(this.selectedFile)
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.albumnDetails.imageLink = this.selectedFile.src;
    });
    reader.readAsDataURL(file);
  }

  updateImage() {
    if (this.albumnDetails.contentId && this.albumnDetails.id) {
      this.albumnService.updateAlbumn(this.albumnDetails.contentId, this.albumnDetails.id, this.albumnDetails).subscribe({
        next: (albumn) => {
          location.reload()
        }
      });
    }
  }

  deleteImage(id?: string) {
    if (id) {
      this.albumnService.deleteSelected(id).subscribe({
        next: () => {
          location.reload()
        }
      })
    }
  }
}
