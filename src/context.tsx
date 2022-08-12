import { createContext } from 'react';
import { UserLoginProps } from './interfaces/app.interface';

const initData:UserLoginProps = {
  name: "",
  username: "",
  password: "",
  logged: false
} 

const AuthContext = createContext({
  authenticated: false,
  authData: initData,
  setAuthenticated: (param: boolean) => {},
  setAuthData: (param: UserLoginProps) => {}
});

export default AuthContext;
