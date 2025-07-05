type Order = {
  id: string | number;
  product: string;
  qty: number;
  price: number;
};

type Props = {
  orders: Order[];
  offset?: number;
};

const OrderTable = ({ orders, offset = 0 }: Props) => {
  if (!Array.isArray(orders) || orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o, i) => (
          <tr key={o.id}>
            <td>{offset + i + 1}</td>
            <td>{o.product}</td>
            <td>{o.qty}</td>
            <td>{o.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default OrderTable;
