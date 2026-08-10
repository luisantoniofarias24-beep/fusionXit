import type { Category } from "@/domain/category/types";

export interface CategoryRepository {
  getAll(): Promise<Category[]>;
  getBySlug(slug: string): Promise<Category | null>;
}
