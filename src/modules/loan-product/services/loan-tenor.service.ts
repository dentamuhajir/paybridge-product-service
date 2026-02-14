import { Injectable, NotFoundException } from "@nestjs/common";
import { LoanTenorRepository } from "../repositories/loan-tenor.repository";
import { logger } from "src/infrastructure/observability/logger";

@Injectable()
export class LoanTenorService {
  constructor(private readonly repository: LoanTenorRepository) {}

  async getTenorDetail(tenorId: string) {
    logger.info({ tenorId }, "get loan tenor detail request received");

    logger
    try {
      const result = await this.repository.findById(tenorId);

      if (!result || result.length === 0) {
        logger.warn({ tenorId }, "loan tenor not found");
        throw new NotFoundException("Loan tenor not found"); 
      }

      logger.info(
        { tenorId },
        "loan tenor detail fetched successfully"
      );

      return result[0];
    } catch (error) {
      logger.error(
        {
          tenorId,
          error: error instanceof Error ? error.message : error,
        },
        "failed to fetch loan tenor detail"
      );

      throw error;
    }
  }
}
