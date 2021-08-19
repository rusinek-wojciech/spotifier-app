import { TokenResponse } from './token-response.interface';

export class Token {
  public accessToken: string;
  public validTo: number;

  constructor(tokenResponse: TokenResponse) {
    this.accessToken = tokenResponse.access_token;
    const now = new Date();
    now.setSeconds(now.getSeconds() + tokenResponse.expires_in);
    this.validTo = now.getTime();
  }
}
