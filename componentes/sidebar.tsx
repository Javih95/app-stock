"use client";

import { FaHome, FaBox, FaTools, FaShoppingCart, FaBars } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";

const links = [
  { name: "Home", href: "/dashboard", icon: FaHome },
  { name: "Stock", href: "/dashboard/stock", icon: FaBox },
  { name: "Materiales", href: "/dashboard/materiales", icon: FaTools },
  { name: "Pedidos", href: "/dashboard/pedidos", icon: FaShoppingCart },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón para abrir el sidebar en móviles */}
      <button
        className="btn btn-dark d-md-none position-fixed top-0 start-0 m-3 z-3"
        onClick={() => setIsOpen(true)}
      >
        <FaBars />
      </button>

      {/* Sidebar en pantallas grandes */}
      <aside className="d-none d-md-flex flex-column bg-dark text-white vh-100 p-4">
        {/* Logo */}
        <div className="d-flex justify-content-center mb-4">
          <Image src="/logo.webp" alt="Logo" width={50} height={50} />
        </div>

        {/* Links del sidebar */}
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "d-flex align-items-center gap-2 p-2 text-white text-decoration-none rounded",
                pathname === link.href ? "bg-primary text-dark fw-bold" : "hover-effect"
              )}
            >
              <LinkIcon className="fs-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </aside>

      {/* Sidebar colapsable en móviles */}
      {isOpen && (
        <div className="position-fixed top-0 start-0 w-75 h-100 bg-dark text-white p-4 shadow-lg z-3">
          <button className="btn btn-outline-light mb-3" onClick={() => setIsOpen(false)}>
            Cerrar
          </button>
          {/* Logo */}
          <div className="d-flex justify-content-center mb-4">
            <Image src="/logo.webp" alt="Logo" width={50} height={50} />
          </div>

          {/* Links del sidebar */}
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "d-flex align-items-center gap-2 p-2 text-white text-decoration-none rounded",
                  pathname === link.href ? "bg-primary text-dark fw-bold" : "hover-effect"
                )}
                onClick={() => setIsOpen(false)} // Cerrar menú al hacer clic en un enlace
              >
                <LinkIcon className="fs-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
