import { Controller, Get } from "@nestjs/common";
import { LoanProductService } from '../services/loan-product.service';

@Controller("api/v1/loan-products")
export class LoanProductController {
  constructor(
    private readonly service: LoanProductService,
  ) {}

  @Get()
  async listLoanProducts() {
    return this.service.getLoanCatalog();
  }
}
