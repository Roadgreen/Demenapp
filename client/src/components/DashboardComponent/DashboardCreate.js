import * as React from 'react';
import {useState} from 'react'
import {Form, Button,Col,Row } from 'react-bootstrap'
import './DashboardCreate.css'
import axios from 'axios'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
 



function DashboardCreate() {
  const [reponse,setReponse] = useState('');
  const [formData,setFormData] = useState({
    nom:'',
    prenom:'',
    email:'',
    tel:'',
    ville:'',
    postalCode:'',
    rue:'',
    numero: '',
    genre:''
  })

  const {nom,prenom,email,tel,ville,postalCode,rue,numero,genre} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    const userBef = localStorage.getItem('username');
    const user =  JSON.parse(userBef);
    const idAgent = user._id;
    await axios.post('/client/create', {
      formData, idAgent
    }).then(res => {
      if(res.data === 'clientFinded'){
        
       setReponse(`Ce client est déjà dans notre base de donnée. Veuillez nous contacter!`);
      } else if(res.data === 'error'){
      
        setReponse('Une erreur a été constatée. Essayez de rentrer à nouveau les informations');
      } else if(res.data === 'Sucess'){
        setFormData({
          nom:'',
          prenom:'',
          email:'',
          tel:'',
          ville:'',
          postalCode:'',
          rue:'',
          numero: '',
          genre:''
        });
        setReponse('Votre fiche client a été enregistrée avec succès! Nous la traiterons bientôt!')
      }
    })
  }

  return (
   <div className='box'>
     
<Form className='Form' onSubmit={onSubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
  <Col md>
 <h2 style={{fontSize:'19px', margin: '20px'}}>Créez une fiche client et estimez votre gain potentiel: </h2>
 <Form.Check
         name='genre'
         type='radio'
         label='Mr'
         id='1'
         value={'MR'}
         onChange={e =>{onChange(e); console.log(e.target.value)}}
       />
        <Form.Check
         name='genre'
         type='radio'
         label='Mme'
         id='2'
         value={'MME'}
         onChange={e=>{onChange(e); console.log(e.target.value)}}
       />
  
   
 </Col>
    <Form.Label>Nom du Client</Form.Label>
    <Form.Control required size="sm" type="String" placeholder="Nom du Client" name='nom' value={nom} onChange={e => onChange(e)} />
   
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Prénom du Client</Form.Label>
    <Form.Control size="sm" type="String" placeholder="Prenom" name='prenom'value={prenom} onChange={e => onChange(e)} />
   
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email du Client</Form.Label>
    <Form.Control required size="sm" type="email" placeholder="Email" name='email' value={email} onChange={e => onChange(e)} />
   
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Numéro de Téléphone</Form.Label>
    <Form.Control size="sm" type="number" placeholder="Numéro du Client" required name='tel' value={tel} onChange={e => onChange(e)}  />
   
  </Form.Group>
  <Row className="g-2">
  <Col md>
  <Form.Group className="mb-3" controlId="Ville">
    <Form.Label>Ville</Form.Label>
    <Form.Control size="sm"  type="string" placeholder="Nom de la ville" name="ville" value={ville} onChange={e => onChange(e)}  required/>
  </Form.Group>
  <p className="villeerror"></p>
  <Form.Group className="mb-3" controlId="Postal">
    <Form.Label>Code postal</Form.Label>
    <Form.Control size="sm"  type="Number" placeholder="Code postal"
    name="postalCode" value={postalCode}  onChange={e => onChange(e)} required/>
  </Form.Group>
  <p className="postalerror"></p>
  </Col>
  </Row>
  <Row>
  <Col md>
  <Form.Group className="mb-3" controlId="rue">
    <Form.Label>Rue</Form.Label>
    <Form.Control size="sm"  type="string" placeholder="Nom de la rue" name="rue" value={rue} onChange={e => onChange(e)}  required/>
  </Form.Group>
  <p className="rueerror"></p>
  <Form.Group className="mb-5" controlId="num">
    <Form.Label>Numéro de rue</Form.Label>
    <Form.Control size="sm"  type="Number" placeholder="Numéro de rue"
    name="numero" value={numero} onChange={e => onChange(e)}  required/>
  </Form.Group>
  <p className="numerror"></p>
 
  </Col>
</Row>
<div>
{reponse.includes('succès')? <DoneOutlineIcon/> : ''}
<h3 className='Response'>{reponse}</h3>
</div>


 
 
  <Button className='button' variant='outline-secondary' type="submit">
    Submit
  </Button>
</Form>
   </div>
  );
}


export default DashboardCreate;