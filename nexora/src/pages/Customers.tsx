
import { useEffect, useState } from "react";
import { Users, Mail, Phone, MapPin } from "lucide-react";
import { getCustomers } from "../services/api";
import type { Customer } from "../types";

function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load customers"
        );
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Customer Management</h2>
          <p>View and manage your customers</p>
        </div>      
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>#{customer.id}</td>
                <td>
                  <div className="customer-name">
                    <Users size={18} />
                    {customer.name}
                  </div>
                </td>
                <td>
                  <Mail size={15} /> {customer.email}
                </td>
                <td>
                  <Phone size={15} /> {customer.phone}
                </td>
                <td>
                  <MapPin size={15} /> {customer.address}
                </td>
              </tr>
            ))}

            {customers.length === 0 && (
              <tr>
                <td colSpan={5}>No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;
