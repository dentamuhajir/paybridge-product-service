import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class LoanTenorRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findById(tenorId: string) {
    return this.dataSource.query(
      `
      SELECT
        lt.id              AS "tenorId",
        lt.tenor_months    AS "tenorMonths",
        lt.interest_rate   AS "interestRate",
        lt.late_fee_rate   AS "lateFeeRate",
        lp.interest_type   AS "interestType",
        lp.admin_fee       AS "adminFee"
      FROM loan_tenors lt
      JOIN loan_products lp ON lp.id = lt.loan_product_id
      WHERE lt.id = $1
        AND lt.status = 'ACTIVE'
        AND lp.status = 'ACTIVE'
      `,
      [tenorId]
    );
  }
}
