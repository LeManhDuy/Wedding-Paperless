import { Component} from '@angular/core';
import { Route, Router } from '@angular/router';
import { Content, ContentRequest } from 'src/app/models/content';
import { AlbumnService } from 'src/app/_services/albumn.service';
import { ContentService } from 'src/app/_services/content.service';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  contentRequest: Content = new Content();
  constructor
  (
    private contentService: ContentService,
    private loginService: LoginService,
    private router: Router,
    private albumService: AlbumnService
  ) {}

  saveContent(){
      this.contentService.creatContent(this.contentRequest)
      .subscribe(respone => {

        this.albumService.currentContentId = Number.parseInt(respone.id!);
      })

  }
}
