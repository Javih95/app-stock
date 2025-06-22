
export interface Producto {
  id: number;
  art: string;
  descripcion: string;
  cantidad: number;
}
export interface PedidoProducto {
  art: string;
  descripcion: string;
  cantidad: number;
}
export interface Pedido {
  id: number;
  cliente: string;
  productos: Producto[];
  fecha: string;
  entregado: boolean;
}
export interface NuevoPedido {
  clienteId: string;
  fecha: string;
  entregado: boolean;
  productos: PedidoProducto[];
}
