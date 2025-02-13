import { Header } from '../../componentes/header'
import { Sidebar } from "../../componentes/sidebar"
import {InfoCards} from"../../componentes/mainInfo"
import "bootstrap/dist/css/bootstrap.min.css"
export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    <div id="page"className="d-flex bg-secondary-subtle">
      <Sidebar />
      <div className="flex-grow-1">
      <Header />
      <main>
      {children }
      </main>
      </div>
    </div>
    );
  }
  