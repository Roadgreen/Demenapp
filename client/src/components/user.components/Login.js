import React,{useState} from "react";
import logo from '../../img/logo-demenhouse.png'
import './Login.css';
import {Container, Form, Button} from 'react-bootstrap'
import {Link, Redirect,useHistory} from 'react-router-dom'
import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect,setRedirect] = useState('');
  const [username,setUsername] =useState('');
  const [admin,setAdmin] = useState(false);
  let history = useHistory();
  function isAdmin(){
    history.push('/DashboardAdmin/index');
  }


  
    const onSubmit = async e => {
      e.preventDefault();

      const emailerr = document.querySelector('.emailerror');
      emailerr.innerText = '';
      const passerror = document.querySelector('.passerror');
      passerror.innerText = '';
      
      if(email === ''){
        const emailerr = document.querySelector('.emailerror');
      emailerr.innerText = 'Vous devez renseigner une adresse email';
      emailerr.style.color = 'red';
      } else if(password === ''){
        const passerror = document.querySelector('.passerror');
      passerror.innerText = 'Vous devez indiquer votre mot de passe';
      passerror.style.color = 'red';
      } else {
        await axios.post('/api/user/login', {
          email,password
        }).then(res => {
          if(res.data === 'passError'){
            const passerror = document.querySelector('.passerror');
      passerror.innerText = 'Le mot de passe ne correspond pas';
      passerror.style.color = 'red';
          } else if(res.data === 'emailError'){
            const emailerr = document.querySelector('.emailerror');
            emailerr.innerText = `L'utilisateur n'existe pas, ou l'adresse email n'est pas bonne`;
            emailerr.style.color = 'red';
          }else if(res.data.result.validate === false){
            const emailerr = document.querySelector('.emailerror');
            emailerr.innerText = `Veuillez attendre la validation de votre inscription.`;
            emailerr.style.color = 'red';
          }else {
            console.log(res.data);
            setUsername(res.data.result.username);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username",JSON.stringify(res.data.result));
            if(res.data.result.isAdmin === true){
             isAdmin();
              
            } else {
              setRedirect(true);
            }
            
           
          }
          
        }).catch(err => {
          console.log(err);
        })
      }
    }

return(
   
    
    <Container   className="containerLogin">
        
   
        
   <Form onSubmit={onSubmit}>
       <img src={logo} className="logo" alt="logo"/>
      
         <Form.Group className="mb-3" controlId="email">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="Entrer email" value={email} onChange ={(e) => {setEmail(e.target.value)}} required/>
    </Form.Group>
    <p className="emailerror"></p>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Mot de passe</Form.Label>
    <Form.Control type="password" placeholder="Password"  value={password} onChange ={(e) => {setPassword(e.target.value)}}/>
  </Form.Group>
  <p className="passerror"></p>
  <Link to="/register"><Button variant="outline-dark" className='registerLink'  >
      Pas encore inscrit?
  </Button></Link> <br/>
 
  
 
  <Button variant="primary" type="submit">
    Connection
  </Button>

</Form>
{redirect ? <Redirect to={`/api/user/${username}`}></Redirect> : console.log('')}
 

    </Container>
    
)
}

export default Login;