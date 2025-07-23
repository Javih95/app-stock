"use client";

import { useSearchParams } from "next/navigation";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

import { Cliente } from "@/types/cliente";

interface ClientesTablaProps {
  clientes: Cliente[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function ClientesTabla({ clientes, onEdit, onDelete }: ClientesTablaProps) {
  const searchParams = useSearchParams();
  const query = (searchParams.get("query") ?? "").toLowerCase();

  const filtrarClientes = query
    ? clientes.filter((c) => c.nombre.toLowerCase().includes(query))
    : clientes;

  return (
    <>
      {/* Tabla para pantallas grandes */}
      <div className="table-responsive d-none d-md-block">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrarClientes.length > 0 ? (
              filtrarClientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.telefono}</td>
                  <td className="d-flex flex-column flex-md-row gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => onEdit(cliente.id)}
                    >
                      <FaPencilAlt /> Editar
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => onDelete(cliente.id)}
                    >
                      <FaTrash /> Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">No se encontraron clientes</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Vista móvil */}
      <div className="d-block d-md-none">
        {filtrarClientes.length > 0 ? (
          filtrarClientes.map((cliente) => (
            <div key={cliente.id} className="border p-3 mb-2 rounded shadow-sm">
              <p><strong>Nombre:</strong> {cliente.nombre}</p>
              <p><strong>Dirección:</strong> {cliente.direccion}</p>
              <p><strong>Teléfono:</strong> {cliente.telefono}</p>
              <div className="d-flex flex-column gap-2">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => onEdit(cliente.id)}
                >
                  <FaPencilAlt /> Editar
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onDelete(cliente.id)}
                >
                  <FaTrash /> Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No se encontraron clientes</p>
        )}
      </div>
    </>
  );
}
