
export interface User {
  id: string;
  email: string;
  role: 'client' | 'admin';
  name: string;
  company?: string;
  phone?: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  location: string;
  notes?: string;
  equipmentCount?: number;
}

export interface Equipment {
  id: string;
  clientId: string;
  name: string;
  type: string;
  serialNumber: string;
  lastTestDate: string;
  nextTestDate: string;
  status: 'pass' | 'fail' | 'pending';
  location: string;
}

export interface Certificate {
  id: string;
  clientId: string;
  appointmentId: string;
  issueDate: string;
  expiryDate: string;
  equipmentTested: number;
  fileUrl: string;
  fileName: string;
}

export interface Invoice {
  id: string;
  clientId: string;
  appointmentId: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  fileUrl: string;
  fileName: string;
}
