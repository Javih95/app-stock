"use client"
import { ProductTable } from "../../../componentes/stock/tabladeitems"
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Search } from "@/componentes/stock/search";
const initialProducts = [
  { id: 1, art: "Producto 1", descripcion: "negro", quantity: 10},
  { id: 2, art: "Producto 2", descripcion: "blanco", quantity: 5},
  { id: 3, art: "Producto 3", descripcion: "perla", quantity: 15},
  { id: 4, art: "Producto 4", descripcion: "negro", quantity: 10},
  { id: 5, art: "Producto 5", descripcion: "blanco", quantity: 5},
  { id: 6, art: "Producto 6", descripcion: "perla", quantity: 15},
];
export default function Page() {
  const [products, setProducts] = useState(initialProducts);

  const handleEdit = (id: number) => {
    console.log(`Editar producto con ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Eliminar producto con ID: ${id}`);
  }
  const handleNew = () => {
    console.log(`Agregar producto`);
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
        <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div >
  )
}
