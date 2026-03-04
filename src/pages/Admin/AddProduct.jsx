import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [available, setAvailable] = useState(true); // optional
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("adminToken");

  const submit = async () => {
    const formData = new FormData();

    // Create product object
    const product = {
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      available
    };

    // Append the product JSON as a blob
    formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));

    // Append image if exists
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:8080/api/admin/products", formData, {
        headers: {
          Authorization: "Bearer " + token.trim(),
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Product added successfully!");
      // Reset form
      setName("");
      setPrice("");
      setStock("");
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  return (
    <div>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <input placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button onClick={submit}>Add Product</button>
    </div>
  );
}
