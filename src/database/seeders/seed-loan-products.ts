import { DataSource } from "typeorm";

export async function seedLoanProducts(dataSource: DataSource) {
    await dataSource.query(`
        INSERT INTO loan_products (
            product_id,
            code,
            name,
            description,
            min_amount,
            max_amount,
            interest_type,
            admin_fee,
            status
        )
        SELECT
            p.id,
            'LOAN_CASH_BASIC',
            'Cash Loan Basic',
            'Unsecured cash loan for general purpose',
            1000000,
            10000000,
            'FLAT',
            50000,
            'ACTIVE'
        FROM products p
        WHERE p.code = 'LOAN'
        ON CONFLICT (code) DO NOTHING;
    `);
}
