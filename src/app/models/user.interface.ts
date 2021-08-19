export interface User {
  country: string;
  display_name: string;
  email: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: {
    height: string;
    url: string;
    width: string;
  }[];
  product: string;
  type: string;
  uri: string;
}
