export type SizeType = "top" | "set";

export type Collection = {
  collection_id: string;
  name: string;
  cost: number;
  image?: string;
  images?: string[];
  tags?: string[];
  description?: string;
  size_type?: SizeType | null;
  created_at: string;
};

export type SizeInventoryItem = {
  status: "available" | "sold_out";
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
  size_type?: SizeType | null;
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
  price: string;
  quantity: number;
  created_at: string;
  updated_at: string;
};

export type CartResponse = {
  items: CartItem[]; // parsed JSON
  total_price: string; // BIGINT
};

export type Address = {
  id: string;
  user_id: string;
  label: string; // "Home", "Office"
  name: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  postal_code: string;
  is_default: boolean;
  created_at: string;
};

// Prices are stored as bigint (paise)
export type Money = number | bigint;

export type DeliveryStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "returned";

export type PaymentStatus = "paid" | "failed" | "refunded";

export type Order = {
  id: string;
  user_id: string;

  total_amount: number | bigint;

  status: PaymentStatus; // payment state
  delivery_status: DeliveryStatus;

  created_at: string;

  checkout_id: string | null;

  shipping_address: {
    name: string;
    phone: string;
    line1: string;
    city: string;
    state: string;
    postal_code: string;
  };

  delivery_provider?: string | null;
  tracking_number?: string | null;

  shipped_at?: string | null;
  delivered_at?: string | null;
};

/**
 * Allowed order states
 */
export type OrderStatus = "pending" | "completed" | "cancelled" | "failed";

/**
 * Order item (order_items table)
 */
export type OrderItem = {
  name: string;
  size: string;
  price: Money;
  image: string;
  collection_id: string;
};

/**
 * Order with relations (used in UI)
 */
export type OrderWithItems = Order & {
  items: OrderItem[];
};

/**
 * Order details view model
 */
export type OrderDetails = {
  order: Order;
  items: OrderItem[];
  address: Address | null;
};

/**
 * Supabase/Postgres error codes we care about
 */
export type DatabaseErrorCode =
  | "23505" // unique_violation
  | "23503" // foreign_key_violation
  | "42501" // insufficient_privilege
  | "PGRST116"; // not found

/**
 * Generic API error shape
 */
export type ApiError = {
  message: string;
  code?: DatabaseErrorCode | string;
  status?: number;
};

/**
 * Typed RPC response error
 */
export type RpcError = {
  message: string;
  code: DatabaseErrorCode;
};

/**
 * UI-friendly error
 */
export type UiError = {
  title: string;
  description?: string;
};

export type AddAddressFormProps = {
  initialData?: Address;
  onDone: () => void;
};

export type SizeGuide = {
  label: string; // S / M / L
  description: string; // Slim fit, relaxed, etc.
  bust?: string;
  waist?: string;
  hips?: string;
};
