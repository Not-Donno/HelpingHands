export interface ActivityParticipationReport {
  activityId: string;
  title: string;
  ngoName: string;
  date: string;
  totalSlots: number;
  registeredSlots: number;
  checkedInCount: number;
  fillRatePercent: number;
}

export interface DashboardSummary {
  totalActivities: number;
  openActivities: number;
  totalRegistrations: number;
  totalCheckedIn: number;
  totalNgos: number;
}
