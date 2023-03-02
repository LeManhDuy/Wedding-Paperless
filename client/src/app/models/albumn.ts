export class ImageHandler {
  imageLink: string | undefined;
  position: string | undefined;
  contentId?: string;
}

export class Albumn {
  id?: string | undefined;
  imageLink: string | undefined;
  position: string | undefined;
  personName: string = "";
  contentId?: string;
}

export class AlbumnDelete {
  id: number | undefined;
  selected: boolean = false;
}

export class AlbumnRequest {
  base64Image: string | undefined;
  position: number | undefined;
  personName?: string = "";
}




