import dataSource from "../data-source";
import { seedLoanProducts } from "./seeders/seed-loan-products";
import { seedLoanTenors } from "./seeders/seed-loan-tenors";
import { seedProducts } from "./seeders/seed-products";

async function runSeed() {
    await dataSource.initialize();

    await seedProducts(dataSource);

    await seedLoanProducts(dataSource)

    await seedLoanTenors(dataSource)

    await dataSource.destroy();
}

runSeed()
    .then(() => {
        console.log("Seeding completed");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Seeding failed", err);
        process.exit(1);
    });
