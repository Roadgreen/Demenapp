import * as React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './DashboardMenu.css'
import DashboardIndex from '../DashboardComponent/DashboardIndex'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EuroIcon from '@mui/icons-material/Euro';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import Badge from '@mui/material/Badge';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import HomeIcon from '@mui/icons-material/Home';
import DashboardCreate from '../DashboardComponent/DashboardCreate'
import DashboardFiches from '../DashboardComponent/DashboardFiches';
import DashboardGain from '../DashboardComponent/DashboardGain'
import DashboardContact from '../DashboardComponent/DashboardContact'
import useMediaQuery from '@mui/material/useMediaQuery';
import DashboardNotif from '../DashboardComponent/DashboardNotif'
import LogoutIcon from '@mui/icons-material/Logout';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
 useHistory,Redirect
} from "react-router-dom";
import App from '../../App';
 

const drawerWidth = 240;

function DashboardMenu(props) {
  const [active,setActive] = useState('index');
  const [notif, setNotif] = useState(0);
  const { window } = props;
  const username = props.name;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const logout = () => {
    
  }

  const userBef = localStorage.getItem('username');
  const user =  JSON.parse(userBef);
  const idAgent = user._id;
  const matches = useMediaQuery('(min-width:600px)');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

const checkNotif = async () => {
 
  await axios.get('/api/user/notif',{
    
      params: {
          ID: idAgent
      }
    
  }).then(res => {
    const array = res.data;
    const mapNotif = array.map(x => {return x});
    setNotif(res.data.length);
  }).catch(err => {
console.log(err);
  })
}

useEffect(() => {
  checkNotif()
},[]);


setInterval(() => {
  checkNotif()
},10000);


  const drawer = (
    <div >
      <Toolbar  />
      <Divider />
      <List>
       
          <ListItem button onClick={() => {setActive('index');{!matches?handleDrawerToggle():console.log()}}}>
         
          <HomeIcon sx={{color:'#0a1529', borderColor:'#0a1929',
        border: '1px solid grey',borderRadius: '5px', margin:'5px'}}/>
         Accueil
            
            <ListItemText  />
          </ListItem>
       
      </List>
      <Divider />
      <List>
       
          <ListItem button onClick={() => {setActive('Create');{!matches?handleDrawerToggle():console.log()}}}>
         
          <FormatListBulletedIcon sx={{color:'#0a1529', borderColor:'#0a1929',
        border: '1px solid grey',borderRadius: '5px', margin:'5px'}}/>
              Créer une fiche
            
            <ListItemText  />
          </ListItem>
       
      </List>
      <Divider />
      <List>
       
          <ListItem button onClick={() => {setActive('Gains');
          {!matches?handleDrawerToggle():console.log()}}}>
         
          <EuroIcon sx={{color:'#0a1529', borderColor:'#0a1929',
        border: '1px solid grey',borderRadius: '5px', margin:'5px'}}/>
              Mes gains
            
            <ListItemText  />
          </ListItem>
       
      </List>
      <Divider />
      <List>
       
          <ListItem button onClick={()=> {setActive('Fiches');
          {!matches?handleDrawerToggle():console.log()}}} >
         
          <AssignmentTwoToneIcon sx={{color:'#0a1529', borderColor:'#0a1929',
        border: '1px solid grey',borderRadius: '5px', margin:'5px'}}/>
              Mes Fiches Clients
            
            <ListItemText  />
          </ListItem>
       
      </List>
      <Divider />
      <List>
       
          <ListItem button onClick={()=> {setActive('Contact');{!matches?handleDrawerToggle():console.log()}}} >
         
          <ContactMailIcon sx={{color:'#0a1529', borderColor:'#0a1929',
        border: '1px solid grey',borderRadius: '5px', margin:'5px'}}/>
              Contact
            
            <ListItemText  />
          </ListItem>
       
      </List>
      <Divider />
      <List>
       
          <ListItem button onClick={()=> setActive('Logout')} >
         
          <LogoutIcon sx={{color:'#0a1529', borderColor:'#0a1929',
        border: '1px solid grey',borderRadius: '5px', margin:'5px'}}/>
              Logout
            
            <ListItemText  />
          </ListItem>
       
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box className='BOXUSER' sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar 
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }, 
        }}
      >
         
        <Toolbar sx={{bgcolor:'#c69847'}} >
         {!matches?   <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className= 'hamButton'
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
          <MenuIcon />
          </IconButton> : console.log()}
        
          <Typography variant="h6" noWrap component="div">
           <p>Bienvenue {username}</p>
          </Typography>
          <div className='icon'>
          <IconButton onClick={()=>{setActive('notif')}} sx={{}} >
          <Badge badgeContent={notif} color="primary" >
  <NotificationsSharpIcon/>
</Badge>
</IconButton>
</div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
    
      
         
       
            {active === 'Create'? <DashboardCreate/>  : console.log()}
            {active === 'index'? <DashboardIndex id={idAgent}/>  : console.log()}
            {active === 'Gains'? <DashboardGain id={idAgent}/>  : console.log()}
            {active === 'Fiches'? <DashboardFiches id={idAgent}/> : console.log()}
            {active === 'notif'? <DashboardNotif id={idAgent}/> : console.log()}
            {active === 'Contact'? <DashboardContact id={idAgent}/> : console.log()}
            {active === 'Logout'? <Redirect to='/'/> : console.log()}
            
            
         
      </Box>
    </Box>
  );
}


export default DashboardMenu;