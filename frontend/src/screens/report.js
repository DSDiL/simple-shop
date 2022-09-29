import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import './style.css';

function Report() {

    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const [items, setItems] = useState([]);

    const SearchRecords = (event) => {
        event.preventDefault();

        console.log(dateFrom);
        console.log(dateTo);

        axios.get(`http://localhost:5000/api/invoice/${dateFrom}/${dateTo}`).then((res) => {
            setItems(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const Print = (event) => {
        event.preventDefault();

        window.print();
    }

    return (
        <div className='container-sm'>
            <Form className='row row g-4 justify-content-center'>
                <Table>
                    <tr>
                        <td>
                            <Form.Group>
                                <Form.Label>Date From</Form.Label>
                                <Form.Control
                                    className='input-control'
                                    type='date'
                                    name='dateFrom'
                                    onChange={(event) => setDateFrom(event.target.value)}
                                    required />
                            </Form.Group>
                        </td>
                        <td>
                            <Form.Group>
                                <Form.Label>Date To</Form.Label>
                                <Form.Control
                                    className='input-control'
                                    type='date'
                                    name='dateTo'
                                    onChange={(event) => setDateTo(event.target.value)}
                                    required />
                            </Form.Group>
                        </td>
                        <td>
                            <Form.Group>
                                  <Button type='button' className='btn btn btn-lg' onClick={(event) => SearchRecords(event)}>Search</Button>  
                            </Form.Group>
                        </td>
                    </tr>
                </Table>
                <Table className="table table-bordered table-hover" id="table">
                    <thead>
                        <tr>
                            <th id="td1">Invoice No</th>
                            <th id="td2">Date</th>
                            <th id="td3">Amount</th>
                            <th id="td3">Customer</th> 
                        </tr>
                    </thead>
                    <tbody>
                    {items.map(item => 
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.date}</td>
                            <td>{item.total}</td>
                            <td>{item.name}</td>
                        </tr>)}
                    </tbody>
                </Table>
                <Form.Group>
                    <Button type="submit" id="button" onClick={(event) => Print(event)} className="btn btn-success btn-lg">Print</Button>
                </Form.Group>            
            </Form>
        </div>
    )
}

export default Report;