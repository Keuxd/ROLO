'use client';

import {
  CollectionsOutlined,
  Menu,
  NotificationsOutlined,
  SettingsOutlined,
  ShoppingCartOutlined,
  StoreOutlined,
  SwapHoriz,
} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { ReactNode, useState } from 'react';

interface layoutProps {
  children?: ReactNode;
}

export default function RoloLayout({ children }: layoutProps) {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <AppBar
        position='sticky'
        component='header'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Link href='/'>
          <Box
            component='img'
            src='/logo.svg'
            alt='Rolo Logo'
            sx={{ height: 40, width: 40 }}
          />
        </Link>
        <Toolbar disableGutters>
          <Link href='/cart' passHref>
            <IconButton aria-label='Carrinho' size='large'>
              <ShoppingCartOutlined fontSize='inherit' />
            </IconButton>
          </Link>
          <Link href='/notifications' passHref>
            <IconButton aria-label='Notificações' size='large'>
              <NotificationsOutlined fontSize='inherit' />
            </IconButton>
          </Link>
          <IconButton
            aria-label='Menu'
            size='large'
            onClick={() => setOpenDrawer(true)}
          >
            <Menu fontSize='inherit' />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component='main'>{children}</Box>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(!openDrawer)}
        anchor='right'
        slotProps={{ paper: { sx: { width: '80%', padding: 2 } } }}
      >
        <Link
          href={'/auth'}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Box
            component='div'
            sx={{
              width: '100%',
              height: '11em',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 3.5,
              marginBottom: 3.5,
              borderBottom: '1px solid #D1D4DA',
            }}
          >
            <Avatar
              src={'avatar_placeholder.png'}
              alt='Avatar do Usuário'
              sx={{ width: '2.5em', height: '2.5em' }}
            />
            <Box component='div' sx={{ textAlign: 'center' }}>
              <Typography variant='h3'>Entre ou Cadastre-se</Typography>
              <Typography
                variant='subtitle1'
                color='textDisabled'
                sx={{ fontWeight: 'regular' }}
              >
                E venha fazer um Rolo
              </Typography>
            </Box>
          </Box>
        </Link>
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            alignItems: 'start',
            gap: 2,
          }}
        >
          <IconButton aria-label='Rolos' size='large' sx={{ gap: 2 }}>
            <SwapHoriz fontSize='inherit' />
            <Typography variant='body2'>Visualizar Rolos</Typography>
          </IconButton>
          <IconButton aria-label='Marketplace' size='large' sx={{ gap: 2 }}>
            <StoreOutlined fontSize='inherit' />
            <Typography variant='body2'>Marketplace</Typography>
          </IconButton>
          <IconButton aria-label='Galeria' size='large' sx={{ gap: 2 }}>
            <CollectionsOutlined fontSize='inherit' />
            <Typography variant='body2'>Galeria</Typography>
          </IconButton>
          <IconButton aria-label='Configurações' size='large' sx={{ gap: 2 }}>
            <SettingsOutlined fontSize='inherit' />
            <Typography variant='body2'>Configurações</Typography>
          </IconButton>
        </Toolbar>
      </Drawer>
    </>
  );
}
