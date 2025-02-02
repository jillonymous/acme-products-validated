import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct } from './store';

const ProductUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [numberInStock, setNumberInStock] = useState(0);
  const [error, setError] = useState({});

  useEffect(() => {
    const product = products.find((product) => product.id === id);
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setNumberInStock(product.numberInStock);
    }
  }, [products, id]);

  const update = (e) => {
    e.preventDefault();
    const updated = { id, name, price, numberInStock };
    try {
      dispatch(updateProduct(updated, navigate));
    } catch (err) {
      setError(err.response.data);
    }
  };

  let messages = [];
  if (error.errors) {
    messages = error.errors.map((err) => err.message);
  }

  return (
    <form onSubmit={update}>
      {/* <pre>{JSON.stringify(error, null, 2)}</pre> */}
      <ul>
        {
          messages.map(message => {
            return (
              <li key={message}>
                { message }
              </li>
            )
          })
        }
      </ul>
      <div>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Price</label>
        <input value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label>Number In Stock</label>
        <input
          value={numberInStock}
          onChange={(e) => setNumberInStock(e.target.value)}
        />
      </div>
      <button>Update</button>
    </form>
  );
};

export default ProductUpdate;
