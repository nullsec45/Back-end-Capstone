import { Injectable } from '@nestjs/common';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import { PrismaService } from '../prisma.service';
import { ConflictCustomException } from '../../customExceptions/ConflictCustomException';

@Injectable()
export class ProductReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductReviewDto: CreateProductReviewDto) {
    const { userId, productId, rating, comment } = createProductReviewDto;

    const isUserAlreadyReview = await this.findByUserId(productId, userId);

    if (isUserAlreadyReview) {
      throw new ConflictCustomException('user already review');
    }

    const createdReview = await this.prisma.review.create({
      data: {
        userId,
        productId,
        rating,
        comment,
      },
    });

    return createdReview;
  }

  async findAll(productId: string) {
    const dataReview = await this.prisma.review.findMany({
      where: {
        productId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
          include: {
            profile: {
              select: {
                profilePicture: true,
              },
            },
          },
        },
      },
    });

    return dataReview;
  }

  async findOne(productId: string, id: string) {
    const dataReview = await this.prisma.review.findUnique({
      where: {
        id,
        productId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (dataReview === null) {
      throw new ConflictCustomException('review not found');
    }

    return dataReview;
  }

  async findByUserId(productId: string, userId: string) {
    const dataReview = await this.prisma.review.findFirst({
      where: {
        AND: [{ productId }, { userId }],
      },
    });

    return dataReview;
  }

  async update(
    productId: string,
    id: string,
    updateProductReviewDto: UpdateProductReviewDto,
  ) {
    if (
      (await this.prisma.review.findUnique({
        where: {
          id,
          productId,
        },
      })) !== null
    ) {
      const { rating, comment } = updateProductReviewDto;

      const updatedReview = await this.prisma.review.update({
        where: {
          id,
          productId,
        },
        data: {
          rating,
          comment,
        },
      });

      return updatedReview;
    } else {
      throw new ConflictCustomException('review not found');
    }
  }

  async remove(productId: string, id: string) {
    if (
      (await this.prisma.review.findUnique({
        where: {
          id,
          productId,
        },
      })) !== null
    ) {
      const deletedReview = await this.prisma.review.delete({
        where: {
          id,
          productId,
        },
      });

      return deletedReview;
    } else {
      throw new ConflictCustomException('review not found');
    }
  }
}
