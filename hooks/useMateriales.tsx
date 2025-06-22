import { Material } from "@/types/materiales";
import { useState, useEffect } from "react";
export const useMateriales = () => {
    const [materiales, setMateriales] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchMateriales = async () => {
        try {
            const res = await fetch("https://api-control-stock-deploy.vercel.app/materiales");
            const data = await res.json();
            setMateriales(data);
        } catch (error) {
            console.error("Error al obtener los materiales:", error);
        } finally {
            setLoading(false);
        }
    };
     useEffect(() => {
        fetchMateriales();
    }, []);

    return { materiales, setMateriales,fetchMateriales,loading};
}

