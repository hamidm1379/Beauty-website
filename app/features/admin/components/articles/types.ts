/** وضعیت فرم مقاله در پنل ادمین. */
export type ArticleStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

/** نوع داده‌ی یک فیلد فرم مقاله. */
export type ArticleFieldValue =
  | string
  | number
  | File
  | null
  | ArticleStatus;

/** نوع تابع به‌روزرسانی فیلد فرم، مشترک میان همه‌ی زیرکامپوننت‌ها. */
export type UpdateField = (name: string, value: ArticleFieldValue) => void;

/** کل شکل state فرم مقاله. */
export interface ArticleFormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnailFile: File | null;
  thumbnailUrl: string;
  categoryId: string;
  status: ArticleStatus;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

/** داده‌ی اولیه‌ی مقاله در حالت ویرایش. */
export interface ArticleInitialData {
  id: number;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  content?: string | null;
  thumbnail?: string | null;
  categoryId?: number | string | null;
  status?: ArticleStatus | null;
  publishedAt?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
}

/** دسته‌بندی مقاله برای نمایش در dropdown. */
export interface ArticleCategoryOption {
  id: number;
  title: string;
  slug: string;
}
