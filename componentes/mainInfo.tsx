
import { FaBox, FaClipboardList, FaTools, FaTruck } from "react-icons/fa";

const infoCards = [
  { title: "Total Stock", value: "1,200", icon: <FaBox />, color: "primary" },
  { title: "Pedidos Pendientes", value: "15", icon: <FaClipboardList />, color: "danger" },
  { title: "Materiales en Stock", value: "340", icon: <FaTools />, color: "success" },
  { title: "Órdenes Enviadas", value: "87", icon: <FaTruck />, color: "warning" },
];

export function InfoCards() {
  return (
    <section aria-labelledby="info-cards-section">
      <header>
        <h2 id="info-cards-section" className="mb-3">Resumen de Inventario</h2>
      </header>
      <div className="row">
        {infoCards.map((card, index) => (
          <article key={index} className="col-md-3">
            <div className={`card text-white bg-${card.color} mb-3`}>
              <div className="card-body d-flex align-items-center">
                <figure className="me-3 fs-1">{card.icon}</figure>
                <div>
                  <h3 className="h5">{card.title}</h3>
                  <p className="fs-4 fw-bold">{card.value}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

