"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useClientes } from "@/hooks/useClientes";
import { ModalNuevoCliente } from "@/componentes/clientes/modalClientes";
import { ClientesTabla } from "@/componentes/clientes/tablaClientes";
import { Cliente } from "@/types/cliente";
import { Search } from "@/componentes/productos/search";
import { Suspense } from "react";
export default function ClientesPage() {
    const [showModal, setShowModal] = useState(false);
    const { clientes, setClientes } = useClientes();

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [newCliente, setNewCliente] = useState<Cliente>({
        id: 0,
        nombre: "",
        direccion: "",
        telefono: "",
        pedidos: [],
    });

    const handleAddCliente = async () => {
        try {
            const res = await fetch("https://api-control-stock-deploy.vercel.app/clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCliente),
            });
            if (!res.ok) throw new Error("Error al agregar cliente");
            const data = await res.json();
            setClientes((prev) => [...prev, data]);
            handleCloseModal();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (id: number) => {
        const cliente = clientes.find((c) => c.id === id);
        if (!cliente) return;
        setNewCliente({
            id: cliente.id,
            nombre: cliente.nombre,
            direccion: cliente.direccion,
            telefono: cliente.telefono,
            pedidos: cliente.pedidos,
        });
        setEditingId(id);
        setIsEditing(true);
        setShowModal(true);
    };


    const handleUpdateCliente = async () => {
        if (editingId === null) return;

        try {
            const res = await fetch(`https://api-control-stock-deploy.vercel.app/clientes/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCliente),
            });
            if (!res.ok) throw new Error("Error al actualizar cliente");
            await res.json();
            setClientes((prev) =>
                prev.map((c) => (c.id === editingId ? newCliente : c))
            );
            handleCloseModal();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        const confirmar = window.confirm("¿Seguro que querés eliminar este cliente?");
        if (!confirmar) return;

        try {
            const res = await fetch(`https://api-control-stock-deploy.vercel.app/clientes/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Error al eliminar cliente");

            setClientes((prev) => prev.filter((c) => c.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewCliente({ id: 0, nombre: "", direccion: "", telefono: "", pedidos: [] });
        setIsEditing(false);
        setEditingId(null);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mt-2 mb-2 p-1 w-100">
                <h2 className="mb-0">Clientes registrados</h2>
                <Suspense fallback={<div className="form-control w-25">Cargando...</div>}>
                    <Search />
                </Suspense>
                <button className="btn btn-outline-primary btn-sm" onClick={() => setShowModal(true)}>
                    <FaPlus /> Añadir Cliente
                </button>
            </div>

            {showModal && (
                <ModalNuevoCliente
                    newCliente={newCliente}
                    setNewCliente={setNewCliente}
                    isEditing={isEditing}
                    handleCloseModal={handleCloseModal}
                    handleAddCliente={handleAddCliente}
                    handleUpdateCliente={handleUpdateCliente}
                />
            )}

            <ClientesTabla clientes={clientes} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
}
