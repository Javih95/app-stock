"use client";
import { Pedidos } from "@/componentes/pedidos/cardsPedidos";
import { ModalNuevoPedido } from "@/componentes/pedidos/modalPedidos";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Search } from "@/componentes/productos/search";
import {usePedidos} from "@/hooks/usePedidos"
import {useProductos} from "@/hooks/useProductos"
export default function PedidosPage() {
  const [showModal, setShowModal] = useState(false);
  const { pedidos, setPedidos, loading: loadingPedidos, fetchPedidos } = usePedidos();
  const {productosDisponibles} = useProductos();
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);

  const [nuevoPedido, setNuevoPedido] = useState({
    clienteId: "",
    fecha: "",
    entregado: false,
    productos: [] as { art: string, descripcion: string; cantidad: number }[],
  });

  const handleToggleEntrega = async (id: number) => {
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
          clienteId: parseInt(pedido.cliente.split("#")[1]), // extraer ID de cliente
          productos: pedido.productos,
          fecha: new Date().toISOString(),
          entregado: nuevoEstado ? 1 : 0,
        }),
      });

      if (!res.ok) throw new Error("Error al actualizar el pedido");

      setPedidos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, entregado: nuevoEstado } : p
        )
      );
    } catch (error) {
      console.error("Error al marcar como entregado:", error);
      alert("Hubo un error al actualizar el pedido.");
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setNuevoPedido({
      clienteId: "",
      productos: [],
      fecha: "",
      entregado: false,
    });
  };

  const handleCreatePedido = async () => {
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


  const handleAgregarProducto = () => {
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
      productos: [...prev.productos, { art: producto.art, descripcion: producto.descripcion, cantidad: cantidadSeleccionada }],
    }));

    setProductoSeleccionado("");
    setCantidadSeleccionada(1);
  };

  const handleQuitarProducto = (index: number) => {
    setNuevoPedido(prev => ({
      ...prev,
      productos: prev.productos.filter((_, i) => i !== index),
    }));
  };

  return (
    <div >
      <div className="d-flex justify-content-between align-items-center mt-2 mb-2 p-1 w-100">
        <h2 className="mb-0">Pedidos</h2>
        <Search />
        <button className="btn btn-outline-primary btn-sm" onClick={() => setShowModal(true)}>
          <FaPlus /> Añadir Pedido
        </button>
      </div>
      <div>
        {loadingPedidos ? (
          <p>Cargando pedidos...</p>
        ) : (
          <Pedidos
            pedidos={pedidos}
            onToggleEntrega={handleToggleEntrega}
            onCreatePedido={handleCreatePedido}
          />
        )}
      </div>
      {showModal && (
        <ModalNuevoPedido
        productos={productosDisponibles}
          nuevoPedido={nuevoPedido}
          setNuevoPedido={setNuevoPedido}
          onClose={() => setShowModal(false)}
          onCreatePedido={handleCreatePedido}
          productoSeleccionado={productoSeleccionado}
          setProductoSeleccionado={setProductoSeleccionado}
          cantidadSeleccionada={cantidadSeleccionada}
          setCantidadSeleccionada={setCantidadSeleccionada}
          onAgregarProducto={handleAgregarProducto}
          onQuitarProducto={handleQuitarProducto}
          />
      )}
    </div>
  );
}
