import { prisma } from "@/lib/prisma";

class WishlistService {
  /**
   * بررسی می‌کنه آیا محصول در علاقه‌مندی‌های کاربر هست یا نه.
   * برای نمایش وضعیت اولیه دکمه (پر/خالی) موقع رندر صفحه استفاده میشه.
   */
  async isInWishlist(userId: number, productId: number) {
    const item = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    return !!item;
  }

  /**
   * toggle: اگه محصول قبلاً در wishlist بوده حذفش می‌کنه، وگرنه اضافه‌ش می‌کنه.
   * خروجی وضعیت نهایی (isFavorite: true/false) رو برمی‌گردونه تا UI بتونه
   * بدون نیاز به یک query اضافه، خودش رو sync کنه.
   */
  async toggle(userId: number, productId: number) {
    const existing = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existing) {
      await prisma.wishlist.delete({
        where: { id: existing.id },
      });

      return { isFavorite: false };
    }

    // محصول باید واقعاً وجود داشته باشه، وگرنه به خطای foreign key می‌خوریم
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });

    if (!product) {
      throw new Error("محصول پیدا نشد.");
    }

    await prisma.wishlist.create({
      data: { userId, productId },
    });

    return { isFavorite: true };
  }

  async getUserWishlist(userId: number) {
    return prisma.wishlist.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            brand: true,
            images: {
              orderBy: { sortOrder: "asc" },
              take: 1,
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async remove(userId: number, productId: number) {
    await prisma.wishlist.deleteMany({
      where: { userId, productId },
    });
  }
}

export const wishlistService = new WishlistService();