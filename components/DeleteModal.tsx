"use client";

interface DeleteModalProps {
  itemName: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({ itemName, isOpen, onConfirm, onCancel }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete Item</h3>
        <p className="py-4">
          Delete <strong>{itemName}</strong>? This can't be undone.
        </p>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="btn btn-error" onClick={onConfirm}>Delete</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onCancel}>
        <button>close</button>
      </form>
    </dialog>
  );
}

