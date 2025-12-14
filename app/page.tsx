"use client";

import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import ItemForm from "@/components/ItemForm";
import ItemList from "@/components/ItemList";
import AlertSection from "@/components/AlertSection";
import StatsCard from "@/components/StatsCard";
import DeleteModal from "@/components/DeleteModal";
import { Item } from "@/types/item";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; item: Item | null }>({
    isOpen: false,
    item: null,
  });

  useEffect(() => {
    const saved = localStorage.getItem("pantryItems");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load items", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pantryItems", JSON.stringify(items));
  }, [items]);

  const handleAddItem = (itemData: Omit<Item, "id">) => {
    const newItem: Item = {
      ...itemData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setItems([...items, newItem]);
    setShowForm(false);
  };

  const handleEditItem = (itemData: Omit<Item, "id">) => {
    if (!editingItem) return;
    setItems(items.map(item => 
      item.id === editingItem.id ? { ...itemData, id: editingItem.id } : item
    ));
    setEditingItem(null);
    setShowForm(false);
  };

  const handleDeleteClick = (item: Item) => {
    setDeleteModal({ isOpen: true, item });
  };

  const handleDeleteConfirm = () => {
    if (!deleteModal.item) return;
    setItems(items.filter(item => item.id !== deleteModal.item!.id));
    setDeleteModal({ isOpen: false, item: null });
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, item: null });
  };

  const handleEditClick = (item: Item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Pantry & Fridge</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingItem(null);
              setShowForm(true);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Item
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <ItemForm
              item={editingItem}
              onSubmit={editingItem ? handleEditItem : handleAddItem}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        {items.length > 0 && (
          <div className="mb-8">
            <StatsCard items={items} />
          </div>
        )}

        <div className="space-y-8">
          <AlertSection
            items={items}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />

          <div>
            <h2 className="text-2xl font-bold mb-4">All Items</h2>
            <ItemList
              items={items}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </div>
        </div>

        <DeleteModal
          itemName={deleteModal.item?.name || ""}
          isOpen={deleteModal.isOpen}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      </main>
    </div>
  );
}
