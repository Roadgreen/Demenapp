import React, {useState, useEffect} from "react";
import {Nav,Navbar,NavDropdown,Container} from 'react-bootstrap'
import axios from "axios";
import { Redirect } from "react-router";
import "./DashboardIndex.css"
import Grid from '@mui/material/Grid';
import HeaderColumnsGrid from "./Columns"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Columns from '../DashboardComponent/Columns'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { createTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import EuroTwoToneIcon from '@mui/icons-material/EuroTwoTone';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';



const DashboardIndex = (props) => {
  const [fiche,setFiche] = useState([]); 
  const [gain,setGain] = useState(0);
  const [gainP,setGainP] = useState(0);
    const userId = props.id;
  const [linkA,setLinkA] = useState('');
  const [linkB,setLinkB] = useState('');

      const onLoad = async ()=>{
await axios.get('/api/user/imgGet').then(res=>{
  console.log(res.data.imgBig);
  if(res.data === "nothing"){

  }else{
    setLinkA(res.data.imgBig);
    setLinkB(res.data.imgSmall);
  }
  console.log(linkA);
}).catch(err=>console.log(err))
  await axios.get('/client/gain',{
    params: {
      userId
    }
  }).then(res => {
let sumGain = 0;
for(var i = 0; i < res.data.ficheGain.length; i++){
  sumGain+= res.data.ficheGain[i].gain;
}
setGain(sumGain);

let sumGainP = 0;
for(var i = 0; i < res.data.ficheGainP.length; i++){
  sumGainP+= res.data.ficheGainP[i].gainPotentiel;
}
setGainP(sumGainP);
  })

        await axios.get('/client/search', {
            params: {
                userId
            }
        }).then(res => {
          
            setFiche(res.data.ficheAll)
            
            
        }).catch(err => {
    
        })
    } 
    
    
    
    //Ici les fonctions ne peuvent pas rester comme ça
    
    useEffect(() => {
        onLoad()
    },[]);

    const columns = [
      { field: 'nom', headerName: 'Nom', width: 140 },
      { field: 'prenom', headerName: 'Prenom', width: 140 },
      { field: 'email', headerName: 'email', width: 140 },
      {
        field: 'state',
        headerName: 'Etat',
   
        width: 140,
      },
        
     
    ];

  
    const rows = fiche.map(x => {
     return {id: x._id, nom: x.nom, prenom: x.prenom, email: x.email, state: x.state, gainPotentiel: x.gainPotentiel}
    });


    return(
  <>
  
 <Grid sx={{ flexGrow: 1 }} container spacing={2} >
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={3}>
          
            <Grid  item>
            <Paper sx={{ height: 100, width: 200,backgroundColor: '#F5F5F5' }}>
            <LibraryBooksIcon className='iconGain'sx={{htmlColor: "white"}}/>
                  <h6 className="title">Fiche Créées</h6>
                  <h6 className="chiffres">{fiche.length}</h6>
                  </Paper>
            </Grid>
            <Grid  item>
              <Paper className='gainPaper' sx={{ height: 100, width: 200 ,backgroundColor: "#c69847" }}>
              <EuroTwoToneIcon className='iconGain' sx={{backgroundColor: '#F5F5F5'}}/>
                  <h6 className='title'>Gain</h6>
                 
                  <h6 className='chiffres'>{gain} €</h6>
                  <p className='paraGain'>Tous vos gains validés</p>
                  </Paper>
            </Grid>
            <Grid  item>
              <Paper sx={{ height: 100, width: 200, backgroundColor:'#F5F5F5' }}>
              <AccessTimeFilledIcon className='iconGain' sx={{backgroundColor: "grey"}}/>
                  <h6 className='title'>Gain Potentiel</h6>
                  <h6 className='chiffres'>{gainP} €</h6>
                  <p className='paraGain'>Tous vos gains en attentes</p>
                  </Paper>
            </Grid>
      
        </Grid>
      </Grid>
      </Grid>
      <div style={{display:'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', margin: '20px'}}> 
        {linkA !== '' ?  <iframe className="BigImg" src={linkA}  width="500px" height="480px"></iframe>: console.log('')}

{linkB !== '' ? <iframe className="SmallImg" src={linkB} width="300" height="300" allow="autoplay"></iframe> : console.log('')}
</div>
     
     <div style={{ height: 300, width: '100%',marginTop: 20 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>

</>
    )
}

export default DashboardIndex;

