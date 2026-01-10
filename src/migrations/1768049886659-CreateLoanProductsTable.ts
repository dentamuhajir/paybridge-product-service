import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLoanProductsTable1768049886659 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE loan_products (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                product_id UUID NOT NULL,
                code VARCHAR(50) NOT NULL UNIQUE,
                name VARCHAR(100) NOT NULL,
                description TEXT,
                min_amount NUMERIC(14,2) NOT NULL,
                max_amount NUMERIC(14,2) NOT NULL,
                interest_type VARCHAR(20) NOT NULL,
                admin_fee NUMERIC(14,2) NOT NULL,
                status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now(),
                CONSTRAINT fk_loan_products_product
                FOREIGN KEY (product_id)
                REFERENCES products(id)
                ON DELETE RESTRICT
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE loan_products`);
    }

}
