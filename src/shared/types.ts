export interface ICoffeeOrigin {
  id: number;
  country: string;
  region: string;
  description: string;
  characteristics: string[];
  altitude: string;
  harvest: string;
  processing: string;
  varieties: string[];
  ourBlends: string[];
  coordinates: {
    x: number;
    y: number;
  };
  icon?: any;
}

export interface ICoffeeMenu {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  icon: string;
}

export interface IDessertMenu {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface IBaristaRecommend {
  baristaName: string;
  baristaTitle: string;
  baristaAvatar: string;
  drinkName: string;
  drinkDescription: string;
  drinkPrice: number;
  specialOffer?: string;
}

export interface ICoffeeQuiz {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    icon: any;
    weight: Record<string, number>;
  }[];
}
export interface ITeamMember {
  id: string;
  name: string;
  position: string;
  description: string;
  image: string;
  specialty: string;
  favoriteCoffee: string;
  quote: string;
  experience: string;
  achievements: string[];
  hobbies: string[];
}

export interface IHero {
  firstLine: string;
  secondLine: string;
  subtitle: string;
  backgroundImage: string;
}

export interface IAbout {
  title: string;
  subtitle: string;
  story: { text: string }[];
  images: { url: string }[];
}

export interface IGalleryItem {
  id?: string;
  src: string;
  alt: string;
  category: string;
}

export interface IContacts {
  id?: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  workHoursWeek: string;
  workHoursWeekend: string;
  instagram: string;
  facebook: string;
  telegram: string;
}
