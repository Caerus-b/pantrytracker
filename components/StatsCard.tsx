"use client";

import { Item } from "@/types/item";

interface StatsCardProps {
  items: Item[];
}

export default function StatsCard({ items }: StatsCardProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDays = (date: string) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const expired = items.filter(item => getDays(item.expiryDate) < 0).length;
  const soon = items.filter(item => {
    const days = getDays(item.expiryDate);
    return days >= 0 && days <= 3;
  }).length;
  const fridge = items.filter(item => item.location === "fridge").length;
  const pantry = items.filter(item => item.location === "pantry").length;

  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
      <div className="stat">
        <div className="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
        </div>
        <div className="stat-title">Total Items</div>
        <div className="stat-value text-primary">{items.length}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-error">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <div className="stat-title">Expiring Soon</div>
        <div className="stat-value text-error">{soon}</div>
        <div className="stat-desc">Within 3 days</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-warning">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div className="stat-title">Expired</div>
        <div className="stat-value text-warning">{expired}</div>
        <div className="stat-desc">Needs attention</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
        </div>
        <div className="stat-title">Locations</div>
        <div className="stat-value text-info">{fridge + pantry}</div>
        <div className="stat-desc">
          {fridge} Fridge • {pantry} Pantry
        </div>
      </div>
    </div>
  );
}

