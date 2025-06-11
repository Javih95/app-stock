"use client";
import { Pedido } from "@/types/pedidos";

import { useSearchParams } from "next/navigation";

interface PedidosProps {
  pedidos: Pedido[];
  onToggleEntrega: (id: number) => void;
  onCreatePedido: () => void;
}

export function Pedidos({ pedidos, onToggleEntrega, onCreatePedido }: PedidosProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";
  const filtrarPedidos = pedidos.filter((pedido) =>
    pedido.cliente.toLowerCase().includes(query)
  );

  return (
    <div >
      <div className="table-responsive d-none d-md-block">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Productos</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrarPedidos.length > 0 ? (
              filtrarPedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.cliente}</td>
                  <td>{pedido.fecha}</td>
                  <td className="text-truncate" style={{ maxWidth: "200px" }}>
                    {pedido.productos.map((p) => `${p.art} (x${p.cantidad})`).join(", ")}
                  </td>
                  <td>{pedido.entregado ? "Entregado" : "Pendiente"}</td>
                  <td>
                    <button
                      className={`btn btn-${pedido.entregado ? "warning" : "success"} btn-sm`}
                      onClick={() => onToggleEntrega(pedido.id)}
                    >
                      {pedido.entregado ? "Marcar como no entregado" : "Marcar como entregado"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">No se encontraron pedidos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Vista en tarjetas para móviles */}
      <div className="d-block d-md-none">
        {filtrarPedidos.length > 0 ? (
          filtrarPedidos.map((pedido) => (
            <div key={pedido.id} className={`card mb-3 border-${pedido.entregado ? "success" : "danger"}`}>
              <div className="card-body">
                <h5 className="card-title">{pedido.cliente}</h5>
                <p className="card-text"><strong>Fecha:</strong> {pedido.fecha}</p>
                <p className="card-text"><strong>Productos:</strong> {pedido.productos.join(", ")}</p>
                <p className={`fw-bold text-${pedido.entregado ? "success" : "danger"}`}>
                  {pedido.entregado ? "Entregado" : "Pendiente"}
                </p>
                <button
                  className={`btn btn-${pedido.entregado ? "warning" : "success"} w-100`}
                  onClick={() => onToggleEntrega(pedido.id)}
                >
                  {pedido.entregado ? "Marcar como no entregado" : "Marcar como entregado"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No se encontraron pedidos</p>
        )}
      </div>
    </div>
  );
}
