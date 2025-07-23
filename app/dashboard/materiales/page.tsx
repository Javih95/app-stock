"use client";
import { MaterialesTabla } from "../../../componentes/materiales/tabladeMateriales";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useMateriales } from "@/hooks/useMateriales";
import { Material } from "@/types/materiales";
import { ModalNuevoMaterial } from "@/componentes/materiales/modalMateriales"
export default function Page() {

  const [showModal, setShowModal] = useState(false);
  const { materiales, setMateriales, loading } = useMateriales();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [newMaterial, setNewMaterial] = useState({
    id: 0,
    art: "",
    descripcion: "",
    tipo: "",
    quantity: 0,
  });

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
      setNewMaterial({ id: 0, art: "", descripcion: "", tipo: "", quantity: 0 }); // Resetear formulario
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id: number) => {
    const material = materiales.find((m) => m.id === id);
    if (!material) return;

    setNewMaterial({
      id: material.id,
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
      setNewMaterial({ id: 0, art: "", descripcion: "", tipo: "", quantity: 0 });
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
    setNewMaterial({ id: 0, art: "", descripcion: "", tipo: "", quantity: 0 });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-2 mb-2 p-1 w-100">
        <h2 className="mb-0">Materiales disponibles</h2>
        <button className="btn btn-outline-primary btn-sm" onClick={() => setShowModal(true)}>
          <FaPlus /> Añadir Material
        </button>
      </div>
      {/* Modal de Bootstrap */}
      {showModal && (
        <ModalNuevoMaterial
          newMaterial={newMaterial}
          setNewMaterial={setNewMaterial}
          isEditing={isEditing}
          handleCloseModal={handleCloseModal}
          handleAddMaterial={handleAddMaterial}
          handleUpdateMaterial={handleUpdateMaterial}
        />

      )}
      <div>
        <MaterialesTabla materiales={materiales} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
