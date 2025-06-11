import { useEffect, useState } from "react";

export const useProductos = () => {
    const [productosDisponibles, setProductosDisponibles] = useState<any[]>([]);
    const fetchProductos = async () => {
        try {
            const res = await fetch("https://api-control-stock-deploy.vercel.app/productos");
            const data = await res.json();
            console.log("Productos disponibles:", data);
            setProductosDisponibles(data);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    }

    useEffect(() => {
        fetchProductos();
    }, []);

    return { productosDisponibles, setProductosDisponibles,fetchProductos };
}