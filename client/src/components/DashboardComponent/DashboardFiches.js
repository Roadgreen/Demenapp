import React,{useState,useEffect} from 'react'
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import './DashboardFiches.css'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

function DashboardFiches(props){
const userId = props.id;
const [fiche,setFiche] = useState([]);
const [waiting,setWaiting] = useState([]);
const [valide,setValide] = useState([]);

const onLoad = async ()=>{

  

    await axios.get('/client/search', {
        params: {
            userId
        }
    }).then(res => {
       setWaiting(res.data.ficheWait)
       setValide(res.data.ficheVal)
        setFiche(res.data.ficheAll)
        
        
    }).catch(err => {

    })
} 



//Ici les fonctions ne peuvent pas rester comme ça

useEffect(() => {
    onLoad()
},[]);








  //FICHE EN ATTENTES
    const columns = [
        { field: 'nom', headerName: 'Nom', width: 140 },
        { field: 'prenom', headerName: 'Prenom', width: 140 },
        { field: 'email', headerName: 'email', width: 140 },
        {
          field: 'state',
          headerName: 'Etat',
     
          width: 140,
        },
        {
            field: 'gainPotentiel',
            headerName: 'Gain Potentiel',
       
            width: 140,
          },
          
       
      ];

    
      const rows = waiting.map(x => {
       return {id: x._id, nom: x.nom, prenom: x.prenom, email: x.email, state: x.state, gainPotentiel: x.gainPotentiel}
      });

  //FICHE VALIDE
      const columnsVal = [
        { field: 'nom', headerName: 'Nom', width: 140 },
        { field: 'prenom', headerName: 'Prenom', width: 140 },
        { field: 'email', headerName: 'email', width: 140 },
        {
          field: 'state',
          headerName: 'Etat',
     
          width: 140,
        },
        {
            field: 'gain',
            headerName: 'Gain',
       
            width: 140,
          },
          
       
      ];

      const rowsVal = valide.map(x => {
       return {id: x._id, nom: x.nom, prenom: x.prenom, email: x.email, state: x.state, gain: x.gain}
      });

      return(
<>
<Grid sx={{ flexGrow: 1 }} container spacing={2} >
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={3}>
          
            <Grid  item>
            <Paper sx={{ height: 100, width: 200 }}>
                  <h6 className="title">Fiche Créées</h6>
                  <h6 className="title">{fiche.length}</h6>
                  </Paper>
            </Grid>
            <Grid  item>
              <Paper sx={{ height: 100, width: 200 }}>
                  <h6 className='title'>Fiches Validés</h6>
                  <h6 className='title'>{valide.length}</h6>
                  </Paper>
            </Grid>
            <Grid  item>
              <Paper sx={{ height: 100, width: 200 }}>
                  <h6 className='title'>Fiches en Attentes</h6>
                  <h6 className='title'>{waiting.length}</h6>
                  </Paper>
            </Grid>
      
        </Grid>
      </Grid>
      </Grid>
      <h3 className='h3' style={{margin: '20px'}}>Fiche En Attentes</h3>
      <div style={{ height: 400, width: '100%',marginTop: 20 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>

    <h3 className='h3' style={{margin: '20px'}}>Fiche Validés</h3>
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

export default DashboardFiches;