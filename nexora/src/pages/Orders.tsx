import { useEffect, useState } from "react";
import { getOrders } from "../services/api";
import type { Order } from "../types";

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>Order Management</h2>
          <p>View and manage customer orders.</p>
        </div>

        <button className="primary-button">
          + Create Order
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Order Date</th>
              <th>Items</th>
              <th>Total Amount</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerId}</td>
                <td>
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td>{order.items?.length ?? 0}</td>
                <td>
                  ₹{order.totalAmount.toLocaleString("en-IN")}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan={5}>No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;