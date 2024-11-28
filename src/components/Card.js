import React, { useEffect, useRef, useState } from 'react';
import { useCartDispatch, useCart } from './contexReducer';

function Card(props) {
  let dispatch = useCartDispatch();
  const priceRef = useRef();
  let data = useCart();
  // console.log(data);
  let option = props.options;
  let priceOption = Object.keys(option);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');

  const handleAddtoCart = async () => {
    // Log data before dispatch
    console.log('Dispatching Add to Cart:', {
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.foodItem.img
    });
    let food = [];
    for (const item of data.items) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: 'UPDATE', id: props.foodItem._id, price: finalPrice, qty: qty })
        // console.log(data);
        alert('UPDATED TO CART')
        return
      }

      else if (food.size !== size) {
        await dispatch({ type: 'ADD', id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
        alert('ADDED TO CART')
        return
      }

      return
    }
    await dispatch({
      type: 'ADD',
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size
    }); // console.log('Updated Cart:', data);
  };

  let finalPrice = qty * parseInt(option[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="col-12 col-md-6 col-lg-3 mb-4">
      <div className="card mt-3" style={{ width: '18rem', maxHeight: '400px' }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="Card image"
          style={{
            height: '200px',
            objectFit: 'cover',
          }}
        />
        <div className="card-body d-flex flex-column" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="d-flex w-100 justify-content-between mb-3">
            <select className="m-2 bg-success text-white rounded" onChange={(e) => setQty(e.target.value)} style={{ width: '45%' }}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select className="m-2 bg-success text-white rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)} style={{ width: '45%' }}>
              {priceOption.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data} - {option[data]} ₹
                  </option>
                );
              })}
            </select>
          </div>
          ₹{finalPrice}/-
          <div className="mt-auto">
            <button className="btn btn-success w-100" onClick={handleAddtoCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
