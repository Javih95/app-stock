"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Search } from "@/componentes/productos/search";
import { Pedidos } from "@/componentes/pedidos/cardsPedidos";
import { ModalNuevoPedido } from "@/componentes/pedidos/modalPedidos";
import { usePedidos } from "@/hooks/usePedidos";
import { useProductos } from "@/hooks/useProductos";
import { crearPedido, toggleEntrega ,agregarProducto,QuitarProducto} from "@/hooks/useGestionPedidos";

export default function PedidosPage() {
  const [showModal, setShowModal] = useState(false);
  const { pedidos, setPedidos, loading: loadingPedidos, fetchPedidos } = usePedidos();
  const { productosDisponibles } = useProductos();
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);

  const [nuevoPedido, setNuevoPedido] = useState({
    clienteId: "",
    fecha: "",
    entregado: false,
    productos: [] as { art: string; descripcion: string; cantidad: number }[],
  });

  const handleToggleEntrega = (id: number) => {
    toggleEntrega(pedidos, id, setPedidos);
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

  const handleCreatePedido = () => {
    console.log("Productos al crear pedido:", nuevoPedido.productos);
    crearPedido(nuevoPedido, fetchPedidos, handleCloseModal);
  };

  const handleAgregarProducto=()=>{
    agregarProducto(
      productoSeleccionado,
      cantidadSeleccionada,
      productosDisponibles,
      setNuevoPedido,
      () => {
      setProductoSeleccionado("");
      setCantidadSeleccionada(1);
    })
  };

  const handleQuitarProducto = (index: number) => {
    QuitarProducto(
      setNuevoPedido,index
    )
  };

  return (
    <div>
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
