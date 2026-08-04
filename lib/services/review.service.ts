import { reviewRepository } from "@/lib/repositories/review.repository";

class ReviewService {
  async getReviews(params: {
    page?: number;
    limit?: number;
    isApproved?: boolean;
  }) {
    return reviewRepository.findMany(params);
  }

  async getReview(id: number) {
    const review = await reviewRepository.findById(id);

    if (!review) {
      throw new Error("نظر پیدا نشد.");
    }

    return review;
  }

  async approveReview(id: number) {
    return reviewRepository.approve(id);
  }

  async rejectReview(id: number) {
    return reviewRepository.reject(id);
  }

  async deleteReview(id: number) {
    return reviewRepository.delete(id);
  }

  async countPending() {
    return reviewRepository.countPending();
  }

  async getApprovedByProduct(productId: number) {
    return reviewRepository.findApprovedByProduct(productId);
  }
}

export const reviewService = new ReviewService();
