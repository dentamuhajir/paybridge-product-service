import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { LoanTenorEntity } from "./loan-tenor.entity";

@Entity("loan_products")
export class LoanProductEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: "product_id" })
  product: ProductEntity;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: "min_amount", type: "numeric" })
  minAmount: number;

  @Column({ name: "max_amount", type: "numeric" })
  maxAmount: number;

  @Column({ name: "interest_type" })
  interestType: string;

  @Column({ name: "admin_fee", type: "numeric" })
  adminFee: number;

  @Column()
  status: string;

  @OneToMany(() => LoanTenorEntity, (tenor) => tenor.loanProduct)
  tenors: LoanTenorEntity[];
}
