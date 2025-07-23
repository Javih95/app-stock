import { useEffect, useState } from "react";

export const useClientes = () => {
  const [clientes, setClientes] = useState<{
    id: number; nombre: string, direccion: string;
    telefono: string;
    pedidos: any[];
  }[]>([]);

  const fetchClientes = async () => {
    try {
      const res = await fetch("https://api-control-stock-deploy.vercel.app/clientes");
      const data = await res.json();
      setClientes(data);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return { clientes, setClientes };
};

