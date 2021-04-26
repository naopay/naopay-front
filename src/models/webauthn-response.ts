export interface WebAuthnResponse {
  cipher: string;
  tokens: TokenPair;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}