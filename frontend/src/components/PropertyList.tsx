import React, { useEffect, useState } from "react";

interface Property {
  _id: string;
  name: string;
  location: string;
  price: string;
}

interface PropertyListProps {
  token: string;
  refreshKey: number;
}

const PropertyList: React.FC<PropertyListProps> = ({ token, refreshKey }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://localhost:5000/api/properties", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch properties");

      const data = await res.json();
      setProperties(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [refreshKey]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to delete property");
      }

      setProperties((prev) => prev.filter((prop) => prop._id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) console.error(err.message);
      else console.error("Unknown error deleting property");
    }
  };

  return (
    <div>
      <h2>Property List</h2>
      {loading && <p>Loading properties...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && properties.length === 0 && <p>No properties found.</p>}
      <ul>
        {properties.map((prop) => (
          <li key={prop._id}>
            <span>{prop.name} - {prop.location} - ${prop.price}</span>
            <button onClick={() => handleDelete(prop._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;
