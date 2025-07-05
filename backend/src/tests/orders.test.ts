import request from 'supertest';
import express from 'express';
import orderRoutes from '../routes/orders.routes';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { createOrderWithDb } from '../services/orders.service';

// Setup an in-memory DB for testing
const createTestApp = async () => {
  const db = await open({ filename: ':memory:', driver: sqlite3.Database });

  await db.exec(`
    CREATE TABLE orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product TEXT NOT NULL,
      qty INTEGER NOT NULL,
      price REAL NOT NULL
    );
  `);

  const app = express();
  app.use(express.json());

  const patchedRoutes = express.Router();

  // Inject test DB into req
  patchedRoutes.use((req, _res, next) => {
    (req as any).db = db;
    next();
  });

  // ✅ Create test-only POST /orders handler using the in-memory DB
  patchedRoutes.post('/orders', async (req, res) => {
    const db = (req as any).db;
    const { product, qty, price } = req.body;
     if (product === undefined || qty === undefined || price === undefined) {
                res.status(400).json({ error: 'Invalid input. Please provide product, qty, and price.' });
            }
            else {
                if (typeof product !== 'string' || typeof qty !== 'number' || typeof price !== 'number' || qty <= 0 || price <= 0) {
                    res.status(400).json({ error: 'Invalid input. Please provide valid product, qty, and price.' });
                } else {
                    try {
                        const newOrder = await createOrderWithDb(db, { product, qty, price });
                        res.status(201).json(newOrder);
                    } catch (err) {
                        console.error(err);
                        res.status(500).send('Database error');
                    }
                }
            }
   
    
  });

  app.use('/api', patchedRoutes);
  return { app, db };
};

// ✅ Integration test using the in-memory DB
describe('POST /api/orders', () => {
  it('should insert a new order and return it', async () => {
    const { app } = await createTestApp();

    const response = await request(app)
      .post('/api/orders')
      .send({ product: 'TestProduct', qty: 2, price: 15 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.product).toBe('TestProduct');
    expect(response.body.qty).toBe(2);
    expect(response.body.price).toBe(15);
  });
});
