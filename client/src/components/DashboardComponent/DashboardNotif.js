import React, {useState,useEffect, Fragment} from 'react'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import './DashbordNotif.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
function DashboardNotif(){
    const userBef = localStorage.getItem('username');
    const user =  JSON.parse(userBef);
    const idAgent = user._id;
const [notif,setNotif] = useState([]);



const getNotif = async ()=> {
  
    await axios.get('/api/user/notif', {
        params: {
            ID: idAgent
        }
    }).then((res)=>{
        setNotif(res.data);
        console.log(res.data);
        console.log(notif)
    })
}

const squeeznotif = async () => {
  await axios.get('/api/user/notifsqueeze',{
    params: {
      ID: idAgent
    }
  }).then((res)=>{
console.log(notif)
  })
}
setTimeout(()=>{
  squeeznotif()
},5000)

useEffect(()=>{
 
    getNotif();
    handleClick();
},[])

const [open, setOpen] = React.useState(false);

const handleClick = () => {
  setOpen(true);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};

 const mapo = notif.map(x=>
    <Alert severity='success' className='ici'>{x.text}</Alert>
)

      return(
<Fragment className='stack'>
    
{mapo}

</Fragment>
    )
}

export default DashboardNotif;

