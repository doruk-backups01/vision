import Spotify from "spotifydl-core";

/** Using public keys */
const client = new Spotify({
  clientId: "1520846bf70a49b5a522560661e40704",
  clientSecret: "08934ca625bf4cc8b0509701dbb96d2c",
});

export default class {
  constructor(public url: string) {}

  getInfo = async (): Promise<{
    name?: string;
    artists?: string[];
    album_name?: string;
    release_date?: string;
    cover_url?: string;
    error?: string;
  }> => {
    try {
      return await client.getTrack(this.url);
    } catch {
      return { error: `Error Fetching ${this.url}` };
    }
  };

  getAudio = async (): Promise<Buffer> =>
    await client.downloadTrack<undefined>(this.url);
}
