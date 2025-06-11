
export interface Producto {
  id: number;
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
