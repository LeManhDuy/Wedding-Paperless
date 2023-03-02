import { Albumn, AlbumnRequest } from "./albumn";
import { RegisterSong } from "./song";

export class Content {
  id: string | undefined;
  hostName: string | undefined;
  date: Date | undefined;
  address: string | undefined;
  story: string | undefined;
  wish: string | undefined;
  personName: string | undefined;
}

export class ContentRequest {
  id: string | undefined;
  hostName: string | undefined;
  date: Date | undefined;
  address: string | undefined;
  story: string | undefined;
  wish: string | undefined;
  personName: string | undefined;
  album: AlbumnRequest[] | undefined;
  registerSong: RegisterSong[] | undefined;
}
