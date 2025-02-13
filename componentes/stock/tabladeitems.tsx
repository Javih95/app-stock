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

export function ProductTable({ products, onEdit, onDelete }:ProductTableProps) {
  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Articulo</th>
            <th>Descripcion</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.art}</td>
              <td>{product.descripcion}</td>
              <td>{product.quantity}</td>
              <td className="d-flex">
                <button className="btn btn-outline-primary btn-sm ms-4" onClick={() => onEdit(product.id)}>
                  <FaPencilAlt /> Editar
                </button>
                <button className="btn btn-outline-danger btn-sm ms-5 " onClick={() => onDelete(product.id)}>
                  <FaTrash /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

