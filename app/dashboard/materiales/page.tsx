"use client";
import { MaterialesTabla } from "../../../componentes/materiales/tabladeMateriales";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Search } from "@/componentes/productos/search";
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
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [newMaterial, setNewMaterial] = useState({
    art: "",
    descripcion: "",
    tipo: "",
    quantity: 0,
  });
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchMateriales();
  }, []);

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
    const material = materiales.find((m) => m.id === id);
    if (!material) return;

    setNewMaterial({
      art: material.art,
      descripcion: material.descripcion,
      tipo: material.tipo,
      quantity: material.quantity,
    });
    setEditingId(id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleUpdateMaterial = async () => {
    if (editingId === null) return;

    try {
      const res = await fetch(`https://api-control-stock-deploy.vercel.app/materiales/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMaterial),
      });
      if (!res.ok) throw new Error("Error al actualizar material");

      await res.json(); // lo consumimos aunque no lo usemos
      const materialFinal = { ...newMaterial, id: editingId };
      setMateriales((prev) =>
        prev.map((m) => (m.id === editingId ? materialFinal : m))
      );
      setShowModal(false);
      setNewMaterial({ art: "", descripcion: "", tipo: "", quantity: 0 });
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmar = window.confirm("¿Estás seguro de que querés eliminar este material?");
    if (!confirmar) return;

    try {
      const res = await fetch(`https://api-control-stock-deploy.vercel.app/materiales/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar el material");

      // Eliminamos el material del estado
      setMateriales((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error eliminando material:", error);
      alert("Hubo un problema al intentar eliminar el material.");
    }
  };


  if (loading) {
    return <div>Cargando...</div>;
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setNewMaterial({ art: "", descripcion: "", tipo: "", quantity: 0 });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-2 mb-2 p-1 w-100">
        <h2 className="mb-0">Materiales disponibles</h2>
        <Search />
        <button className="btn btn-outline-primary btn-sm" onClick={() => setShowModal(true)}>
          <FaPlus /> Añadir Material
        </button>
      </div>
      {/* Modal de Bootstrap */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditing ? "Editar Material" : "Nuevo Material"}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
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
                <button className="btn btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                <button className="btn btn-primary" onClick={isEditing ? handleUpdateMaterial : handleAddMaterial}>
                  {isEditing ? "Guardar cambios" : "Guardar"}
                </button>
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
