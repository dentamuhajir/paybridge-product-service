import { Injectable, NotFoundException } from "@nestjs/common";
import { LoanTenorRepository } from "../repositories/loan-tenor.repository";


@Injectable()
export class LoanTenorService {
  constructor(private readonly repository: LoanTenorRepository) {}

  async getTenorDetail(tenorId: string) {
    const result = await this.repository.findById(tenorId);

    if (!result || result.length === 0) {
      throw new NotFoundException("Loan tenor not found");
    }

    return result[0];
  }
}
