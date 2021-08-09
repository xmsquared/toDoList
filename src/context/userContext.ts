import { createContext, useContext} from "react";
import { userContext } from "../interface";

export const TokenContext = createContext<userContext>(
    {
      token: '',
      setToken: () => {},
  
    }
  );
  
  export const useTokenContext = () => useContext(TokenContext);