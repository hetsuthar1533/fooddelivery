import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        const email = localStorage.getItem('userEmail');
        console.log("User Email:", email); // Debugging log
        try {
            const response = await fetch("http://localhost:5000/api/myorderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            
            const data = await response.json();
            console.log("Fetched Data:", data); // Debugging log
            setOrderData(data.order_data); // Adjusted to handle the correct structure
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    {orderData.length > 0 ? orderData.map((order, index) => (
                        order.items && order.items.map((item, itemIndex) => (
                            item.Order_date ? (
                                <div className="col-12 mt-3" key={itemIndex}>
                                    <div className="alert alert-info text-center" role="alert">
                                        <strong>Order Date: </strong>{item.Order_date}
                                    </div>
                                </div>
                            ) : (
                                <div className="col-12 col-md-6 col-lg-4 col-xl-3 mt-3" key={itemIndex}>
                                    <div className="card shadow-sm" style={{ width: "100%", maxHeight: "360px" }}>
                                        {item.img && <img src={item.img} className="card-img-top" alt={item.name} style={{ height: "120px", objectFit: "cover" }} />}
                                        <div className="card-body text-center">
                                            <h5 className="card-title">{item.name}</h5>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="badge bg-secondary">{item.qty}</span>
                                                <span className="badge bg-primary">{item.size}</span>
                                                <span className="badge bg-info text-dark">{item.Order_date}</span>
                                            </div>
                                            <div className="mt-2">
                                                <span className="text-muted">Price: </span><strong>₹{item.price}/-</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))
                    )) : <p className="text-center">No orders found</p>}
                </div>
            </div>
            <Footer />
        </div>
    );
}
