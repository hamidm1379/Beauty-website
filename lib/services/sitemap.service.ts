import { productRepository } from "@/lib/repositories/product.repository";
import { categoryRepository } from "@/lib/repositories/category.repository";
import { brandRepository } from "@/lib/repositories/brand.repository";
import { articleRepository } from "@/lib/repositories/article.repository";

class SitemapService {
  async getProducts() {
    return productRepository.findAll();
  }

  async getCategories() {
    return categoryRepository.findAll();
  }

  async getBrands() {
    return brandRepository.findAll();
  }
  async getArticleRepository() {
    return articleRepository.findAll();
  }

}

export const sitemapService = new SitemapService();
