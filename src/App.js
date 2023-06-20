import { Authenticator } from '@aws-amplify/ui-react';

import { Protected } from './components/Protected';
import { RequireAuth } from './RequireAuth';
import { Login } from './components/Login';
import { ProtectedSecond } from './components/ProtectSecond';
import { Home } from './components/Home';
import { Layout } from './components/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import React from 'react';
import logo from './golftriplogo.svg';
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
 // Authenticator,
} from "@aws-amplify/ui-react";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <Protected />
              </RequireAuth>
            }
          />
          <Route
            path="/protected2"
            element={
              <RequireAuth>
                <ProtectedSecond />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Authenticator.Provider>
      <MyRoutes />
    </Authenticator.Provider>
  );
}

export default App;





/* Old code

function App() {

  return (
<View className="App">
  <div>
    <NavBar />
        <Routes>
          <Route path='/' element={<h1>Home</h1>} /> 
          <Route path='/logon' element={<AppLogin />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
  </div>
    <Card>
        <Image src={logo} className="App-logo" alt="logo" />
        <Heading level={1}>Golf App</Heading>
    </Card>
</View>
  );

      }
export default App;

*/
  