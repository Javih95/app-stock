"use client"
import { ProductTable } from "../../../componentes/stock/tabladeitems"
import { useState,useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Search } from "@/componentes/stock/search";

export default function Page() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchProductos=async()=>{
  try {
    const res = await fetch("https://api-control-stock-deploy.vercel.app/productos");
    const data = await res.json();
    setProductos(data);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchProductos();
}, []);
  const handleEdit = (id: number) => {
    console.log(`Editar producto con ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Eliminar producto con ID: ${id}`);
  };
  const handleNew = () => {
    console.log(`Agregar producto`);
  };
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    < div >
      <div className="d-flex justify-content-between align-items-center mt-2 mb-2 p-1 w-100">
        <h2 className="mb-0">Stock disponible</h2>
        <Search/>
        <button className="btn btn-outline-primary btn-sm" onClick={() => handleNew()}>
          <FaPlus /> Añadir Producto
        </button>
      </div>
      <div>
        <ProductTable products={productos} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div >
  )
}
