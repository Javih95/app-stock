"use client";

import { useSearchParams } from "next/navigation";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

interface Product {
  id: number;
  art: string;
  descripcion: string;
  quantity: number;
}

interface ProductTableProps {
  products: Product[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  // Filtrar productos por el término de búsqueda
  const filteredProducts = products.filter((product) =>
    product.art.toLowerCase().includes(query)
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
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.art}</td>
                  <td className="text-truncate" style={{ maxWidth: "200px" }}>
                    {product.descripcion}
                  </td>
                  <td>{product.quantity}</td>
                  <td className="d-flex flex-column flex-md-row gap-2">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => onEdit(product.id)}>
                      <FaPencilAlt /> Editar
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(product.id)}>
                      <FaTrash /> Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">No se encontraron productos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Vista en tarjetas para móviles */}
      <div className="d-block d-md-none">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="border p-3 mb-2 rounded shadow-sm">
              <p><strong>Artículo:</strong> {product.art}</p>
              <p><strong>Descripción:</strong> {product.descripcion}</p>
              <p><strong>Cantidad:</strong> {product.quantity}</p>
              <div className="d-flex flex-column gap-2">
                <button className="btn btn-outline-primary btn-sm" onClick={() => onEdit(product.id)}>
                  <FaPencilAlt /> Editar
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(product.id)}>
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
