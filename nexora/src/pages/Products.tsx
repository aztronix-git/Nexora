
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import type { Product } from "../types";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  const pageSize = 10;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts(pageNumber, pageSize);
        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [pageNumber]);

  return (
    <div className="page">
      <h2>Product Management</h2>

      {loading && <p>Loading products...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <table className="data-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Reorder Level</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>
                    ₹{product.price.toLocaleString("en-IN")}
                  </td>
                  <td>{product.reorderLevel}</td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan={5}>No products found.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="pagination">
            <button
              disabled={pageNumber === 1}
              onClick={() => setPageNumber((prev) => prev - 1)}
            >
              Previous
            </button>

            <span>Page {pageNumber}</span>

            <button
              disabled={products.length < pageSize}
              onClick={() => setPageNumber((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
