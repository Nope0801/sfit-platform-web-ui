export interface HookTemplate<T> {
  isLoading: boolean;
  error: Error | null;
  data: T | null;
}

export interface HookCallback<T> {
  func: (data: T) => Promise<void>;
  isLoading: boolean;
}
