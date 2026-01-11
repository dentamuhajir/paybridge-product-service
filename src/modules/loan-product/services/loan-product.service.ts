import { Injectable } from "@nestjs/common";
import { LoanProductRepository } from "../repositories/loan-product.repository";

@Injectable()
export class LoanProductService {
  constructor(
    private readonly loanProductRepo: LoanProductRepository,
  ) {}

  async getLoanCatalog() {
    return this.loanProductRepo.findActiveWithTenors();
  }
}
