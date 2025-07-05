import { getDb } from './sqlite';

(async () => {
  const db = await getDb();

  await db.exec(`
    DROP TABLE IF EXISTS orders;
    CREATE TABLE orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product TEXT NOT NULL,
      qty INTEGER NOT NULL,
      price REAL NOT NULL
    );
  `);

  const orders = [
    ['Apple', 2, 10],
    ['Banana', 5, 5],
    ['Orange', 3, 8],
    ['Mango', 1, 15],
    ['Banana', 4, 6],
  ];

  for (const [product, qty, price] of orders) {
    await db.run(
      `INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)`,
      [product, qty, price]
    );
  }

  console.log('Database seeded.');
})();
