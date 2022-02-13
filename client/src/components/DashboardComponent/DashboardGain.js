import React,{useState,useEffect} from 'react'
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import './DashboardFiches.css'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

function DashboardGain(props){
const userId = props.id;



const [fiche,setFiche] = useState([]); 
const [gain,setGain] = useState(0);
const [gainP,setGainP] = useState(0);



    const onLoad = async ()=>{

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


//Ici les fonctions ne peuvent pas rester comme ça

useEffect(() => {
   
},[]);








 
  //FICHE VALIDE
      const columnsVal = [
        {
            field: 'gain',
            headerName: 'Gain',
       
            width: 140,
          },
          {
            field: 'gainPotentiel',
            headerName: 'Gain Potentiels',
       
            width: 140,
          },
        { field: 'nom', headerName: 'Nom', width: 140 },
        { field: 'prenom', headerName: 'Prenom', width: 140 },
        { field: 'email', headerName: 'email', width: 140 },
        {
          field: 'state',
          headerName: 'Etat',
     
          width: 140,
        },
        
          
       
      ];

      const rowsVal = fiche.map(x => {
       return {id: x._id,gain: x.gain,gainPotentiel: x.gainPotentiel, nom: x.nom, prenom: x.prenom, email: x.email, state: x.state, }
      });

      return(
<>
<Grid sx={{ flexGrow: 1 }} container spacing={2} >
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={3}>
          
            <Grid  item>
            <Paper sx={{ height: 100, width: 200, backgroundColor: '#F5F5F5' }}>
                  <h6 className="title">Gain Potentiel</h6>
                  <h6 className="chiffres">{gainP}€</h6>
                  <p className='paraGain'>Tous vos gains validés</p>
                  </Paper>
            </Grid>
            <Grid  item>
              <Paper sx={{ height: 100, width: 200, backgroundColor: "#c69847" }}>
                  <h6 className='title'>Gain Validés</h6>
                  <h6 className='chiffres'>{gain}€</h6>
                  <p className='paraGain'>Tous vos gains validés</p>
                  </Paper>
            </Grid>
            <Grid  item>
              <Paper sx={{ height: 100, width: 200, backgroundColor: '#F5F5F5'}}>
                  <h6 className='title'>Gain en attente de calcul</h6>
                  <h6 className='chiffres'>{fiche.length} gains</h6>
                  <p className='paraGain'>Vos gains en attentes de validation</p>
                  </Paper>
            </Grid>
      
        </Grid>
      </Grid>
      </Grid>
     

    <h3 className='h3' style={{margin: '20px'}}>Tous les gains: </h3>
    <div style={{ height: 400, width: '100%',marginTop: 20 }}>
      <DataGrid
        rows={rowsVal}
        columns={columnsVal}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>

</>
    )
}

export default DashboardGain;