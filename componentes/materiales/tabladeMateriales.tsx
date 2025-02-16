"use client";

import { useSearchParams } from "next/navigation";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

interface Material {
  id: number;
  art: string;
  tipo: string;
  descripcion: string;
  quantity: number;
}

interface MaterialesTablaProps {
  materiales: Material[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function MaterialesTabla({ materiales, onEdit, onDelete }: MaterialesTablaProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  // Filtrar productos por el término de búsqueda
  const filtrarMateriales = materiales.filter((material) =>
    material.art.toLowerCase().includes(query)
  );

  return (
    <>
      {/* Tabla visible en pantallas medianas y grandes */}
      <div className="table-responsive d-none d-md-block">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Artículo</th>
              <th>Descripción</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrarMateriales.length > 0 ? (
              filtrarMateriales.map((material) => (
                <tr key={material.id}>
                  <td>{material.art}</td>
                  <td className="text-truncate" style={{ maxWidth: "200px" }}>
                    {material.descripcion}
                  </td>
                  <td>{material.tipo}</td>
                  <td>{material.quantity}</td>
                  <td className="d-flex flex-column flex-md-row gap-2">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => onEdit(material.id)}>
                      <FaPencilAlt /> Editar
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(material.id)}>
                      <FaTrash /> Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">No se encontraron productos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Vista en tarjetas para móviles */}
      <div className="d-block d-md-none">
        {filtrarMateriales.length > 0 ? (
          filtrarMateriales.map((material) => (
            <div key={material.id} className="border p-3 mb-2 rounded shadow-sm">
              <p><strong>Artículo:</strong> {material.art}</p>
              <p><strong>Descripción:</strong> {material.descripcion}</p>
              <p><strong>Tipo:</strong> {material.tipo}</p>
              <p><strong>Cantidad:</strong> {material.quantity}</p>
              <div className="d-flex flex-column gap-2">
                <button className="btn btn-outline-primary btn-sm" onClick={() => onEdit(material.id)}>
                  <FaPencilAlt /> Editar
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(material.id)}>
                  <FaTrash /> Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No se encontraron productos</p>
        )}
      </div>
    </>
  );
}
