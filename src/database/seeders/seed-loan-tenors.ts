import { DataSource } from "typeorm";

export async function seedLoanTenors(dataSource: DataSource) {
    await dataSource.query(`
        INSERT INTO loan_tenors (
            loan_product_id,
            tenor_months,
            interest_rate,
            late_fee_rate,
            status
        )
        SELECT
            lp.id,
            t.tenor_months,
            t.interest_rate,
            t.late_fee_rate,
            'ACTIVE'
        FROM loan_products lp
        JOIN (
            VALUES
                (6,  1.50, 0.10),
                (12, 1.40, 0.10),
                (24, 1.30, 0.10)
        ) AS t(tenor_months, interest_rate, late_fee_rate)
        ON TRUE
        WHERE lp.code = 'LOAN_CASH_BASIC'
        ON CONFLICT (loan_product_id, tenor_months) DO NOTHING;
    `);
}
