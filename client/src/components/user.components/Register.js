import React,{useState} from "react";
import './Register.css';
import logo from '../../img/logo-demenhouse.png'
import {Container, Form, Button,Col,Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { fontSize } from "@mui/system";

const Register = () => {
  const [ribInput,setRibInput] = useState(false);
    const [formData, setFormData] = useState({
      username: '',
      nom: '',
      prenom: '',
      email: '',
      password: '',
      password2: '',
      ville:'',
      rue: '',
      numero:'',
      postal:'',
      check:'',
      tel:'',
      Cheque: false,
      Rib:''
    });
    
    
       


    const {username,nom,prenom,email,tel,password,password2,ville,rue,numero,postal,check,Rib,Cheque} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
      e.preventDefault();

      //On remet par default les error vide
      const errmail = document.querySelector('.emailerror');
    errmail.innerText = '';
    const passerr = document.querySelector('.password1error');
    passerr.innerText = '';
    const passerr2 = document.querySelector('.password2error');
    passerr2.innerText = '';
    const vilerr = document.querySelector('.villeerror');
        vilerr.innerText = '';
        const rueerr = document.querySelector('.rueerror');
        rueerr.innerText = '';
        const numerr = document.querySelector('.numerror');
        numerr.innerText = '';
        const postalerr = document.querySelector('.postalerror');
        postalerr.innerText = '';

        //on traite les error du form

      if(email === ''){
        const errmail = document.querySelector('.emailerror');
        errmail.innerText = 'Veuillez rentrer votre email!';
        errmail.style.color = 'red';
      } else if(password === ''){
        const passerr = document.querySelector('.password1error');
        passerr.innerText = 'Veuillez rentrer un mot de passe';
        passerr.style.color = 'red';
      } else if(password2 === ''){
        const passerr2 = document.querySelector('.password2error');
        passerr2.innerText = 'Veuillez retaper votre mot de passe pour vérification';
        passerr2.style.color = 'red';
      } else if(ville === ''){
        const vilerr = document.querySelector('.villeerror');
        vilerr.innerText = 'Veuillez rentrer la ville de votre agence';
        vilerr.style.color = 'red';
      } else if(rue === ''){
        const rueerr = document.querySelector('.rueerror');
        rueerr.innerText = 'Veuillez rentrer un numéro de rue correct';
        rueerr.style.color = 'red';
      } else if(numero === ''){
        const numerr = document.querySelector('.numerror');
        numerr.innerText = 'Veuillez rentrer un numéro correct';
        numerr.style.color = 'red';
      } else if(postal === ''){
        const postalerr = document.querySelector('.postalerror');
        postalerr.innerText = 'Veuillez renseigner le code postal de votre agence';
        postalerr.style.color = 'red';
      }
      else if(password !== password2){
        const passerr2 = document.querySelector('.password2error');
        passerr2.innerText = 'Les mots de passe ne correspondent pas';
        passerr2.style.color = 'red';
      } else if(password.length < 6 ){
        const passerr = document.querySelector('.password1error');
        passerr.innerText = 'Votre mot de passe doit contenir au minimum 6 caractère';
        passerr.style.color = 'red';
      } 
      //on envoi vers le back
      else {
        await axios.post('/api/user/register', {
          formData
        }).then(res => {
          console.log(res.data);
          if(res.data === 'userFinded'){
            const errmail = document.querySelector('.emailerror');
            errmail.innerText = 'Cette email est déjà pris par un autre utilisateur. Veuillez indiquer un autre email.';
            errmail.style.color = 'grey';
          } else{
            window.location.replace("/");
          }
        }).catch(err => {
          console.log(err);
        })
      }
    }

return(
   
    
    <Container className="all">
        
        
        <Form className="form" onSubmit={onSubmit}>

        <img src={logo} className="logo" alt="logo"/>

        <Form.Group className="mb-3" controlId="formBasicUsername">
    <Form.Label>Username</Form.Label>
    <Form.Control size="sm" type="username" placeholder="Entrez votre nom d'utilisateur" name="username" value={username} onChange={e => onChange(e)} required />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label>Nom</Form.Label>
    <Form.Control size="sm" type="name" placeholder="Entrez votre nom " name="nom" value={nom} onChange={e => onChange(e)} required />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicFirstName">
    <Form.Label>Prénom</Form.Label>
    <Form.Control size="sm" type="name" placeholder="Entrez votre nom " name="prenom" value={prenom} onChange={e => onChange(e)} required />
  </Form.Group>


    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control size="sm" type="email" placeholder="Entrez votre email" name="email" value={email} onChange={e => onChange(e)} required />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Telephone</Form.Label>
    <Form.Control size="sm" type="tel" placeholder="Numéro de Téléphone" name="tel" value={tel} onChange={e => onChange(e)} required />
  </Form.Group>
  <p className="emailerror"></p>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Mot de passe</Form.Label>
    <Form.Control size="sm"  type="password" placeholder="Mot de passe" name="password" value={password} onChange={e => onChange(e)} required/>
  </Form.Group>
  <p className="password1error"></p>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Retapez votre mot de passe</Form.Label>
    <Form.Control size="sm"  type="password" placeholder="Retapez votre mot de passe" name="password2" value={password2} onChange={e => onChange(e)} required/>
  </Form.Group>
  <p className="password2error"></p>
  <Row className="g-2">
  <Col md>
  <Form.Group className="mb-3" controlId="Ville">
    <Form.Label>Ville de votre agence</Form.Label>
    <Form.Control size="sm"  type="string" placeholder="Nom de la ville" name="ville" value={ville} onChange={e => onChange(e)} required/>
  </Form.Group>
  <p className="villeerror"></p>
  <Form.Group className="mb-3" controlId="Postal">
    <Form.Label>Code postal de votre agence</Form.Label>
    <Form.Control size="sm"  type="Number" placeholder="Code postal"
    name="postal" value={postal} onChange={e => onChange(e)} required/>
  </Form.Group>
  <p className="postalerror"></p>
  </Col>
  <Col md>
  <Form.Group className="mb-3" controlId="rue">
    <Form.Label>Rue de votre agence</Form.Label>
    <Form.Control size="sm"  type="string" placeholder="Nom de la rue" name="rue" value={rue} onChange={e => onChange(e)} required/>
  </Form.Group>
  <p className="rueerror"></p>
  <Form.Group className="mb-5" controlId="num">
    <Form.Label>Numéro de rue de votre agence</Form.Label>
    <Form.Control size="sm"  type="number" placeholder="Numéro de rue"
    name="numero" value={numero} onChange={e => onChange(e)} required/>
  </Form.Group>
  <p className="numerror"></p>
</Col>

</Row>
<Col md>
  <h5 style={{fontSize: '1.2em'}}>Choisissez votre moyen de rémunération :</h5>
<Form.Check
        name='group1'
        type='radio'
        label='Chèque Cadeau'
        id='1'
        value={Cheque}
        onChange={e =>{onChange(e); setRibInput(false)}}
      />
       <Form.Check
        name='group1'
        type='radio'
        label='RIB'
        id='2'
        value={'Rib'}
        onChange={e=>{onChange(e); setRibInput(true)}}
      />
  <p className="numerror"></p>
  {ribInput ?  <h3 style={{fontSize: '12px'}}>Veuillez envoyer votre RIB à l'adresse Mail suivante en précisant votre nom et votre prénom : <br/>demen.app.contact@gmail.com</h3>: console.log('')}
 
<p className="ribError"></p> 
</Col>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="En cliquant ici vous acceptez les conditions général"  value={check} onChange={e => onChange(e)} required/>
  </Form.Group>
  <Button className="button" variant="primary" type="submit">
    S'enregistrer
  </Button>
</Form>
 

    </Container>
    
)
}

export default Register;