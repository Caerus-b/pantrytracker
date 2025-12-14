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
      setExpiryDate(formatDDMMYY(new Date(item.expiryDate)));
      setLocation(item.location);
      setNotes(item.notes || "");
    } else {
      setExpiryDate(formatDDMMYY(new Date()));
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !expiryDate) return;

    const iso = parseDDMMYYToISO(expiryDate);
    if (!iso) {
      // invalid date format/values
      return;
    }

    onSubmit({
      name: name.trim(),
      expiryDate: iso,
      location,
      notes: notes.trim() || undefined,
    });
  };

  function formatDDMMYY(d: Date) {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }

  function parseDDMMYYToISO(s: string) {
    const m = s.match(/^(\d{2})\/(\d{2})\/(\d{2})$/);
    if (!m) return null;
    const day = Number(m[1]);
    const month = Number(m[2]);
    const year = 2000 + Number(m[3]);
    const d = new Date(year, month - 1, day);
    if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) return null;
    // return ISO at midnight UTC-equivalent using Date.UTC to avoid timezone shifts
    return new Date(Date.UTC(year, month - 1, day)).toISOString();
  }

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
              type="text"
              inputMode="numeric"
              placeholder="dd/mm/yy"
              maxLength={8}
              className="input input-bordered w-full"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              pattern="[0-9]{2}/[0-9]{2}/[0-9]{2}"
              title="Format: dd/mm/yy"
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

