"use client";

import { useRouter } from "next/navigation";

export function Launcher() {
  const router = useRouter();

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Bienvenido a nuestro sistema de gestión</h1>
      <p className="lead">
        Optimiza tu control de stock y pedidos con nuestra plataforma intuitiva y eficiente.
      </p>

      <div className="row mt-5">
        {/* Servicios */}
        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h3>Gestión de Stock</h3>
            <p>Administra tu inventario de manera sencilla y organizada.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h3>Pedidos</h3>
            <p>Registra y controla los pedidos en tiempo real.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h3>Reportes</h3>
            <p>Obtén análisis detallados sobre tu negocio.</p>
          </div>
        </div>
      </div>

      {/* Botón para ir al Dashboard */}
      <button className="btn btn-primary mt-5" onClick={() => router.push("/dashboard")}>
        Ir al Dashboard
      </button>
    </div>
  );
}
