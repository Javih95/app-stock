'use client';
import { FaHome, FaBox, FaTools, FaShoppingCart } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from "clsx";
const links = [
  { name: 'Home', href: '/dashboard', icon: FaHome },
  { name: 'Stock', href: '/dashboard/stock', icon: FaBox },
  { name: 'Materiales', href: '/dashboard/materiales', icon: FaTools },
  { name: 'Pedidos', href: '/dashboard/pedidos', icon: FaShoppingCart }
]
export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="d-flex  flex-column bg-dark text-white vh-100 p-4 border-end">
      <div className="d-flex justify-content-center mb-4">
        <Image
          src="/logo.webp"
          alt="Logo"
          width={50}
          height={50}
        />
      </div>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>)
      })}
    </aside>
  );
};
