// Common types shared across packages

// API Response type
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

// User type
export interface User {
  id: string;
  email?: string;
  name?: string;
  created_at?: string;
}
