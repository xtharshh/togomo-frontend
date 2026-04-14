export interface Meal {
  id: string;
  name: string;
  description: string;
  image: string;
  calories: number;
  day?: string;
  tags: string[];
}

export interface Kitchen {
  id: string;
  name: string;
  cuisine: string;
  distance: string;
  deliveryTime: string;
  rating: number;
  image: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  pricePerMeal: number;
  bestValue?: boolean;
  icon: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'restaurant';
  text: string;
  timestamp: string;
  attachment?: {
    name: string;
    size: string;
    type: string;
  };
}