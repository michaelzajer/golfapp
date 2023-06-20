import { Authenticator } from '@aws-amplify/ui-react';
import { Protected } from './components/Protected';
import { RequireAuth } from './RequireAuth';
import { Login } from './components/Login';
import { ProtectedSecond } from './components/ProtectSecond';
import { Home } from './components/Home';
import { Layout } from './components/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Timer from './Timer';

import "./App.css";

import React from 'react';

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
/* Timer Code */

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const Timer = ({ deadline = new Date().toString() }) => {
  const parsedDeadline = React.useMemo(() => Date.parse(deadline), [deadline]);
  const [time, setTime] = React.useState(parsedDeadline - Date.now());

  React.useEffect(() => {
    const interval = setInterval(
      () => setTime(parsedDeadline - Date.now()),
      1000
    );

    return () => clearInterval(interval);
  }, [parsedDeadline]);

  return (
    <div className="timer">
      {Object.entries({
        Days: time / DAY,
        Hours: (time / HOUR) % 24,
        Minutes: (time / MINUTE) % 60,
        Seconds: (time / SECOND) % 60
      }).map(([label, value]) => (
        <div key={label} className="col-4">
          <div className="box">
            <p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
            <span className="timer-text">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

function App() {
  return (
    <Authenticator.Provider>
      <MyRoutes />
      <Timer deadline="December, 31, 2023" />
      
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
  