import {AlbumnService} from '../../../services/albumn.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Albumn, ImageHandler} from 'src/app/models/albumn';

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

  albumnDetails: Albumn = {
    id: '',
    imageLink: '',
    position: '',
    personName: '',
    contentId: ''
  }

  selectedFile: ImageSnippet | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private albumnService: AlbumnService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')
        if (id) {
          this.albumnService.getAlbumn(id).subscribe({
            next: (response) => {
              this.albumnDetails = response;
            }
          })
        }
      }
    })
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.albumnDetails.imageLink = this.selectedFile.src;
    });
    reader.readAsDataURL(file);
  }

  updateImage() {
    if (this.albumnDetails.contentId && this.albumnDetails.id) {
      this.albumnService.updateAlbumn(this.albumnDetails.contentId, this.albumnDetails.id, this.albumnDetails).subscribe({
        next: (albumn) => {
          this.router.navigate(['albumn']);
        }
      });
    }
  }

  deleteImage(id: string | undefined) {
    if (id) {
      console.log(id);
      this.albumnService.deleteSelected(id).subscribe({
        next: () => {
          this.router.navigate(['albumn'])
        }
      })
    }
  }
}
