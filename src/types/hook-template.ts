export interface HookTemplate<T> {
  isLoading: boolean;
  error: Error | null;
  data: T | null;
}
