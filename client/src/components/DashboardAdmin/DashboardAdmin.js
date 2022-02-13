import React,  { useState, useEffect } from 'react'; 
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Redirect} from 'react-router-dom'
import AdminFirstPage from './AdminComponent/AdminFirstPage';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AdminFiche from './AdminComponent/AdminFiche';
import AdminUser from './AdminComponent/AdminUser';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { grey } from '@mui/material/colors';
import Chart from './Chart'
import './DashboardAdmin.css'


const drawerWidth = 240;



const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const  DashboardAdmin = (props) => {
  const [userWait, setUserWait] = useState('');
  const [userVal, setUserVal] = useState('');
  const [ficheVal,setFicheVal] = useState('');
  const [ficheWait ,setFicheWait] = useState('');
  const [ficheNew,setFicheNew] = useState('');
const [isActive,setIsActive] = useState(props.id);


  
  let history = useHistory();
  
  const info = async () => {
      await axios.get('/api/user/info',{}).then(res => {
          setUserWait(res.data.userWait);
          setUserVal(res.data.userVal);
          

      });
      await axios.get('/client/info',{}).then(res => {
          const Fiche = res.data;
          console.log(Fiche.ficheWait.length);
          setFicheNew(Fiche.ficheNew);
          setFicheWait(Fiche.ficheWait);
          setFicheVal(Fiche.ficheVal);


      })
      
  }
useEffect(()=>{
  info();
},[])

const index = () => {
  history.push("/DashboardAdmin/index");
  setIsActive('index');
}
const Client = () =>{
  history.push("/DashboardAdmin/fiche");
  setIsActive('fiche');
}
const user = () =>{
  history.push("/DashboardAdmin/user");
  setIsActive('user');
}
  const local = JSON.parse(localStorage.getItem('username'));
  const [isAdmin,setIsAdmin] = useState(false);
   const admin = () =>{
    if(local.isAdmin === true){
      console.log('isAdmin');
    } else {
      console.log(local);
      setIsAdmin(true);
    }
  }

  useEffect(()=>{
    admin();
  },[]);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
         
         <ListItem button onClick={() => {
           index();
         }}>
           <ChromeReaderModeIcon /> 
           Accueil
           <ListItemText />
         </ListItem>
   
     </List>
    
        <Divider />
        <List>
         
            <ListItem button onClick={() => {
              Client()
            }}>
              <ChromeReaderModeIcon /> 
              Fiche à Traiter
              <ListItemText />
            </ListItem>
      
        </List>
        <Divider />
        <List>
         
         <ListItem button onClick={() => {
          user()
         }}>
           <AccessibilityIcon /> 
           Utilisateurs
           <ListItemText />
         </ListItem>
         <Divider />
     </List>
      </Drawer>
      <Main open={open}>
<DrawerHeader />


     
           {isActive==='index'?<AdminFirstPage userWait={userWait} userVal={userVal} ficheNew={ficheNew} ficheWait={ficheWait} ficheVal={ficheVal}/> : console.log('') }

       
            {isActive ==='fiche'? <AdminFiche ficheNew={ficheNew} ficheWait={ficheWait} ficheVal={ficheVal}/> : console.log('')}
          
       
            {isActive ==='user'?<AdminUser userWait={userWait} userVal={userVal}/>: console.log('')}
       
           

        {isAdmin? <Redirect to='/'/> : console.log('')}
      </Main>
    </Box>
  
  );
}

    export default DashboardAdmin;