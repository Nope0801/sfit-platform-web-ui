export interface PageListQuery {
  page: number;      
  page_size: number; 
}

export interface PageListResp<T = any> {
  total_count: number;
  page: number;
  page_size: number;
  items: T;
}