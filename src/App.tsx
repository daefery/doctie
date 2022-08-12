import React, { useState } from 'react';
import Router from './router';
import Nav from './components/nav';
import Footer from './components/footer';
import { useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import AuthContext from './context';
import { UserLoginProps } from './interfaces/app.interface';

function App() {
  const [path, setPath] = useState('/')
  let location = useLocation()
  const auth = localStorage.getItem('auth')
  let authInfo: UserLoginProps = auth !== null ? JSON.parse(auth) : {}
  const [authenticated, setAuthenticated] = useState(authInfo.logged ? authInfo.logged : false);
  const [authData, setAuthData] = useState(authInfo);
  const value = {authenticated, authData, setAuthenticated, setAuthData};

  React.useEffect(() =>{
    if(path !== location.pathname){
      setPath(location.pathname)
    }
  }, [location]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider value={value}>
      <div className="App">
        {!path.includes('booking') ? <Nav/> : null}
        <Box minHeight={'55vh'}>
        <Router/>
        </Box>
        {!path.includes('booking') ? <Footer/> : null}
      </div>
    </AuthContext.Provider>
    
  );
}

export default App;
