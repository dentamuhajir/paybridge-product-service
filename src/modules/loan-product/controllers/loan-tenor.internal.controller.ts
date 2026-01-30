import { Controller, Get, Param, ParseUUIDPipe, UseGuards } from "@nestjs/common";
import { LoanTenorService } from "../services/loan-tenor.service";
import { InternalTokenGuard } from "../../../infrastructure/security/internal-token.guard";
import { ApiResponse } from "src/shared/response/api-response";

@Controller("internal/loan-tenors")
@UseGuards(InternalTokenGuard)
export class LoanTenorInternalController {
  constructor(private readonly service: LoanTenorService) {}

  @Get(":id")
  async getById(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
  ) {
    const data = await this.service.getTenorDetail(id);
    return ApiResponse.success("Loan tenor found", data);
  }
}
