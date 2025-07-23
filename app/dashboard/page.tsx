"use client";
import Link from "next/link";

export default function Home() {
  const sections = [
    { title: "Productos", path: "/dashboard/productos", bg: "bg-primary" },
    { title: "Materiales", path: "/dashboard/materiales", bg: "bg-success" },
    { title: "Pedidos", path: "/dashboard/pedidos", bg: "bg-warning" },
    { title: "Clientes", path: "/dashboard/clientes", bg: "bg-info" },
  ];

  return (
    <div className="container mt-2 mb-2 p-1">
      <h2>
        Secciones principales
      </h2>
      <div className="row g-4 mt-2">
        {/* Secciones principales */}
        {sections.map((section) => (
          <div key={section.title} className="col-md-4">
            <Link href={section.path} className="text-decoration-none">
              <div className={`card text-white ${section.bg} shadow-lg`}>
                <div className="card-body text-center">
                  <h3 className="card-title">{section.title}</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}

        {/* Producción de hoy */}
        <div className="col-md-12">
          <div className="card border-dark shadow-lg">
            <div className="card-body text-center">
              <h3 className="card-title">Producción de Hoy</h3>
              <p className="card-text">Aquí puedes ver la producción del día.</p>
              <button className="btn btn-dark">Ver más</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
