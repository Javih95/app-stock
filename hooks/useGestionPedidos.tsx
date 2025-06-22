import { Pedido,NuevoPedido,Producto } from "@/types/pedidos";
export const crearPedido = async (
  nuevoPedido: {
    clienteId: string;
    productos: { art: string; descripcion: string; cantidad: number }[];
    fecha: string;
    entregado: boolean;
  },
  fetchPedidos: () => Promise<void>,
  handleCloseModal: () => void
) => {
  try {
    const res = await fetch("https://api-control-stock-deploy.vercel.app/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clienteId: parseInt(nuevoPedido.clienteId),
        productos: nuevoPedido.productos,
        fecha: nuevoPedido.fecha || new Date().toISOString(),
        entregado: nuevoPedido.entregado ? 1 : 0,
      }),
    });

    if (!res.ok) throw new Error("Error al guardar el pedido");

    await fetchPedidos();
    handleCloseModal();
  } catch (error) {
    console.error("Error al guardar el pedido:", error);
    alert("Hubo un error al guardar el pedido.");
  }
};

export const toggleEntrega = async (
  pedidos: Pedido[],
  id: number,
  setPedidos: React.Dispatch<React.SetStateAction<Pedido[]>>
) => {
  const pedido = pedidos.find(p => p.id === id);
  if (!pedido) return;

  const nuevoEstado = !pedido.entregado;

  try {
    const res = await fetch(`https://api-control-stock-deploy.vercel.app/pedidos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clienteId: parseInt(pedido.cliente.split("#")[1]),
        productos: pedido.productos,
        fecha: new Date().toISOString(),
        entregado: nuevoEstado ? 1 : 0,
      }),
    });

    if (!res.ok) throw new Error("Error al actualizar el pedido");

    setPedidos((prev: Pedido[]) =>
      prev.map(p => (p.id === id ? { ...p, entregado: nuevoEstado } : p))
    );
  } catch (error) {
    console.error("Error al marcar como entregado:", error);
    alert("Hubo un error al actualizar el pedido.");
  }
};



export const agregarProducto = (
  productoSeleccionado: string,
  cantidadSeleccionada: number,
  productosDisponibles: Producto[],
  setNuevoPedido: React.Dispatch<React.SetStateAction<NuevoPedido>>,
  resetCampos?: () => void 
) => {
  if (!productoSeleccionado || cantidadSeleccionada <= 0) {
    alert("Selecciona producto y cantidad válidos");
    return;
  }

  const producto = productosDisponibles.find(p => p.art === productoSeleccionado);
  if (!producto) {
    alert("Producto no encontrado");
    return;
  }

  setNuevoPedido(prev => ({
    ...prev,
    productos: [...prev.productos, {
      art: producto.art,
      descripcion: producto.descripcion,
      cantidad: cantidadSeleccionada,
    }],
  }));

  if (resetCampos) resetCampos();
};
export const QuitarProducto=(
    setNuevoPedido: React.Dispatch<React.SetStateAction<NuevoPedido>>,
    index: number
)=>{
    setNuevoPedido(prev => ({
      ...prev,
      productos: prev.productos.filter((_, i) => i !== index),
    }));
}
