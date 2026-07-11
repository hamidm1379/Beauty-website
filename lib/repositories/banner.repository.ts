import { prisma } from "@/lib/prisma";
import { BannerPosition, BannerStatus, Prisma } from "@prisma/client";

export class BannerRepository {
  async findHeroBanners() {
  return prisma.banner.findMany({
    where: {
      position: "HOME_HERO",
      status: "ACTIVE",
    },
    orderBy: {
      order: "asc",
    },
  });
}
  async getHeroBanner() {
    return prisma.banner.findFirst({
      where: {
        position: "HOME_HERO",
        status: "ACTIVE",
      },
      orderBy: {
        order: "asc",
      },
    });
  }
  async findAll() {
    return prisma.banner.findMany({
      orderBy: [
        {
          order: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });
  }

  async findById(id: number) {
    return prisma.banner.findUnique({
      where: {
        id,
      },
    });
  }

  async findFiltered(filters: {
    search?: string;
    position?: string;
    status?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;

    const where: Prisma.BannerWhereInput = {};

    // Search
    if (filters.search) {
      where.title = {
        contains: filters.search,
      };
    }

    // Position
    if (filters.position) {
      where.position = filters.position as BannerPosition;
    }

    // Status
    if (filters.status && filters.status !== "ALL") {
      where.status = filters.status as BannerStatus;
    }

    // Sort
    let orderBy: Prisma.BannerOrderByWithRelationInput = {
      order: "asc",
    };

    switch (filters.sort) {
      case "newest":
        orderBy = {
          createdAt: "desc",
        };
        break;

      case "oldest":
        orderBy = {
          createdAt: "asc",
        };
        break;

      case "title":
        orderBy = {
          title: "asc",
        };
        break;

      case "order":
      default:
        orderBy = {
          order: "asc",
        };
        break;
    }

    const total = await prisma.banner.count({
      where,
    });

    const items = await prisma.banner.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getStatistics() {
    const [totalBanners, activeBanners, inactiveBanners] = await Promise.all([
      prisma.banner.count(),

      prisma.banner.count({
        where: {
          status: "ACTIVE",
        },
      }),

      prisma.banner.count({
        where: {
          status: "INACTIVE",
        },
      }),
    ]);

    return {
      totalBanners,
      activeBanners,
      inactiveBanners,
    };
  }

  async create(data: Prisma.BannerCreateInput) {
    return prisma.banner.create({
      data,
    });
  }

  async update(id: number, data: Prisma.BannerUpdateInput) {
    return prisma.banner.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return prisma.banner.delete({
      where: {
        id,
      },
    });
  }

  async count() {
    return prisma.banner.count();
  }
}

export const bannerRepository = new BannerRepository();
