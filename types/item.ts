export interface Item {
  id: string;
  name: string;
  expiryDate: string; // ISO date string
  location: "fridge" | "pantry";
  notes?: string;
}

