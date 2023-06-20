// components/Layout.js
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthenticator, Button, Heading, View } from '@aws-amplify/ui-react';

export function Layout() {
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);
  const navigate = useNavigate();

  function logOut() {
    signOut();
    navigate('/login');
  }
  return (
    <>
      <nav>
        <Button onClick={() => navigate('/')}>Home</Button>
        <Button onClick={() => navigate('/protected')}>
          Coming Soon
        </Button>
        <Button onClick={() => navigate('/protected2')}>
          Coming Soon
        </Button>
        {route !== 'authenticated' ? (
          <Button onClick={() => navigate('/login')}>Login</Button>
        ) : (
          <Button onClick={() => logOut()}>Logout</Button>
        )}
      </nav>
      <Heading className='App' level={1}>Barnbougle Golf Trip 2024</Heading>
      <View >
        <p className='hide-authenticated'>
        {route === 'authenticated' ? 'You are logged in!' : 'Please Login!'}
        </p>
      </View>

      <Outlet />
    </>
  );
}