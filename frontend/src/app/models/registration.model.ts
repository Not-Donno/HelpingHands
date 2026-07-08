export type RegistrationStatus = 'confirmed' | 'cancelled';

export interface Registration {
  id: string;
  activityId: string;
  employeeId: string;
  registeredOn: string;       // ISO datetime
  status: RegistrationStatus;
  checkedIn: boolean;
  checkInTime: string | null;
}
