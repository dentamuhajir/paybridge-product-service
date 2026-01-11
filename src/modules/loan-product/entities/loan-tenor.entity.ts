import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LoanProductEntity } from "./loan-product.entity";

@Entity("loan_tenors")
export class LoanTenorEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => LoanProductEntity, (lp) => lp.tenors)
  @JoinColumn({ name: "loan_product_id" })
  loanProduct: LoanProductEntity;

  @Column({name:"tenor_months" ,type:"numeric"}) 
  tenorMonths: number;

  @Column({name:"interest_rate" ,type:"numeric"}) 
  interestRate: number;

  @Column({name:"late_fee_rate" ,type:"numeric"}) 
  lateFeeRate: number;

  @Column()
  status: string;
}
