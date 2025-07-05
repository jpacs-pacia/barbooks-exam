import React from 'react';

type AddOrderFormProps = {
  form: {
    product: string;
    qty: number;
    price: number;
  };
  setForm: (form: { product: string; qty: number; price: number }) => void;
  submitOrder: () => void;
};

const AddOrderForm = ({ form, setForm, submitOrder }: AddOrderFormProps) => {
  return (
    <div>
      <h2>Add Order</h2>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '10px' }}>
        <input
          placeholder="Product"
          value={form.product}
          onChange={e => setForm({ ...form, product: e.target.value })}
          style={{ padding: '8px', fontSize: '16px' }}
        />
        <input
          type="number"
          placeholder="Qty"
          value={form.qty}
          onChange={e => setForm({ ...form, qty: +e.target.value })}
          style={{ padding: '8px', fontSize: '16px' }}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={e => setForm({ ...form, price: +e.target.value })}
          style={{ padding: '8px', fontSize: '16px' }}
        />
        <button
          onClick={submitOrder}
          style={{
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddOrderForm;
