import type { Order, CreateOrder, Customer, Product,DashboardSummary } from "../types";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getOrders = async (): Promise<Order[]> => {
  const response = await fetch(`${API_URL}/Orders`);

  if (!response.ok) {
    throw new Error("Unable to fetch orders");
  }

  return response.json();
};

export const getOrderById = async (
  id: number
): Promise<Order> => {
  const response = await fetch(`${API_URL}/Orders/${id}`);

  if (!response.ok) {
    throw new Error("Unable to fetch order");
  }

  return response.json();
};

export const createOrder = async (
  order: CreateOrder
): Promise<Order> => {
  const response = await fetch(`${API_URL}/Orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

export const getProducts = async (
    pageNumber: number, pageSize: number): Promise<Product[]> => {
  const response = await fetch(
    `${API_URL}/Products?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch products");
  }

  return response.json();
};

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await fetch(`${API_URL}/Customers`);

  if (!response.ok) {
    throw new Error("Unable to fetch customers");
  }

  return response.json();
};

export const getDashboardSummary =
  async (): Promise<DashboardSummary> => {

    const response = await fetch(
      `${API_URL}/Dashboard/summary`
    );

    if (!response.ok) {
      throw new Error("Unable to fetch dashboard summary");
    }

    return response.json();
  };
