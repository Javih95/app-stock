"use client"
import { ProductTable } from "../../../componentes/stock/tabladeitems"
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
const initialProducts = [
  { id: 1, art: "Producto 1", descripcion: "negro", quantity: 10},
  { id: 2, art: "Producto 2", descripcion: "blanco", quantity: 5},
  { id: 3, art: "Producto 3", descripcion: "perla", quantity: 15},
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
        <input type="text" className="form-control w-25" placeholder="Buscar..." />
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
