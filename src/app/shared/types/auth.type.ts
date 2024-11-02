export interface TokenResponse {
  access_token: string;
  token_type: 'Bearer';
  scope: string;
  expires_in: number;
  refresh_token: string;
}

export type RefreshTokenResponse = Omit<TokenResponse, 'refresh_token'>;

export interface Token {
  accessToken: string;
  expireTimestamp: number;
  refreshToken: string;
}

/**
 * https://developer.spotify.com/documentation/web-api/tutorials/code-flow
 */
export type AuthorizationResponseParams =
  | {
      code: string;
      state: string;
    }
  | {
      error: string;
      state: string;
    };
