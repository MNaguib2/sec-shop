export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenEpirationData: Date
  ){}

  get token(){
    if(!this._tokenEpirationData || new Date() > this._tokenEpirationData){
    return null;
    }
    return this._token;
  }
}
