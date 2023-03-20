import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Content} from 'src/app/models/content';
import {AuthService} from 'src/app/_services/auth.service';
import {ContentService} from 'src/app/_services/content.service';

@Component({
  selector: 'app-new-share',
  templateUrl: './new-share.component.html',
  styleUrls: ['./new-share.component.css', '../form-new-template/form-new-template.component.css']
})
export class NewShareComponent {
  personId: string = '';
  state: string = 'none';
  content: Content = new Content();
  isLoading: boolean = false;
  imageUrl1: String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl2: String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl3: String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl4: String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl5: String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl6: String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl7: String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  imageUrl8: String = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";


  constructor(
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
  ) {

  }


  ngOnInit(): void {
    try {
      this.personId = this.auth.decode(this.route.snapshot.paramMap.get('id')!);
    }
    catch (e) {
      this.router.navigate(["not-found"]);
    }
    this.isLoading = true;
    this.contentService.getContentAttachAlbums(this.personId!)
      .subscribe(respone => {
          console.log("FEATURE")
        this.content = respone
        this.imageUrl1 = this.content.albumnDtos[0].imageLink!
        this.imageUrl2 = this.content.albumnDtos[1].imageLink!
        this.imageUrl3 = this.content.albumnDtos[2].imageLink!
        this.imageUrl4 = this.content.albumnDtos[3].imageLink!
        this.imageUrl5 = this.content.albumnDtos[4].imageLink!
        this.imageUrl6 = this.content.albumnDtos[5].imageLink!
        this.imageUrl7 = this.content.albumnDtos[6].imageLink!
        this.imageUrl8 = this.content.albumnDtos[7].imageLink!

        this.isLoading = false;
      },
        error => {
          console.log("ERROR")
          this.router.navigate(["not-found"]);
        })
  }

  appearForm() {
    this.state = '';
  }

  existForm() {
    this.state = 'none';
  }
}
