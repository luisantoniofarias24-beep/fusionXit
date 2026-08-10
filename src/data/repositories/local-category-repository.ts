import type { Category } from "@/domain/category/types";
import type { CategoryRepository } from "./category-repository";
import { MOCK_CATEGORIES } from "@/data/mock/categories";

export class LocalCategoryRepository implements CategoryRepository {
  async getAll(): Promise<Category[]> {
    return Promise.resolve(MOCK_CATEGORIES);
  }

  async getBySlug(slug: string): Promise<Category | null> {
    const category = MOCK_CATEGORIES.find((c) => c.slug === slug);
    return Promise.resolve(category ?? null);
  }
}
