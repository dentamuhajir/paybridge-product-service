import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { LoanProductEntity } from "./entities/loan-product.entity";
import { LoanTenorEntity } from "./entities/loan-tenor.entity";
import { LoanProductController } from './controllers/loan-product.controller';
import { LoanProductService } from "./services/loan-product.service";
import { LoanProductRepository } from "./repositories/loan-product.repository";
import { LoanTenorInternalController } from "./controllers/loan-tenor.internal.controller";
import { LoanTenorService } from "./services/loan-tenor.service";
import { LoanTenorRepository } from "./repositories/loan-tenor.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      LoanProductEntity,
      LoanTenorEntity,
    ]),
  ],
  controllers: [
    LoanProductController,
    LoanTenorInternalController
  ],
  providers: [
    LoanProductService,
    LoanProductRepository,
    LoanTenorService,
    LoanTenorRepository
  ],
})
export class LoanProductModule {}
