import { Router } from 'express';
import { getDb } from '../db/sqlite';
import { summarizeOrders } from '../services/summary.service';
import { getOrders, createOrder } from '../services/orders.service';

const router = Router();

router
    .get('/summary', async (req, res) => {
        const db = await getDb();
        const orders = await db.all('SELECT * FROM orders');
        const summary = summarizeOrders(orders);

        res.json(summary);
    })
    .get('/orders', async (req, res) => {
        try {
            const { product, limit, offset } = req.query;
            const orders = await getOrders({
                product: product as string,
                limit: Number(limit),
                offset: Number(offset),
            });
            res.json(orders);
        } catch (err) {
            console.error(err);
            res.status(500).send('Database error');
        }
    })

    .post('/orders', async (req, res) => {
        const db = await getDb();
        const { product, qty, price } = req.body;

        if (product === undefined || qty === undefined || price === undefined) {
            res.status(400).json({ error: 'Invalid input. Please provide product, qty, and price.' });
        }
        else {
            if (typeof product !== 'string' || typeof qty !== 'number' || typeof price !== 'number' || qty <= 0 || price <= 0) {
                res.status(400).json({ error: 'Invalid input. Please provide valid product, qty, and price.' });
            } else {
                try {
                    const newOrder = await createOrder({ product, qty, price });
                    res.status(201).json(newOrder);
                } catch (err) {
                    console.error(err);
                    res.status(500).send('Database error');
                }
            }
        }


    });

export default router;
