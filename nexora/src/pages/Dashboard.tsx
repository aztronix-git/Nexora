import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Package,
  Users,
  IndianRupee
} from "lucide-react";

import { getDashboardSummary } from "../services/api";

function Dashboard() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const result = await getDashboardSummary();

        setTotalOrders(result.totalOrders);
        setTotalProducts(result.totalProducts);
        setTotalCustomers(result.totalCustomers);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  if (error) return <p className="error">{error}</p>;

  const cards = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart
    },
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: Users
    },
    {
      title: "Total Revenue",
      value: "--",
      icon: IndianRupee
    }
  ];

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>

      <div className="dashboard-cards">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div className="dashboard-card" key={card.title}>
              <Icon size={24} />

              <div>
                <p>{card.title}</p>
                <h2>{card.value}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;