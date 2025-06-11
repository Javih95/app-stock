"use client"
import { ProductTable } from "../../../componentes/productos/tabladeitems"
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Search } from "@/componentes/productos/search";
interface Product {
  id: number;
  art: string;
  descripcion: string;
  quantity: number;
}
export default function Page() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newProducto, setNewProducto] = useState({
    art: "",
    descripcion: "",
    quantity: 0
  });

  const fetchProductos = async () => {
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
  const handleAddProducto = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("https://api-control-stock-deploy.vercel.app/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProducto),
      });
      if (!res.ok) throw new Error("Error al agregar material");
      const data = await res.json();
      setProductos((prev) => [...prev, data as Product]);
      setShowModal(false);
      setNewProducto({
        art: "",
        descripcion: "",
        quantity: 0
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleEdit = (id: number) => {
    const producto = productos.find((m) => m.id === id);
    if (!producto) return;

    setNewProducto({
      art: producto.art,
      descripcion: producto.descripcion,
      quantity: producto.quantity,
    });
    setEditingId(id);
    setIsEditing(true);
    setShowModal(true);
  };
  const handleUpdateProducto = async () => {
    if (editingId === null) return;
    try {
      const res = await fetch(`https://api-control-stock-deploy.vercel.app/productos/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProducto),
      });
      if (!res.ok) throw new Error("Error al actualizar producto");
      await res.json();
      const productoFinal = { ...newProducto, id: editingId };
      setProductos((prev) =>
        prev.map((m) => (m.id === editingId ? productoFinal : m))
      );
      setShowModal(false);
      setNewProducto({ art: "", descripcion: "", quantity: 0 });
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id: number) => {
    const confirmar = window.confirm("¿Estás seguro de que querés eliminar este producto?");
    if (!confirmar) return;

    try {
      const res = await fetch(`https://api-control-stock-deploy.vercel.app/productos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar el producto");
      setProductos((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error eliminando producto:", error);
      alert("Hubo un problema al intentar eliminar el producto.");
    }
  };
  if (loading) {
    return <div>Cargando...</div>;
  }
  const handleCloseModal = () => {
    setShowModal(false);
    setNewProducto({
      art: "",
      descripcion: "",
      quantity: 0
    });
    setIsEditing(false);
    setEditingId(null);
  };
  return (
    < div >
      <div className="d-flex justify-content-between align-items-center mt-2 mb-2 p-1 w-100">
        <h2 className="mb-0">Productos disponible</h2>
        <Search />
        <button className="btn btn-outline-primary btn-sm" onClick={() => setShowModal(true)}>
          <FaPlus /> Añadir Producto
        </button>
      </div>
      <div>
        <ProductTable products={productos} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      {showModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditing ? "Editar Producto" : "Nuevo Producto"}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Artículo"
                  value={newProducto.art}
                  onChange={(e) => setNewProducto({ ...newProducto, art: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Descripción"
                  value={newProducto.descripcion}
                  onChange={(e) => setNewProducto({ ...newProducto, descripcion: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Cantidad"
                  value={newProducto.quantity}
                  onChange={(e) => setNewProducto({ ...newProducto, quantity: Number(e.target.value) })}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                <button className="btn btn-primary" onClick={isEditing ? handleUpdateProducto : handleAddProducto} disabled={isSubmitting}>
                  {isSubmitting
                    ? (isEditing ? "Guardando cambios..." : "Guardando...")
                    : (isEditing ? "Guardar cambios" : "Guardar")
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div >
  )
}
