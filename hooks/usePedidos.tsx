import { useState, useEffect } from "react";
import { Pedido } from "@/types/pedidos";
export const usePedidos = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPedidos = async () => {
        try {
            const res = await fetch("https://api-control-stock-deploy.vercel.app/pedidos");
            const data = await res.json();

            const pedidosTransformados = data.map((p: any) => ({
                id: p.id,
                cliente: `Cliente #${p.clienteId}`,
                productos: p.productos,
                fecha: new Date(p.fecha).toLocaleDateString(),
                entregado: p.entregado === 1,
            }));

            setPedidos(pedidosTransformados);
        } catch (error) {
            console.error("Error al obtener los pedidos:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchPedidos();
    }, []);

    return { pedidos, setPedidos,fetchPedidos ,loading};
}
