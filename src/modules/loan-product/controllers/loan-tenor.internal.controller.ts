import { Controller, Get, Logger, Param, ParseUUIDPipe, UseGuards } from "@nestjs/common";
import { LoanTenorService } from "../services/loan-tenor.service";
import { InternalTokenGuard } from "../../../infrastructure/security/internal-token.guard";
import { ApiResponse } from "src/shared/response/api-response";

@Controller("internal/loan-tenors")
@UseGuards(InternalTokenGuard)
export class LoanTenorInternalController {
  private readonly logger = new Logger(LoanTenorInternalController.name);
  constructor(private readonly service: LoanTenorService) {}

  @Get(":id")
  async getById(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
  ) {
    this.logger.log(`GET /internal/loan-tenors/${id} called`);
    
    const data = await this.service.getTenorDetail(id);

    this.logger.log(`Loan tenor ${id} found`);
    return ApiResponse.success("Loan tenor found", data);
  }
}
