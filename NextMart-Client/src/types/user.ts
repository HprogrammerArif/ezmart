export interface IUser {
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  hasShop?: boolean;
  isActive?: boolean;
  role: "user" | "admin";
  iat?: number;
  exp?: number;
}
