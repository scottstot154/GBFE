export type SizeInventoryItem = {
  status: "available" | "unavailable";
  item_id: string;
};

export type SizesMap = {
  [size: string]: SizeInventoryItem[];
};

export type Dress = {
  collection_id: string;
  name: string;
  cost: number;
  image?: string;
  images?: string[];
  description?: string;
  sizes?: SizesMap | null;
};

export type CartItem = {
  id: string;
  user_id: string;
  item_id: string;
  collection_id: string;
  name: string;
  size: string;
  image: string;
  price: number;
  quantity: number;
  created_at: string;
  updated_at: string;
};
