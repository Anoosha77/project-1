export interface ApiObject {
  id: string;
  name: string;
  createdAt: string;
  data?: {
    color?: string | null;
    capacity?: string | null;
  };
}
