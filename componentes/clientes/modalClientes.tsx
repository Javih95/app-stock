import { useState } from "react";
import { Cliente } from "@/types/cliente";

interface Props {
  newCliente: Cliente;
  setNewCliente: React.Dispatch<React.SetStateAction<Cliente>>;
  isEditing: boolean;
  handleCloseModal: () => void;
  handleAddCliente: () => void;
  handleUpdateCliente: () => void;
}


export function ModalNuevoCliente({  newCliente,
  setNewCliente,
  isEditing,
  handleCloseModal,
  handleAddCliente,
  handleUpdateCliente, }: Props) {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");

  const handleGuardar = async () => {
    if (!nombre || !direccion || !telefono) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await fetch("https://api-control-stock-deploy.vercel.app/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, direccion, telefono }),
      });

      if (!res.ok) {
        throw new Error("Error al crear cliente");
      }

      // Limpiar formulario y cerrar modal
      handleAddCliente;
      handleCloseModal();
    } catch (err) {
      setError("Hubo un problema al guardar el cliente");
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Nuevo Cliente</h5>
            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
          </div>

          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleCloseModal}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={handleGuardar}>
              Guardar Cliente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
