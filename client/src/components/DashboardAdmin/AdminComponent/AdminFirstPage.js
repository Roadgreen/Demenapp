import * as React from 'react';
import {useState,useEffect} from 'react'
import {Form, Button,Col,Row } from 'react-bootstrap'
import axios from 'axios'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useHistory } from "react-router-dom"
import Chart from '../Chart'
import '../DashboardAdmin.css'
 



const AdminFirstPage = (props) => {
   const ficheNew = props.ficheNew.length;
   const ficheVal = props.ficheVal.length;
   const ficheWait = props.ficheWait.length;
   const userWait = props.userWait.length;
   const [link,setLink] = useState(); 
   const [linkTwo,setLinkTwo] = useState();
   
const handleSubmit = async ()=>{
    await axios.post('/api/user/postimgAdmin',{
      imgBig: link,
      imgSmall: linkTwo
    }).then().catch(err => {console.log(err)})
}
  return (
   <div>
     <Grid sx={{ flexGrow: 1 }} container spacing={2} >
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={3}>
          
            <Grid  item>
            <Paper sx={{ height: 100, width: 200 }}>
                  <h6 className="title">Nouvelle Fiche</h6>
                  <h6 className="title">{ficheNew}</h6>
                  </Paper>
            </Grid>
            <Grid  item>
              <Paper sx={{ height: 100, width: 200 }}>
                  <h6 className='title'>User à Valider</h6>
                  <h6 className='title'>{userWait}</h6>
                  </Paper>
            </Grid>
            <Grid  item>
              <Paper sx={{ height: 100, width: 200 }}>
                  <h6 className='title'>Fiche en attente</h6>
                  <h6 className='title'>{ficheWait}</h6>
                  </Paper>
            </Grid>
            <Grid  item>
              <Paper sx={{ height: 100, width: 200 }}>
                  <h6 className='title'>Fiches Validés</h6>
                  <h6 className='title'>{ficheVal} </h6>
                  </Paper>
            </Grid>
        </Grid>
        <div className='charts'> <Chart  height={'400px'} width={'400px'}  chartId={'b90c619e-c8b1-4e6c-ba39-63a7ee492c5f'}/></div>
      </Grid>
      </Grid>
      
      <Form style={{margin: '20px'}}>
        <input placeholder='image pc' onChange={e=>{setLink(e.target.value)}}></input>
        <input placeholder='image telephone' onChange={e=>{setLinkTwo(e.target.value)}}></input>
        <Button style={{width: '100px',height: '30px', fontSize: '10px'}} onClick={()=>{handleSubmit()}}>Poster img</Button>
      </Form>
   </div>
  );
}


export default AdminFirstPage;