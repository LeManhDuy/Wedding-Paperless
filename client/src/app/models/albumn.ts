export class ImageHandler {
  imageLink: string | undefined;
  position: string | undefined;
}

export class Albumn {
  id: string | undefined;
  imageLink: string | undefined;
  position: string | undefined;
  personName: string = "";
  contentId: string | undefined;
}

export class AlbumnDelete {
  id : number | undefined;
  selected : boolean = false;
}


