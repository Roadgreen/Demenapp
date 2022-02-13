import axios from 'axios';
import * as React from 'react';
import {useState,useEffect} from 'react'
import {Form, Button,Col,Row,Container } from 'react-bootstrap'
import { Next } from 'react-bootstrap/esm/PageItem';
import { useHistory } from "react-router-dom"
import Box from '@mui/material/Box';
import './AdminEditClient.css'


 



const AdminEditUser =  (props) => {
  let history = useHistory();
  
  const [id,setId] = useState(props.id);
  const [info,setInfo] = useState(false)

  const search = async () => {
    await axios.post('/api/user/userInfo',{
      id, info
    }).then(res => {
      setUsername(res.data.username)
      setNom(res.data.nom)
       setPrenom(res.data.prenom)
       setEmail(res.data.email)
      setTel(res.data.tel) 
      setVille(res.data.adresse.ville)
     setPostalCode(res.data.adresse.postalCode)
       setNumero(res.data.adresse.numero)
     setRue(res.data.adresse.rue) 
    
    })
    
    
   
    }
  
useEffect(() => {
 
    search();
    
  
},[])
  

      const [username, setUsername] = useState('') 
     const [nom, setNom] = useState('')
     const [prenom, setPrenom] = useState('')
     const [email, setEmail] = useState('')
     const [tel, setTel] = useState('') 
     const [ville, setVille] = useState('')
     const [postalCode, setPostalCode] = useState('')
     const [numero, setNumero] = useState('')
     const [rue, setRue] = useState('')       
      
    
  
   
     

     
      


      const onSubmit = async (e)=>{
      e.preventDefault();
        
 await axios.post('/api/user/userInfo',{
   username,nom,prenom,email,tel,ville,postalCode,numero,rue,id
 }).then(res => { 
   console.log(res.data);
   if(res.data === 'updated'){
    window.location.replace("/DashboardAdmin/user");

   // window.location.reload(false);
   }
 })
      };
 
  return (
   <>
    <Container className='edit'>
     <Form className='Form' >
    <Row>
    
 <Col xs={5}>
<h4 className='Response'></h4>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Nom</Form.Label>
    <Form.Control size="sm" type="String" placeholder={nom} name='nom' value={nom} onChange={e => setNom(e.target.value)} />
   
  </Form.Group>
  
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Prénom</Form.Label>
    <Form.Control size="sm" type="String" placeholder={prenom} name='prenom'value={prenom} onChange={e => setPrenom(e.target.value)} />
   
  </Form.Group>
  </Col>
  <Col xs={5}>
   <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email du Client</Form.Label>
    <Form.Control size="sm" type="email" placeholder={email} name='email' value={email} onChange={e => setEmail(e.target.value)} />
   
  </Form.Group>
     <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Téléphone</Form.Label>
    <Form.Control size="sm" type="String" placeholder={tel} name='tel' value={tel} onChange={e => setTel(e.target.value)}  />
   
  </Form.Group>
  
</Col>
</Row>
<Row>
<Col xs={5}>
   <Form.Group className="mb-3" controlId="Ville">
    <Form.Label>Ville</Form.Label>
    <Form.Control size="sm"  type="string" placeholder={ville} name="ville" value={ville} onChange={e => setVille(e.target.value)}  />
  </Form.Group>
   <Form.Group className="mb-3" controlId="Postal">
    <Form.Label>Code postal</Form.Label>
    <Form.Control size="sm"  type="Number" placeholder={postalCode}
    name="postalCode" value={postalCode}  onChange={e => setPostalCode(e.target.value)} />
  </Form.Group>
</Col>
 <Col xs={5}>
    <Form.Group className="mb-3" controlId="rue">
    <Form.Label>Rue</Form.Label>
    <Form.Control size="sm"  type="string" placeholder={rue} name="rue" value={rue} onChange={e => setRue(e.target.value)}  />
  </Form.Group>
  <p className="rueerror"></p>
  <Form.Group className="mb-5" controlId="num">
    <Form.Label>Numéro rue</Form.Label>
    <Form.Control size="sm"  type="Number" placeholder={numero}
    name="numero" value={numero} onChange={e => setNumero(e.target.value)}  />
  </Form.Group>
  </Col>
 </Row>
  <p className="villeerror"></p>


  
 
  <Button className='button' variant='outline-secondary' type="submit" onClick={onSubmit}>
    Editer
  </Button>
 
 </Form>
 
</Container>
</>


       
 
 
 


 
    
  );
}


export default AdminEditUser;