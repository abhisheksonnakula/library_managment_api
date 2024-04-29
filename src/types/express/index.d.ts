export interface UserPayload {
    id: string;
    email: string;
    role: 'Member' | 'Librarian';
};


declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
