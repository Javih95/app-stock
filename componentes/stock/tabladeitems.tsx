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
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
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
                <td>{product.descripcion}</td>
                <td>{product.quantity}</td>
                <td className="d-flex">
                  <button className="btn btn-outline-primary btn-sm me-2" onClick={() => onEdit(product.id)}>
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
  );
}
