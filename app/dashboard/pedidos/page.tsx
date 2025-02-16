"use client"
import { Pedidos } from "@/componentes/pedidos/cardsPedidos"; 
import { useState } from "react";
export default function PedidosPage() {
  const [pedidos, setPedidos] =useState([
    {
      id: 1,
      cliente: "Juan Pérez",
      productos: ["Producto A", "Producto B"],
      fecha: "2025-02-16",
      entregado: false,
    },
    {
      id: 2,
      cliente: "Ana Gómez",
      productos: ["Producto C"],
      fecha: "2025-02-14",
      entregado: true,
    },
  ]);

  const handleToggleEntrega = (id: number) => {
    setPedidos((prevPedidos) =>
      prevPedidos.map((pedido) =>
        pedido.id === id
          ? { ...pedido, entregado: !pedido.entregado }
          : pedido
      )
    );
  };

  const handleCreatePedido = () => {
    const newPedido = {
      id: pedidos.length + 1,
      cliente: "Nuevo Cliente",
      productos: ["Nuevo Producto"],
      fecha: new Date().toISOString(),
      entregado: false,
    };
    setPedidos((prevPedidos) => [...prevPedidos, newPedido]);
  };

  return (
    <div>
      <Pedidos
        pedidos={pedidos}
        onToggleEntrega={handleToggleEntrega}
        onCreatePedido={handleCreatePedido}
      />
    </div>
  );
}
