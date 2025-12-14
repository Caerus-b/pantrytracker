"use client";

import { useState, useEffect } from "react";
import { Item } from "@/types/item";

interface ItemFormProps {
  item?: Item | null;
  onSubmit: (item: Omit<Item, "id">) => void;
  onCancel: () => void;
}

export default function ItemForm({ item, onSubmit, onCancel }: ItemFormProps) {
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [location, setLocation] = useState<"fridge" | "pantry">("fridge");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (item) {
      setName(item.name);
      setExpiryDate(item.expiryDate.split('T')[0]);
      setLocation(item.location);
      setNotes(item.notes || "");
    } else {
      setExpiryDate(new Date().toISOString().split('T')[0]);
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !expiryDate) return;

    onSubmit({
      name: name.trim(),
      expiryDate: new Date(expiryDate).toISOString(),
      location,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-xl mb-4">
          {item ? "Edit Item" : "Add Item"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Item Name</span>
            </label>
            <input
              type="text"
              placeholder="Milk, Bread, etc."
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Expiry Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <div className="join w-full">
              <input
                className="join-item btn"
                type="radio"
                name="location"
                aria-label="Fridge"
                checked={location === "fridge"}
                onChange={() => setLocation("fridge")}
              />
              <input
                className="join-item btn"
                type="radio"
                name="location"
                aria-label="Pantry"
                checked={location === "pantry"}
                onChange={() => setLocation("pantry")}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Notes</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Optional notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="card-actions justify-end mt-4">
            <button type="button" className="btn btn-ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {item ? "Update" : "Add"} Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

