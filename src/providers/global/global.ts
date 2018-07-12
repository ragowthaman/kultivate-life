export class GlobalProvider {
  // private _base_url = 'http://127.0.0.1:8000/';
  private _base_url = 'http://192.168.0.107:8000/';

  get base_url(): string {
    return this._base_url;
  }
}
