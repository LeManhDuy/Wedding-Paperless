export class ImageHandler {
  imageLink: string | undefined;
  row: string | undefined;
  contentId?: string;
}

export class Albumn {
  id?: string | undefined;
  imageLink: string | undefined;
  row: string | undefined;
  personName: string = "";
  contentId?: string;
}

export class AlbumnDelete {
  id: number | undefined;
  selected: boolean = false;
}

export class AlbumnRequest {
  id?: number| undefined;
  imageLink: string ="";
  row: number = 0;
  personName?: string = "";
}




