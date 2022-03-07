import React, { useEffect, useState } from 'react'
import api from './Api/api'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button,Card, Col, Container, Row} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../Pages/Add.css';
export default function ListProduct() {
   const [Product,setProducts] = useState([]);

   const deleteId = []
  const navigate = useNavigate();
//this is function fetch all products in api for show on the page 
 function loadApi(){
  api.get('api.php').then(response => response.data)
  .then((data) =>{
    setProducts(data.products);
    navigate('/')
  })

 }

useEffect(() => {
 loadApi();
 },[]);
 
 // this is function checkbox , which checkbox is checked and push and send for api
  function handleCheckbox(e){
    
    if(!deleteId.includes(e.target.value) && e.target.checked){
    deleteId.push(e.target.value)
     

    
        console.log(deleteId)
    }else{
      deleteId.splice(deleteId.indexOf(e.target.value),1)
      console.log(deleteId)
    }
  
  }
  //this function connect on api and delete itens selected in checkbox
  function handleDelete(id){
    if(id==='') return

      id.map((i) => {
     api.delete(`DeleteData.php?id=${i}`)
      setProducts(Product.filter(p => p.i !== id))
      return loadApi() + navigate('/')
   
     
      })
   

  };

  return (


    
    <div>
  <>
            <div className="Header">
                <h1>Product Add</h1>
                <div className="half"><Button onClick={() => navigate('/add')} variant='primary' >Add</Button>{Product && <Button id='delete-product-btn' onClick={() => handleDelete(deleteId)} variant="danger">MASS DELETE</Button>}</div>
    </div>
    </>
 
    
      <Container>
      
        <Row>
       
   
      <Col style={{display: 'flex',flexWrap: 'wrap'}} >
      { Product?.map((p) =>{

return(
      <Card key={p.id}  style={{ width:'16rem',marginRight:'2px',marginTop:'10px'}}>
      <input type="checkbox" id="checkbox2" className="delete-checkbox form-check-input" onChange={handleCheckbox} value={p.id} style={{margin:'0'}} />
        <Card.Body>
          <Card.Title>{p.sku}</Card.Title>
          <Card.Subtitle className='mb-1 text-muted'>{p.name}</Card.Subtitle>
          <Card.Subtitle className='mb-1 text-muted'>{p.price} $</Card.Subtitle>
          {p.size &&   <Card.Subtitle className='mb-1 text-muted'>Size: {p.size.concat('MB')}</Card.Subtitle>}
          {p.weight &&     <Card.Subtitle className='mb-1 text-muted'> Weight: {p.weight.concat('KG')}</Card.Subtitle>}
          {p.dimensions &&   <Card.Subtitle className='mb-1 text-muted'> Dimensions: {p.dimensions}  </Card.Subtitle>}
        
        </Card.Body>
      </Card>
      );
   })}
    </Col>
     
        </Row>
      </Container>
    
    </div>
  )
}
