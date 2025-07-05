import { getDb } from '../db/sqlite';

export async function getOrders(filter: {
    product?: string;
    limit?: number;
    offset?: number;
}) {
    const db = await getDb();
    const { product, limit = 10, offset = 0 } = filter;

    // Get total count
    let countQuery = 'SELECT COUNT(*) as count FROM orders';
    const countParams: any[] = [];

    if (product) {
        countQuery += ' WHERE product LIKE ?';
        countParams.push(`%${product}%`);
    }

    const totalResult = await db.get(countQuery, countParams);
    const total = totalResult?.count ?? 0;

    // Get paginated list
    let query = 'SELECT * FROM orders';
    const params: any[] = [];

    if (product) {
        query += ' WHERE product LIKE ?';
        params.push(`%${product}%`);
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const list = await db.all(query, params);

    return { list, total };
}


export async function createOrder(order: {
    product: string;
    qty: number;
    price: number;
}) {
    const db = await getDb();
    const { product, qty, price } = order;

    const result = await db.run(
        'INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)',
        [product, qty, price]
    );

    return db.get('SELECT * FROM orders WHERE id = ?', [result.lastID]);
}

export async function createOrderWithDb(
  db: any,
  order: { product: string; qty: number; price: number }
) {
  const { product, qty, price } = order;

  const result = await db.run(
    'INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)',
    [product, qty, price]
  );

  return db.get('SELECT * FROM orders WHERE id = ?', [result.lastID]);
}
