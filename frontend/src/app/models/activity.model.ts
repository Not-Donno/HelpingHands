export type ActivityStatus = 'open' | 'full' | 'closed';

export interface Activity {
  id: string;
  title: string;
  ngoId: string;
  ngoName: string;
  category: string;
  description: string;
  location: string;
  date: string;        // ISO date, e.g. 2026-07-25
  startTime: string;    // HH:mm
  endTime: string;      // HH:mm
  totalSlots: number;
  registeredSlots: number;
  registrationCutoffHours: number;
  status: ActivityStatus;
  imageUrl?: string;
}
