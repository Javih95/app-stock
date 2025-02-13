
export function Header(){
  return (
    <header id="header" className="d-flex justify-content-between align-items-center p-4 bg-light w-100">
      <div className="d-flex align-items-center">
        <h1 className="h4 mb-0">Control de Stock</h1>
      </div>
      <input type="text" className="form-control w-25" placeholder="Buscar..." />
    </header>
  );
};

