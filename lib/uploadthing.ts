import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  /* -------------------------------------------------------------------------- */
  /*                                Brand Logo                                  */
  /* -------------------------------------------------------------------------- */

  brandLogo: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return {
        url: file.ufsUrl,
      };
    }),

  /* -------------------------------------------------------------------------- */
  /*                              Product Images                                */
  /* -------------------------------------------------------------------------- */

  productImage: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 10,
    },
  })
    .middleware(async () => {
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return {
        url: file.ufsUrl,
      };
    }),

  /* -------------------------------------------------------------------------- */
  /*                              Category Image                                */
  /* -------------------------------------------------------------------------- */

  categoryImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return {
        url: file.ufsUrl,
      };
    }),

  /* -------------------------------------------------------------------------- */
  /*                                  Banner                                    */
  /* -------------------------------------------------------------------------- */

  bannerImage: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return {
        url: file.ufsUrl,
      };
    }),

  /* -------------------------------------------------------------------------- */
  /*                                 User Avatar                                */
  /* -------------------------------------------------------------------------- */

  avatar: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return {
        url: file.ufsUrl,
      };
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;