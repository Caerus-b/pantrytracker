"use client";

import { useState } from "react";
import { Item } from "@/types/item";
import ItemCard from "./ItemCard";

interface ItemListProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

export default function ItemList({ items, onEdit, onDelete }: ItemListProps) {
  const [filter, setFilter] = useState<"all" | "fridge" | "pantry">("all");
  const [sortBy, setSortBy] = useState<"name" | "expiry">("expiry");

  const filtered = items.filter(item => filter === "all" || item.location === filter);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
  });

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold mb-2">No items yet</h3>
        <p className="text-base-content/70">Add your first item to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="tabs tabs-boxed">
          <button
            className={`tab ${filter === "all" ? "tab-active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({items.length})
          </button>
          <button
            className={`tab ${filter === "fridge" ? "tab-active" : ""}`}
            onClick={() => setFilter("fridge")}
          >
            Fridge ({items.filter(i => i.location === "fridge").length})
          </button>
          <button
            className={`tab ${filter === "pantry" ? "tab-active" : ""}`}
            onClick={() => setFilter("pantry")}
          >
            Pantry ({items.filter(i => i.location === "pantry").length})
          </button>
        </div>

        <div className="form-control">
          <select
            className="select select-bordered w-full sm:w-auto"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "expiry")}
          >
            <option value="expiry">Sort by Expiry</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-base-content/70">No items in {filter === "all" ? "this category" : filter}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map(item => (
            <ItemCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

