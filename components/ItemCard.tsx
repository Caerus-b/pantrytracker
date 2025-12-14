"use client";

import { Item } from "@/types/item";

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

export default function ItemCard({ item, onEdit, onDelete }: ItemCardProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(item.expiryDate);
  expiry.setHours(0, 0, 0, 0);
  
  const days = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  const getBadge = () => {
    if (days < 0) return <div className="badge badge-error gap-2">Expired</div>;
    if (days === 0) return <div className="badge badge-warning gap-2">Expires Today</div>;
    if (days <= 3) return <div className="badge badge-warning gap-2">Expires Soon</div>;
    if (days <= 7) return <div className="badge badge-info gap-2">Expires This Week</div>;
    return <div className="badge badge-success gap-2">Fresh</div>;
  };

  const getDaysText = () => {
    if (days < 0) return `${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''} ago`;
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    return `In ${days} days`;
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="card-title text-lg">{item.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="badge badge-outline">{item.location}</span>
              {getBadge()}
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-32 p-2 shadow-lg border border-base-300">
              <li><button onClick={() => onEdit(item)} className="text-sm">Edit</button></li>
              <li><button onClick={() => onDelete(item)} className="text-sm text-error">Delete</button></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-2 text-sm text-base-content/70">
          <p>Expires: {expiry.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          <p className="font-medium">{getDaysText()}</p>
        </div>
        
        {item.notes && (
          <div className="mt-2 text-sm text-base-content/60">
            <p className="italic">{item.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

