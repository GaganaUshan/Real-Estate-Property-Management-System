import React, { useState } from "react";

interface PropertyFormProps {
  token: string;
  refreshList: () => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ token, refreshList }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, location, price }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to add property");
      }

      setName("");
      setLocation("");
      setPrice("");
      refreshList();
    } catch (err: unknown) {
      if (err instanceof Error) console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Property Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <button type="submit">Add Property</button>
    </form>
  );
};

export default PropertyForm;
