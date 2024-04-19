import { Box, Divider, Drawer, Toolbar } from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import HomeIcon from '@mui/icons-material/Cottage';
import GraphIcon from '@mui/icons-material/AutoGraph';


import ListItemText from '@mui/material/ListItemText';
import React, { CSSProperties, FC } from 'react'
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  drawerWidth: number,
  mobileOpen: boolean,
  handleDrawerToggle: () =>void,
}

// type SidebarProps = {
//   drawerWidth: number,
//   mobileOpen: boolean,
//   handleDrawerToggle: () =>void,
// }

interface menuItem {
  text: string,
  path: string,
  icon: React.ComponentType,
}

const Sidebar = ({drawerWidth, mobileOpen, handleDrawerToggle}:SidebarProps) => {

  const MenuItems: menuItem[] = [
    {text: "Home",path: "/", icon: HomeIcon},
    {text: "Report",path: "/report", icon: GraphIcon},
  ]

  const baseLinkStyle :CSSProperties = {
    textDecoration: "none",
    color: "inherit",
    display: "block"
  }
  const activeLinkStyle:CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.08)"
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {MenuItems.map((item, index) => (
          <NavLink key={item.text} to={item.path} style={({isActive}) => {
            // console.log("選択された",item.text, isActive)
            return {
              ...baseLinkStyle,
              ...(isActive ? activeLinkStyle: {})
            }
          }}>
            <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
          </NavLink>
        ))}
      </List>
      {/* <Divider /> */}
    </div>
  );

  return (
          <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          {/* モバイル用 */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            // onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              // 600px以上の時、非表示
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          {/* PC用 */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
  )
}

export default Sidebar