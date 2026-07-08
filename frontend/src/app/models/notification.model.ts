export interface AppNotification {
  id: string;
  title: string;
  message: string;
  /** 'all' or a specific employee id */
  audience: string;
  createdOn: string;
  read: boolean;
}
