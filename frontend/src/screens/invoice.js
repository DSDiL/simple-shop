import Reac, { useState, useEffect } from "react";
import { Button, Form, Table } from 'react-bootstrap';
import axios from 'axios';

function Invoice() {

    const current = new Date();
    const today = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;  

    const [id, setID] = useState();
    const [name, setName] = useState();

    const [itemID, setItemID] = useState();
    const [description, setDescription] = useState();
    const [qty, setQty] = useState();
    const [price, setPrice] = useState();
    const [items, setItems] = useState([]);

    useEffect (() => {
        axios.get("http://localhost:5000/api/invoice/id").then((res) => {
            console.log(res.data);
            setID(parseInt(res.data.id)+1);
        }).catch((err) => {
            console.log(err);
        })
    })

    const GetItems = (event) => {

        axios.get(`http://localhost:5000/api/products/${itemID}`).then((res) => {
            console.log(res.data)

            if (res.data) {
                setDescription(res.data.name);
                setPrice(res.data.price);
            }
            else {
                setDescription("");
                setPrice("");
            }

        }).catch((err) => {
            console.log(err);
        })
    }

    if (itemID) {
        GetItems();
    }

    const AddInvoiceDetails = (event) => {
        event.preventDefault();

        const data = {
            qty,
            price,
            id,
            itemID
        }

        axios.post("http://localhost:5000/api/details/", data).then((res) => {
            setItems(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const SaveInvoice = (event) => {
        event.preventDefault();

        const data = {
            id,
            today,
            result,
            name
        }

        axios.post("http://localhost:5000/api/invoice/", data).then((res) => {
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        })
    }

    const DeleteInvoiceDetails = (event) => {
        event.preventDefault();

        axios.delete(`http://localhost:5000/api/details/${id}`).then((res) => {
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        })
    }

    const result = items.reduce((total, currentValue) => total = total + parseInt(currentValue.amount),0);

    return (
        <div className='container-sm'>
            <Form onSubmit={(event) => SaveInvoice(event)}>
                <Form.Group className="col-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="date"
                        value={today}
                        disabled />
                </Form.Group>
                <Form.Group className="col-3">
                    <Form.Label>Invoice ID</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="id"
                        value={id}
                        disabled />
                </Form.Group>
                <Form.Group className="col-3">
                    <Form.Label>Customer</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="customer"
                        onChange = {(event) => setName(event.target.value)}
                        required />
                </Form.Group>
                <br></br>
                <Table className="table table-borderless table-hover">
                    <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>Description</th>
                            <th>Qty</th>
                            <th>Price</th>   
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Control
                                    className="input-control"
                                    type="number"
                                    name="itemID"
                                    onChange = {(event) => setItemID(event.target.value)} />
                            </td>
                            <td>
                                <Form.Control
                                    className="input-control"
                                    type="text"
                                    name="description"
                                    value={description}
                                    onChange = {(event) => setDescription(event.target.value)}
                                    disabled />
                            </td>
                            <td>
                                <Form.Control
                                    className="input-control"
                                    type="number"
                                    name="qty"
                                    onChange = {(event) => setQty(event.target.value)} />
                            </td>
                            <td>
                                <Form.Control
                                    className="input-control"
                                    type="number"
                                    name="price"
                                    value={price}
                                    onChange = {(event) => setPrice(event.target.value)}
                                    disabled />
                            </td>
                            <td>
                                <Button type="button" className="btn btn-secondary" onClick={(event) => AddInvoiceDetails(event)}>ADD</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Table className="table table-bordered table-hover" id="table">
                    <thead>
                        <tr>
                            <th id="td1">Item ID</th>
                            <th id="td2">Qty</th>
                            <th id="td3">Amount</th> 
                        </tr>
                    </thead>
                    <tbody>
                    {items.map(item => 
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.qty}</td>
                            <td>{item.amount}</td>
                        </tr>)}
                    </tbody>
                </Table>
                <br></br>
                <Form.Group className="col-3">
                    <Form.Label>Total</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="date"
                        value={result}
                        disabled />
                </Form.Group>
                <br></br>
                
                <Table>
                    <tr>
                        <td>
                            <Form.Group>
                                <Button type="submit" id="button" className="btn btn-success btn-lg">Process</Button>
                            </Form.Group>
                        </td>
                        <td>
                            <Form.Group>
                                <Button type="button" id="button" className="btn btn-warning btn-lg" onClick={(event) => DeleteInvoiceDetails(event)}>Clear</Button>
                            </Form.Group>
                        </td>
                    </tr> 
                </Table>
            </Form>
        </div>
    )
}

export default Invoice;