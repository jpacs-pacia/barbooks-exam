export type Order = {
  id: number;
  product: string;
  qty: number;
  price: number;
};

export type Summary = {
  totalRevenue: number;
  medianOrderPrice: number;
  topProductByQty: string;
  uniqueProductCount: number;
};

export function summarizeOrders(orders: Order[]): Summary {
  const totalRevenue = orders.reduce((sum, o) => sum + o.qty * o.price, 0);

  const orderTotals = orders.map(o => o.qty * o.price).sort((a, b) => a - b);
  const medianOrderPrice =
    orderTotals.length === 0
      ? 0
      : orderTotals.length % 2 === 1
      ? orderTotals[Math.floor(orderTotals.length / 2)]
      : (orderTotals[orderTotals.length / 2 - 1] + orderTotals[orderTotals.length / 2]) / 2;

  const productQtyMap: Record<string, number> = {};
  for (const o of orders) {
    productQtyMap[o.product] = (productQtyMap[o.product] || 0) + o.qty;
  }

  const topProductByQty =
    Object.entries(productQtyMap).sort((a, b) => b[1] - a[1])[0]?.[0] || '';

  const uniqueProductCount = new Set(orders.map(o => o.product)).size;

  return {
    totalRevenue,
    medianOrderPrice,
    topProductByQty,
    uniqueProductCount,
  };
}
