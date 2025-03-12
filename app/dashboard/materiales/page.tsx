/*"use client"
import { MaterialesTabla } from "../../../componentes/materiales/tabladeMateriales"
import { useState , useEffect } from "react";
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
  const [loading, setLoading] = useState(true);

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
*/
"use client";
import { MaterialesTabla } from "../../../componentes/materiales/tabladeMateriales";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Search } from "@/componentes/stock/search";
interface Material {
  id: number;
  art: string;
  descripcion: string;
  tipo: string;
  quantity: number;
}

export default function Page() {
  const [materiales, setMateriales] = useState<Material[]>([]); 
  const [showModal, setShowModal] = useState(false); // Estado del modal
  const [newMaterial, setNewMaterial] = useState({
    art: "",
    descripcion: "",
    tipo: "",
    quantity: 0,
  });
  const [loading, setLoading] = useState(true);

  // Función para obtener los materiales desde la API
  const fetchMateriales = async () => {
    try {
      const res = await fetch("https://api-control-stock-deploy.vercel.app/materiales");
      const data = await res.json();
      setMateriales(data);
    } catch (error) {
      console.error("Error al obtener los materiales:", error);
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar la obtención de materiales cuando el componente se monte
  useEffect(() => {
    fetchMateriales();
  }, []); // Solo se ejecuta una vez cuando el componente se monta
  // Agregar nuevo material (POST)
  const handleAddMaterial = async () => {
    try {
      const res = await fetch("https://api-control-stock-deploy.vercel.app/materiales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMaterial),
      });
      if (!res.ok) throw new Error("Error al agregar material");
      const data = await res.json();
      setMateriales((prev) => [...prev, data as Material]); // Agregar material a la lista
      setShowModal(false); // Cerrar el modal
      setNewMaterial({ art: "", descripcion: "", tipo: "", quantity: 0 }); // Resetear formulario
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id: number) => {
    console.log(`Editar Material con ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Eliminar Material con ID: ${id}`);
  };

  const handleNew = () => {
    console.log(`Agregar Material`);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-2 mb-2 p-1 w-100">
        <h2 className="mb-0">Materiales disponibles</h2>
        <Search />
        <button className="btn btn-outline-primary btn-sm" onClick={() => setShowModal(true)}>
          <FaPlus /> Añadir Producto
        </button>
      </div>
            {/* Modal de Bootstrap */}
            {showModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nuevo Material</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Artículo"
                  value={newMaterial.art}
                  onChange={(e) => setNewMaterial({ ...newMaterial, art: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Descripción"
                  value={newMaterial.descripcion}
                  onChange={(e) => setNewMaterial({ ...newMaterial, descripcion: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Tipo"
                  value={newMaterial.tipo}
                  onChange={(e) => setNewMaterial({ ...newMaterial, tipo: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Cantidad"
                  value={newMaterial.quantity}
                  onChange={(e) => setNewMaterial({ ...newMaterial, quantity: Number(e.target.value) })}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={handleAddMaterial}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <MaterialesTabla materiales={materiales} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
    );
  }
