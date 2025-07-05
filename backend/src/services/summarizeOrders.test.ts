import { summarizeOrders, Order } from './summary.service';


describe('summarizeOrders()', () => {
  it('should compute summary for typical orders', () => {
    const orders: Order[] = [
      { id: 1, product: 'Apple', qty: 2, price: 10 },    // total: 20
      { id: 2, product: 'Banana', qty: 5, price: 5 },    // total: 25
      { id: 3, product: 'Apple', qty: 3, price: 10 },    // total: 30
    ];

    const result = summarizeOrders(orders);

    expect(result.totalRevenue).toBe(75); // 20 + 25 + 30
    expect(result.medianOrderPrice).toBe(25); // [20, 25, 30] → median = 25
    expect(result.topProductByQty).toBe('Apple'); // 5 Apple vs 5 Banana (tie, but Apple appears first)
    expect(result.uniqueProductCount).toBe(2); // Apple, Banana
  });

  it('should handle empty orders array (edge case)', () => {
    const result = summarizeOrders([]);

    expect(result.totalRevenue).toBe(0);
    expect(result.medianOrderPrice).toBe(0); // You may have adjusted this from NaN to 0
    expect(result.topProductByQty).toBe('');
    expect(result.uniqueProductCount).toBe(0);
  });
});
