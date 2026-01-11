import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoanProductEntity } from "../entities/loan-product.entity";
import { Repository } from "typeorm";

@Injectable()
export class LoanProductRepository {
  constructor(
    @InjectRepository(LoanProductEntity)
    private repo: Repository<LoanProductEntity>,
  ) {}

  findActiveWithTenors() {
    return this.repo.find({
      where: { status: "ACTIVE" },
      relations: ["tenors", "product"],
    });
  }
}
