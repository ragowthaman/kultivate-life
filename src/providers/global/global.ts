export class GlobalProvider {
  // for app version validation
  private _version = '0.0.7';

  // private _base_url = 'http://127.0.0.1:8000/';
  // private _base_url = 'http://192.168.43.229:8000/';
  // private _base_url = 'http://192.168.0.9:8000/';
  private _base_url = 'http://159.89.173.57:82/';

  get base_url(): string {
    return this._base_url;
  }

  get version(): string {
    return this._version;
  }
}
