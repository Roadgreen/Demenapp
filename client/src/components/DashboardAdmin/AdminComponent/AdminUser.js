import * as React from 'react';
import {useState,useEffect} from 'react'
import {Form, Button,Col,Row } from 'react-bootstrap'
import axios from 'axios'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { height } from '@mui/system';
import Box from '@mui/material/Box';
import AdminEditUser from './AdminEditUser';
import { MapContainer,useMap, TileLayer, Marker, Popup } from 'react-leaflet'
import Geocode from "react-geocode";
 



const AdminUser = (props) => {
const DeleteUser = async (id) => {
  await axios.post('/api/user/delete',{
    id
  }).then(res => {
    console.log(res.data);
    window.location.replace("/DashboardAdmin/user");
  })
}

const ValidateUser = async (id) => {
  await axios.get('/api/user/validate',{
    params: {
      ID: id,
      Val: true
    }
  }).then(res => {
    window.location.replace("/DashboardAdmin/user");

  })
}

const EditUser = async (id) => {
  setId(id);
  setEdit(true);
}

const checkUser = async () =>{
  await axios.get('/api/user/info',{}).then(res => {
    console.log(res.data)
setUserWait(res.data.userWait)
setUserVal(res.data.userVal)
  })
}

useEffect(()=>{ checkUser()},[])
 const [userWait,setUserWait] = useState([]);
 const [userVal,setUserVal] = useState([]);
 const [id,setId]= useState('');
 const [edit, setEdit] = useState(false);

  const  [a,b,c,d,e,f,g,h,i,j] = [{ field: 'nom', headerName: 'Nom', width: 140 },
{ field: 'prenom', headerName: 'Prenom', width: 140 },
{ field: 'type', headerName: 'Type utilisateur', width: 140 },
{ field: 'nameOf', headerName: `Nom de l'entreprise`, width: 140 },
{ field: 'email', headerName: 'email', width: 140 },
{
  field: 'ville',
  headerName: 'Ville',

  width: 140,
}, {
  field: 'rue',
  headerName: 'Rue',

  width: 140,
},

{
  field: 'CPostal',
  headerName: 'CPostal',

  width: 140,
},{ field: 'tel', headerName: 'Tel', width: 140 },{ field: 'rib', headerName: 'RIB/CHEQUE', width: 140 }];

const columnsWait = [
  a,b,c,d,e,f,g,h,i,j,
  {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {DeleteUser(params.id)}}
          />,
         
          <GridActionsCellItem
            icon={<CheckIcon />}
            label="Valider"
            onClick={()=>{ValidateUser(params.id)}}
            showInMenu
          />,
        ],
      },
    ];
    const columnsVal = [
      a,b,c,d,e,f,g,h,i,j,
      {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => {DeleteUser(params.id)}}
              />,
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Editer"
                onClick={()=>{EditUser(params.id)}}
                showInMenu
              />,
              <GridActionsCellItem
                icon={<CheckIcon />}
                label="Valider"
                onClick={()=>{ValidateUser(params.id)}}
                showInMenu
              />,
            ],
          },
        ];

const rows = userWait.map(x => {
  return {id: x._id,type: x.type,nameOf: x.nameOf, nom: x.nom,tel: x.tel, prenom: x.prenom, email: x.email, ville: x.adresse.ville, rue: x.adresse.rue, CPostal: x.adresse.postalCode,rib: x.payment.Rib}
 });
 const rows2 = userVal.map(x => {
  return {id: x._id,type: x.type,nameOf: x.nameOf, nom: x.nom,tel: x.tel, prenom: x.prenom, email: x.email, ville: x.adresse.ville, rue: x.adresse.rue, CPostal: x.adresse.postalCode, rib: x.payment.Rib}
 });

 Geocode.fromAddress("Eiffel Tower").then(
  (response) => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
  },
  (error) => {
    console.error(error);
  }
);

  return (
   <>
   
   <MapContainer style={{height: 250, width: "100%"}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>

  <div style={{ height: 400, width: '100%' }}>
  
  <h1>Utilisateurs en attentes de validation</h1>
 
  <DataGrid
        rows={rows}
        columns={columnsWait}
        pageSize={5}
        rowsPerPageOptions={[5]}
       
      />
      <h1>Utilisateurs Validés</h1>
 <DataGrid
        rows={rows2}
        columns={columnsVal}
        pageSize={5}
        rowsPerPageOptions={[5]}
       
      />
      {edit? <AdminEditUser id={id}/>: console.log() }
  
  </div>


  
  
  </>
  
   
  );
}


export default AdminUser;