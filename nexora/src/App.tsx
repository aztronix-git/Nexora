import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Warehouse,
  CreditCard,
  Menu
} from "lucide-react";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";       
import Customers from "./pages/Customers";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Orders", icon: ShoppingCart },
    { name: "Products", icon: Package },
    { name: "Customers", icon: Users },
    { name: "Inventory", icon: Warehouse },
    { name: "Payments", icon: CreditCard },
  ];

  return (
    <div className="app-container">

      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <h2 className="logo">NEXORA</h2>

        <p className="menu-title">MAIN MENU</p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`menu-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => {
                setActivePage(item.name);
                setMenuOpen(false);
              }}
            >
              <Icon size={19} />
              {item.name}
            </button>
          );
        })}
      </aside>

      <main className="main-content">

        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu />
          </button>

          <h3>{activePage}</h3>

          <div className="user-profile">
            <span>Admin</span>
            <div className="avatar">A</div>
          </div>
        </header>

        <section className="page-content">

          {activePage === "Dashboard" && <Dashboard />}

          {activePage === "Orders" && <Orders />}

          {activePage === "Products" && <Products />}

          {activePage === "Customers" && <Customers />}

          {activePage !== "Dashboard" &&
            activePage !== "Orders" && activePage !== "Products" &&(
              <h2>{activePage} module coming soon</h2>
            )}
        
        </section>

      </main>
    </div>
  );
}

export default App;