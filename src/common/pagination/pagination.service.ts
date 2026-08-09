import { Injectable } from '@nestjs/common';

export type SortOrder = 'asc' | 'desc';

export interface PaginationOptions<TWhere = any> {
  page?: number;
  limit?: number;
  where?: TWhere;
  order?: SortOrder;
}

export interface PaginationResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

@Injectable()
export class PaginationService {
    async paginate<T, TWhere = any>({
    page = 1,
    limit = 10,
    where,
    order = 'desc',
    findMany,
    count,
  }: PaginationOptions<TWhere> & {
    findMany: (args: {
      skip: number;
      take: number;
      where?: TWhere;
      orderBy: {
        createdAt: SortOrder;
      };
    }) => Promise<T[]>;

    count: (args: {
      where?: TWhere;
    }) => Promise<number>;
  }): Promise<PaginationResult<T>> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      findMany({
        skip,
        take: limit,
        where,
        orderBy: {
          createdAt: order,
        },
      }),

      count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
}
