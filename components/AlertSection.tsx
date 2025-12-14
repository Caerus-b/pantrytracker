"use client";

import { Item } from "@/types/item";
import ItemCard from "./ItemCard";

interface AlertSectionProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

export default function AlertSection({ items, onEdit, onDelete }: AlertSectionProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDays = (date: string) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const expired = items.filter(item => getDays(item.expiryDate) < 0);
  const todayItems = items.filter(item => getDays(item.expiryDate) === 0);
  const soon = items.filter(item => {
    const days = getDays(item.expiryDate);
    return days > 0 && days <= 3;
  });
  const thisWeek = items.filter(item => {
    const days = getDays(item.expiryDate);
    return days > 3 && days <= 7;
  });

  if (!expired.length && !todayItems.length && !soon.length && !thisWeek.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      {expired.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="badge badge-error badge-lg">Expired</div>
            <h2 className="text-2xl font-bold">Expired Items ({expired.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {expired.map(item => (
              <ItemCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}

      {todayItems.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="badge badge-warning badge-lg">Urgent</div>
            <h2 className="text-2xl font-bold">Expiring Today ({todayItems.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todayItems.map(item => (
              <ItemCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}

      {soon.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="badge badge-warning badge-lg">Soon</div>
            <h2 className="text-2xl font-bold">Expiring in 1-3 Days ({soon.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {soon.map(item => (
              <ItemCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}

      {thisWeek.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="badge badge-info badge-lg">This Week</div>
            <h2 className="text-2xl font-bold">Expiring This Week ({thisWeek.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {thisWeek.map(item => (
              <ItemCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

