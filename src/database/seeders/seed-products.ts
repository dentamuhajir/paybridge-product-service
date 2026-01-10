import { DataSource } from "typeorm";

export async function seedProducts(dataSource: DataSource) {
    await dataSource.query(`
        INSERT INTO products (code, name, product_type, status)
        VALUES
            ('LOAN', 'Loan Products', 'LOAN', 'ACTIVE')
        ON CONFLICT (code) DO NOTHING;
    `);
}
