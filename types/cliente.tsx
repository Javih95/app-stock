export interface Cliente {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  pedidos: any[]; // o podés definir un tipo Pedido más adelante
}
