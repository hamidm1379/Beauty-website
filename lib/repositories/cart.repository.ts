import { prisma } from "@/lib/prisma";

class CartRepository {
  async increaseQuantity(
    cartItemId: number,
    userId: number,
    quantity: number = 1,
  ) {
    const item = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        cart: {
          userId,
        },
      },
      select: {
        id: true,
      },
    });

    if (!item) {
      throw new Error("آیتم سبد خرید یافت نشد.");
    }

    return prisma.cartItem.update({
      where: {
        id: item.id,
      },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });
  }

  async decreaseQuantity(cartItemId: number, userId: number) {
    const item = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        cart: {
          userId,
        },
      },
      select: {
        id: true,
        quantity: true,
      },
    });

    if (!item) {
      throw new Error("آیتم سبد خرید یافت نشد.");
    }

    if (item.quantity <= 1) {
      return prisma.cartItem.delete({
        where: {
          id: item.id,
        },
      });
    }

    return prisma.cartItem.update({
      where: {
        id: item.id,
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
  }

  async removeItem(cartItemId: number, userId: number) {
    const item = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        cart: {
          userId,
        },
      },
      select: {
        id: true,
      },
    });

    if (!item) {
      throw new Error("آیتم سبد خرید یافت نشد.");
    }

    return prisma.cartItem.delete({
      where: {
        id: item.id,
      },
    });
  }
  async getCart(userId: number) {
    const cart = await prisma.cart.findUnique({
      where: {
        userId,
      },

      include: {
        items: {
          include: {
            product: {
              include: {
                brand: true,
                images: {
                  orderBy: {
                    sortOrder: "asc",
                  },
                },
              },
            },
            variant: true,
          },

          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!cart) {
      return {
        items: [],
        subtotal: 0,
        discount: 0,
        total: 0,
      };
    }

    const subtotal = cart.items.reduce((sum, item) => {
      return sum + item.unitPrice * item.quantity;
    }, 0);

    const discount = cart.items.reduce((sum, item) => {
      if (!item.product.discountPrice) return sum;

      return (
        sum +
        Math.round((item.product.price * item.product.discountPrice) / 100) *
          item.quantity
      );
    }, 0);

    return {
      items: cart.items,

      subtotal,

      discount,

      total: subtotal - discount,
    };
  }
  async getOrCreateCart(userId: number) {
    let cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
        },
      });
    }

    return cart;
  }

  async findItem(cartId: number, productId: number, variantId?: number | null) {
    return prisma.cartItem.findFirst({
      where: {
        cartId,
        productId,
        variantId: variantId ?? null,
      },
    });
  }

  async createItem(
    cartId: number,
    productId: number,
    price: number,
    quantity: number = 1,
    variantId?: number | null,
  ) {
    return prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
        unitPrice: price,
        variantId: variantId ?? null,
      },
    });
  }

  // async getCart(userId: number) {
  //   return prisma.cart.findUnique({
  //     where: {
  //       userId,
  //     },

  //     include: {
  //       items: {
  //         include: {
  //           product: {
  //             include: {
  //               brand: true,
  //               images: true,
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
  // }
  async getCartCount(userId: number) {
    const cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: true,
      },
    });

    if (!cart) {
      return 0;
    }

    return cart.items.length;
  }
}

export const cartRepository = new CartRepository();
