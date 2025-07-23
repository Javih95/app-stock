import { Producto, PedidoProducto, Pedido, NuevoPedido } from "@/types/pedidos";
import { useClientes } from "@/hooks/useClientes";
interface Props {
  productos: Producto[];
  nuevoPedido: NuevoPedido;
  setNuevoPedido: React.Dispatch<React.SetStateAction<NuevoPedido>>;
  onClose: () => void;
  onCreatePedido: () => void;
  productoSeleccionado: string;
  setProductoSeleccionado: (v: string) => void;
  cantidadSeleccionada: number;
  setCantidadSeleccionada: (v: number) => void;
  onAgregarProducto: () => void;
  onQuitarProducto: (index: number) => void;
}

export function ModalNuevoPedido({
  productos,
  nuevoPedido,
  setNuevoPedido,
  onClose,
  onCreatePedido,
  productoSeleccionado,
  setProductoSeleccionado,
  cantidadSeleccionada,
  setCantidadSeleccionada,
  onAgregarProducto,
  onQuitarProducto
}: Props) {
  const { clientes } = useClientes();
  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Nuevo Pedido</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body ">
            <select className="form-select d-flex mb-2 gap-2"
              value={nuevoPedido.clienteId}
              onChange={(e) => setNuevoPedido({ ...nuevoPedido, clienteId: (e.target.value) })}
            >
              <option value="">Selecciona un cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </select>


            <div className="d-flex mb-2 gap-2">
              <select
                className="form-select"
                onChange={(e) => setProductoSeleccionado(e.target.value)}
                value={productoSeleccionado}
              >
                <option value="">Selecciona un producto</option>
                {productos.map((prod) => (
                  <option key={prod.id} value={prod.art}>
                    {prod.art} - {prod.descripcion}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className="form-control"
                placeholder="Cantidad"
                value={cantidadSeleccionada}
                onChange={(e) => setCantidadSeleccionada(Number(e.target.value))}
                min={1}
              />
              <button className="btn btn-primary" onClick={onAgregarProducto} type="button">
                +
              </button>
            </div>

            <ul>
              {nuevoPedido.productos.map((prod, idx) => (
                <li key={idx}>
                  {prod.art} - {prod.descripcion} - Cantidad: {prod.cantidad}{" "}
                  <button className="btn btn-sm btn-danger ms-2" onClick={() => onQuitarProducto(idx)}>
                    x
                  </button>
                </li>
              ))}
            </ul>

            <input
              type="date"
              className="form-control mb-2"
              value={nuevoPedido.fecha}
              onChange={(e) => setNuevoPedido({ ...nuevoPedido, fecha: e.target.value })}
            />
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={nuevoPedido.entregado}
                onChange={(e) => setNuevoPedido({ ...nuevoPedido, entregado: e.target.checked })}
                id="entregadoCheck"
              />
              <label className="form-check-label" htmlFor="entregadoCheck">
                Entregado
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button className="btn btn-primary" onClick={onCreatePedido}>Guardar Pedido</button>
          </div>
        </div>
      </div>
    </div>
  );
}
