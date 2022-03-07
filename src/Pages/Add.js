import React, { useEffect, useState } from 'react'
import { Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import Api from '../ListProduct/Api/api';
import './Add.css';
export default function Add() {

    const [selectP, SetSelelectP] = useState({});
    const [data, setData] = useState({
        sku: '',
        name: '',
        price: '',
        size: '',
        weight: '',
        height: '',
        width: '',
        length: '',
    })

    const [erros, SetErros] = useState({
        type: '',
        message: ''
    })
    const ProductType = ['TypeSwitcher', 'DVD', 'Box', 'Furniture'];

    const navigate = useNavigate();
    function apii() {    
        
        Api.post('InsertProducts.php',{
            products:data,   
        })
        .then(function (response){
            SetErros({ type: 'success', message: 'success' })
         navigate('/')
            console.log(response);
            
        })
        .catch(function (error){
              SetErros({ type: 'error', message: 'product no registered' })
            console.log(error);
          
        });

    }
    //this is function check all keys press and save in state
    //this is function check too the type selected
    function handle(e) {
      const {name,value} =  e.target;
      switch (selectP) {
        case 'DVD':
            setData({ weight: '', height: '', width: '', length: '' })
            break;
        case 'Box':
            setData({ size: '', height: '', width: '', length: '' })
        case 'Furniture':
            setData({ size: '', weight: '' })
            break;
        case
            'TypeSwitcher':
            setData({ size: '', weight: '', height: '', width: '', length: '' })

            break;
    }
        setData({...data,[name]: value });
         
    }
    //this is function take type_product Selected 
    function SelectPP(e) {
        SetSelelectP(e.target.value);
  

    }
    useEffect(() => {
        SetSelelectP('TypeSwitcher')
    
    
    }, [])
    //this is function validate all fields checking if all fields isn't empty
    // if isn't empty  return api 
    function Validate() {
        
        if (data.sku === '') return SetErros({ type: 'error', message: 'error sku is empty' })
        if (data.name === '') return SetErros({ type: 'error', message: 'error name is empty' })
        if (data.price === '') return SetErros({ type: 'error', message: 'error price is empty' })
        if (selectP === "TypeSwitcher") return SetErros({ type: 'error', message: 'error select TypeSwitcher' })
        if (data.size === '' && selectP === 'DVD') return SetErros({ type: 'error', message: 'error size is empty' })
        if (data.weight === '' && selectP === 'Box') return SetErros({ type: 'error', message: 'error weight is empty' })
        if (data.height === '' && selectP === 'Furniture') return SetErros({ type: 'error', message: 'error height is empty' })
        if (data.width === '' && selectP === 'Furniture') return SetErros({ type: 'error', message: 'error width is empty' })
        if (data.length === '' && selectP === 'Furniture') return SetErros({ type: 'error', message: 'error length is empty' })
       // this is line retun api
       return apii()
 
       
    }
   
       
  
       

    return (
        <>
            <div className="Header">
                <h1>Product Add</h1>
                <div className="half"> <Button onClick={() => Validate()} className="btn" variant='primary' >Save</Button> <Button onClick={() => navigate('/')} className="btn" variant='danger'>Cancel</Button></div>
            </div>
            <div className="content">
                <div className="form">
                    {erros.type === 'error'  && <Alert variant="danger" > {erros.message}</Alert>}
                    {erros.type === 'success' && <Alert variant="success" > {erros.message}</Alert>}
                    {erros.message}
                    <label>
                        SKU:

                    </label>

                    <input type="text" onChange={(e) => handle(e)} name="sku" className="sku" />
                    {erros.message}
                    <label>
                        Name:
                    </label>
                    <input type="text" onChange={(e) => handle(e)} name="name" className="name" />

                    <label>
                        Price ($)
                    </label>
                    <input type="number" onChange={(e) => handle(e)} name="price" className="price" />
                    <label>
                        Type Swicher
                    </label>

                    <select onChange={(e) => SelectPP(e)}>
                        {ProductType.map((p) => {

                            return <option key={p} value={p}>{p}</option>


                        })}
                    </select>

                    {selectP === 'DVD' &&

                        <div className="DVD">
                            <label>
                                Size: (MB)
                            </label>
                            <input type="number" onChange={(e) => handle(e)} name="size" className="size"  />
                        </div>
                    }
                    {selectP === 'Furniture' &&
                        <div className="Furniture">
                            <label>  Height: (CM)</label>
                            <input type="number" onChange={(e) => handle(e)} name="height" className="height"  />
                            <label> Width: (CM)</label>
                            <input type="number" onChange={(e) => handle(e)} name="width" className="width"  />
                            <label>  Length: (CM)</label>
                            <input type="number" onChange={(e) => handle(e)} name="length" className="length"  />
                        </div>
                    }
                    {selectP === 'Box' &&
                        <div className="Weight">
                            <label>
                                Weight: (KG)
                            </label>
                            <input type="number" onChange={(e) => handle(e)} name="weight" className="weight"  />

                        </div>
                    }
                </div>

            </div>
        </>


    )
}
