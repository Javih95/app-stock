import { Material } from "@/types/materiales";

interface Props {
  newMaterial: Material;
  setNewMaterial: (material: Material) => void;
  isEditing: boolean;
  handleCloseModal: () => void;
  handleAddMaterial: () => void;
  handleUpdateMaterial: () => void;
}

export function ModalNuevoMaterial({
  newMaterial,
  setNewMaterial,
  isEditing,
  handleCloseModal,
  handleAddMaterial,
  handleUpdateMaterial,
}: Props) {
  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEditing ? "Editar Material" : "Nuevo Material"}</h5>
            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Artículo"
              value={newMaterial.art}
              onChange={(e) => setNewMaterial({ ...newMaterial, art: e.target.value })}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Descripción"
              value={newMaterial.descripcion}
              onChange={(e) => setNewMaterial({ ...newMaterial, descripcion: e.target.value })}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Tipo"
              value={newMaterial.tipo}
              onChange={(e) => setNewMaterial({ ...newMaterial, tipo: e.target.value })}
            />
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Cantidad"
              value={newMaterial.quantity}
              onChange={(e) =>
                setNewMaterial({ ...newMaterial, quantity: Number(e.target.value) })
              }
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleCloseModal}>
              Cancelar
            </button>
            <button
              className="btn btn-primary"
              onClick={isEditing ? handleUpdateMaterial : handleAddMaterial}
            >
              {isEditing ? "Guardar cambios" : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
