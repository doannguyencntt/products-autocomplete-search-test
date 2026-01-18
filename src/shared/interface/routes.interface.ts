import type { PAGES } from "../constants";
import type { KeysOfPages } from "../types/routes.type";

export interface RouteInfo {
  key: string;
  path: (typeof PAGES)[KeysOfPages];
  component: string;
  // Chỗ này có thể config thêm permission, roles, ...
}