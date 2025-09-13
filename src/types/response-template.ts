export interface ResponseTemplate<T> {
  status: string;
  message: string;
  data: T | null;
}