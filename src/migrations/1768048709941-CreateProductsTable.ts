import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsTable1768048709941 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

            CREATE TABLE products (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                code VARCHAR(50) NOT NULL UNIQUE,
                name VARCHAR(100) NOT NULL,
                product_type VARCHAR(30) NOT NULL,
                status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.query(`DROP TABLE products`);
    }

}
