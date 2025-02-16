"use client"
import { MaterialesTabla } from "../../../componentes/materiales/tabladeMateriales"
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Search } from "@/componentes/stock/search";
const inicialesMateriales = [
  { id: 1, art: "Producto 1", descripcion: "negro",tipo:"tela", quantity: 10},
  { id: 2, art: "Producto 2", descripcion: "blanco",tipo:"tela", quantity: 5},
  { id: 3, art: "Producto 3", descripcion: "perla",tipo:"tela", quantity: 15},
  { id: 4, art: "Producto 4", descripcion: "negro",tipo:"limpieza", quantity: 10},
  { id: 5, art: "Jersey", descripcion: "blanco",tipo:"tela", quantity: 5},
  { id: 6, art: "Producto 6", descripcion: "perla",tipo:"pegamento", quantity: 15},
];
export default function Page() {
  const [materiales, setMateriales] = useState(inicialesMateriales);

  const handleEdit = (id: number) => {
    console.log(`Editar Material con ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Eliminar Material con ID: ${id}`);
  }
  const handleNew = () => {
    console.log(`Agregar Material`);
  }
  return (
    < div >
      <div className="d-flex justify-content-between align-items-center mt-2 mb-2 p-1 w-100">
        <h2 className="mb-0">Materiales disponibles</h2>
        <Search/>
        <button className="btn btn-outline-primary btn-sm" onClick={() => handleNew()}>
          <FaPlus /> Añadir Producto
        </button>
      </div>
      <div>
        <MaterialesTabla materiales={materiales} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div >
  )
}
