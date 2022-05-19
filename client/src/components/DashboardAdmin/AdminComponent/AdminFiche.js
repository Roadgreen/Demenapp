import * as React from 'react';
import {useState,useEffect} from 'react'
import {Form, Button,Col,Row } from 'react-bootstrap'
import axios from 'axios'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { stepButtonClasses } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import AdminEditClient from './AdminEditClient';

 



const AdminFiche = () => {
  const [ficheWait, setFicheWait] = useState([]);
  const [ficheNew, setFicheNew] = useState([]);
  const [ficheVal, setFicheVal] = useState([]);
  const ficheSearch = async ()=>{
    await axios.get('/client/info',{}).then(
      res=>{setFicheWait(res.data.ficheWait); setFicheNew(res.data.ficheNew);setFicheVal(res.data.ficheVal);}
    )
  }
 


   
   const [button,setButton] = useState('')
   const [edit,setEdit] = useState(false);
   const [edit1,setEdit1] = useState(false);
   const [edit2,setEdit2] = useState(false);
   const [parId,setParId] = useState('');
  
   const DeleteFiche = async (id) => {
      await axios.get('/client/delete', {
        params:{
          ID: id
        }
      }).then(res => {
        setFicheWait(res.data);
        ficheSearch()
      })
   }

   const ValidateFiche = async (id) => {

  }

  const EditFiche = async (id) => {
      setParId(id)
      setEdit(true);
  }
  const EditFiche1 = async (id) => {
    setParId(id)
    setEdit1(true);
}
const EditFiche2 = async (id) => {
      setParId(id)
      setEdit2(true);
  }

 

   useEffect(()=>{
    ficheSearch();
    
    
   },[])
   
  
const  [a,b,c,d,e,f] = [{ field: 'nom', headerName: 'Nom', width: 140 },
{ field: 'prenom', headerName: 'Prenom', width: 140 },
{ field: 'email', headerName: 'email', width: 140 },
{
  field: 'state',
  headerName: 'Etat',

  width: 140,
}, {
  field: 'gainPotentiel',
  headerName: 'Gain Potentiel',

  width: 140,
},

{
  field: 'gain',
  headerName: 'Gain',

  width: 140,
}]

 


  const columns = [
a,b,c,d,e,f,
{
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {DeleteFiche(params.id);}}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Editer"
          onClick={()=>{EditFiche(params.id)}}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<CheckIcon />}
          label="Valider"
          onClick={()=>{ValidateFiche(params.id)}}
          showInMenu
        />,
      ],
    },
  ];
  const columnsWait = [
    a,b,c,d,e,f,
    {
          field: 'actions',
          type: 'actions',
          width: 80,
          getActions: (params) => [
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => {DeleteFiche(params.id)}}
            />,
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Editer"
              onClick={()=>{EditFiche1(params.id)}}
              showInMenu
            />,
            <GridActionsCellItem
              icon={<CheckIcon />}
              label="Valider"
              onClick={()=>{ValidateFiche(params.id)}}
              showInMenu
            />,
          ],
        },
      ];
      const columnsVal = [
        a,b,c,d,e,f,
        {
              field: 'actions',
              type: 'actions',
              width: 80,
              getActions: (params) => [
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={() => {DeleteFiche(params.id)}}
                />,
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Editer"
                  onClick={()=>{EditFiche2(params.id)}}
                  showInMenu
                />,
                <GridActionsCellItem
                  icon={<CheckIcon />}
                  label="Valider"
                  onClick={()=>{ValidateFiche(params.id)}}
                  showInMenu
                />,
              ],
            },
          ];

  const rows = ficheWait.map(x => {
    return {id: x._id, nom: x.nom, prenom: x.prenom, email: x.email, state: x.state, gainPotentiel: x.gainPotentiel,gain: x.gain}
   });

   const rowsNew = ficheNew.map(x => {
    return {id: x._id, nom: x.nom, prenom: x.prenom, email: x.email, state: x.state, gainPotentiel: x.gainPotentiel, gain: x.gain}
   });
   const rowsVal = ficheVal.map(x => {
    return {id: x._id, nom: x.nom, prenom: x.prenom, email: x.email, state: x.state, gainPotentiel: x.gainPotentiel,gain: x.gain}
   });


  return (
   
    <div style={{ height: 400, width: '100%' }}>
      <h1>Nouvelles Fiches</h1>
      <DataGrid
        rows={rowsNew}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
       
      />
      {edit===true? <AdminEditClient id={parId}/> : console.log('consolelogadmincihe')}
      <h1>Fiche En Attente</h1>
      <DataGrid
        rows={rows}
        columns={columnsWait}
        pageSize={5}
        rowsPerPageOptions={[5]}
       
      />
      {edit1===true? <AdminEditClient id={parId}/> : console.log('consolelogadmincihe')}
      <h1>Fiches Validées</h1>
      <DataGrid
        rows={rowsVal}
        columns={columnsVal}
        pageSize={5}
        rowsPerPageOptions={[5]}
       
      />
      {edit2===true? <AdminEditClient id={parId}/> : console.log('consolelogadmincihe')}
    </div>
  );
}


export default AdminFiche;