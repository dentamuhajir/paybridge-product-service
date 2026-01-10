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

  @Column("numeric")
  minAmount: number;

  @Column("numeric")
  maxAmount: number;

  @Column()
  interestType: string;

  @Column("numeric")
  adminFee: number;

  @Column()
  status: string;

  @OneToMany(() => LoanTenorEntity, (t) => t.loanProduct)
  tenors: LoanTenorEntity[];
}
