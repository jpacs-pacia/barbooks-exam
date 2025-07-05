// Hooks
import { useSummary } from './hooks/useSummary';

// Components
import OrderTable from './components/orderTable';
import AddOrderForm from './components/addOrderForm';
// React Cores
import { useEffect, useState } from 'react';


type Order = {
  id: number;
  product: string;
  qty: number;
  price: number;
};

function App() {
  const { data: summary, loading, error, refetch: refetchSummary } = useSummary();
  const [orders, setOrders] = useState<{ list: Order[], total: number }>({ list: [], total: 0 });
  const [form, setForm] = useState({ product: '', qty: 1, price: 1 });
  const [shouldRefresh, setShouldRefresh] = useState(false);

  // For filtering and pagination
  const [productFilter, setProductFilter] = useState('');
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const fetchOrders = (limitFetch: number, offsetFetch: number) => {
    const query = new URLSearchParams({
      product: productFilter,
      limit: limitFetch.toString(),
      offset: offsetFetch.toString(),
    });
    console.log('limit', limit, 'offset', offset, 'query', query.toString());
    fetch(`/api/orders?${query.toString()}`)
      .then(res => res.json())
      .then(setOrders);
  };

  useEffect(() => {
    if (shouldRefresh) {
      fetchOrders(limit, 0);
      refetchSummary();
      setShouldRefresh(false);
    }
  }, [productFilter, shouldRefresh]);

  useEffect(() => {
 
      fetchOrders(limit, 0);
      refetchSummary();
    
  }, []);
  const submitOrder = async () => {
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ product: '', qty: 1, price: 1 }); // Reset form
    fetchOrders(limit, offset);                 // Refresh orders
    refetchSummary();                           // Refresh summary
  };

  return (
    <div>
      <h1>Barbooks Summary</h1>
      {loading ? (
        <p>Loading summary...</p>
      ) : error ? (
        <p>{error}</p>
      ) : summary ? (
        <ul>
          <li>Total Revenue: {summary.totalRevenue}</li>
          <li>Median Order Price: {summary.medianOrderPrice}</li>
          <li>Top Product by Quantity: {summary.topProductByQty}</li>
          <li>Unique Products: {summary.uniqueProductCount}</li>
        </ul>
      ) : null}

      <h2>Recent Orders</h2>

      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          placeholder="Filter by product"
          value={productFilter}
          onChange={e => setProductFilter(e.target.value)}
        />
        <button onClick={() => { setOffset(0); fetchOrders(limit, offset); }}>Search</button>
        <button
          onClick={() => {
            setProductFilter('');
            setOffset(0);
            setShouldRefresh(true);
          }}
        >
          Refresh
        </button>
      </div>
      <OrderTable orders={orders.list} offset={offset} />

      <div style={{ marginTop: '1rem' }}>
        <button
          disabled={offset === 0}
          onClick={() => {
            setOffset(prev => prev - limit);
            fetchOrders(limit, offset - limit); // fetch with updated offset
          }}
        >
          ⬅️ Prev
        </button>
        <span>
          Page: {Math.floor(offset / limit) + 1} / {Math.ceil(orders.total / limit)}
        </span>
        <button
          disabled={offset + limit >= orders.total}
          onClick={() => {
            const newOffset = offset + limit;
            setOffset(newOffset);
            fetchOrders(limit, newOffset);
          }}
        >
          Next ➡️
        </button>

      </div>

      <div>
        <AddOrderForm form={form} setForm={setForm} submitOrder={submitOrder} />
      </div>
    </div>
  );
}

export default App;
