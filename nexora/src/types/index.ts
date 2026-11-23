export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  customerId: number;
  orderDate: string;
  totalAmount: number;
  status?: string;
  items: OrderItem[];
}

export interface CreateOrderItem {
  productId: number;
  quantity: number;
}

export interface CreateOrder {
  customerId: number;
  items: CreateOrderItem[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  reorderLevel: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface DashboardSummary {
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
}
