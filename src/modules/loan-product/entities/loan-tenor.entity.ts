import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LoanProductEntity } from "./loan-product.entity";

@Entity("loan_tenors")
export class LoanTenorEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => LoanProductEntity, (lp) => lp.tenors)
  @JoinColumn({ name: "loan_product_id" })
  loanProduct: LoanProductEntity;

  @Column() 
  tenorMonths: number;

  @Column("numeric")
  interestRate: number;

  @Column("numeric")
  lateFeeRate: number;

  @Column()
  status: string;
}
