export interface customerBody {
  username: string;
  post: any;
  like: number;
}

interface infoCard {
  icon: string;
  count: number;
  title: string;
}

export interface infoCards {
  users: infoCard;
  friperies: infoCard;
}

export interface user {
  uid: string;
  email: string;
  username: string;
}

export interface Customers {
  _id: string;
  banned: boolean;
  banner: string;
  block: Array<string>;
  creationDate: string;
  description: string;
  email: string;
  follow: Array<string>;
  followers: Array<string>;
  friperie: boolean;
  privacy: 'public' | 'private';
  profile_picture: string;
  username: string;
  locale: string;
}
