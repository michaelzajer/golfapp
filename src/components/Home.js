// components/Home.js
import logo from '../golftriplogo.svg';
import "@aws-amplify/ui-react/styles.css";
import {
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";

import { Heading } from '@aws-amplify/ui-react';
export function Home() {
  return (
    <View className='App'>
          <Image src={logo} className="App-logo" alt="logo" />
    </View>
    
  );
}