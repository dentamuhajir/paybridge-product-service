import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLoanTenorsTable1768050554980 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE loan_tenors (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                loan_product_id UUID NOT NULL,

                tenor_months INT NOT NULL,
                interest_rate NUMERIC(5,2) NOT NULL,
                late_fee_rate NUMERIC(5,2) NOT NULL,

                status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                updated_at TIMESTAMP NOT NULL DEFAULT now(),

                CONSTRAINT fk_loan_tenors_loan_product
                    FOREIGN KEY (loan_product_id)
                    REFERENCES loan_products(id)
                    ON DELETE CASCADE,

                CONSTRAINT uq_loan_product_tenor
                    UNIQUE (loan_product_id, tenor_months)
            );
        `);

        await queryRunner.query(`
            CREATE INDEX idx_loan_tenors_loan_product_id
            ON loan_tenors (loan_product_id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE loan_tenors`);
    }
}
