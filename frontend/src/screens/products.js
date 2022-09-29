import Reac, { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

import './style.css';

function Products() {

    const [id, setID] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [qty, setQty] = useState();

    const SaveProduct = (event) => {
        event.preventDefault();

        const data = {
            id,
            name,
            price,
            qty
        }

        axios.post("http://localhost:5000/api/products/", data).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className='container-sm'>
            <Form className="row row g-4 justify-content-center" onSubmit={(event) => SaveProduct(event)}>
                
                <Form.Group className='text-center'>
                    <h2>Products</h2><br/>
                </Form.Group>

                <Form.Group className='col-8'>
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control
                        className='input-control'
                        type='text'
                        name='id'
                        onChange={(event) => setID(event.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className='col-8'>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        className='input-control'
                        type='text'
                        name='name'
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className='col-8'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        className='input-control'
                        type='number'
                        name='price'
                        onChange={(event) => setPrice(event.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className='col-8'>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        className='input-control'
                        type='number'
                        name='qty'
                        onChange={(event) => setQty(event.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group id="button">
                    <Button className='btn btn-success btn-lg' type='submit'>Submit</Button>
                </Form.Group>

            </Form>
        </div>
    )
}

export default Products;