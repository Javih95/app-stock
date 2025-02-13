// components/Footer.tsx
import React from "react";

export function Footer() {
  return (
    <footer className="bg-dark text-light py-3 text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} JaviH. Todos los derechos reservados.</p>
    </footer>
  );
};
