import { useState, useEffect } from "react";
import { Pedido } from "@/types/pedidos";
import { useClientes } from "@/hooks/useClientes";

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const { clientes } = useClientes(); // ⬅️ Reutilizás tu hook

  const fetchPedidos = async () => {
    try {
      const res = await fetch("https://api-control-stock-deploy.vercel.app/pedidos");
      const data = await res.json();

      const pedidosTransformados = data.map((p: any) => {
        const cliente = clientes.find((c) => c.id === p.clienteId);
        return {
          id: p.id,
          cliente: cliente ? cliente.nombre : `Cliente #${p.clienteId}`,
          productos: p.productos,
          fecha: new Date(p.fecha).toLocaleDateString(),
          entregado: p.entregado === 1,
        };
      });

      setPedidos(pedidosTransformados);
    } catch (error) {
      console.error("Error al obtener los pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clientes.length > 0) {
      fetchPedidos();
    }
  }, [clientes]); // ⬅️ Ejecutar solo cuando se cargaron los clientes

  return { pedidos, setPedidos, fetchPedidos, loading };
};
