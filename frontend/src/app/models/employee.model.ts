export type UserRole = 'employee' | 'admin';

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  password: string;
  role: UserRole;
  avatar?: string;
}

/** Employee shape stored in the session (never carries the password). */
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  department: string;
  role: UserRole;
}
