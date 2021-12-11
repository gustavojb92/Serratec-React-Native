import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UsuariosContext = createContext();

const UsuariosProvider = ({children}) => {
    const [usuarios, setUsuarios] = useState();

    useEffect(() => {
        AsyncStorage.getItem('@usuario').then(login =>{
            const usuarioObj = login ? JSON.parse(login) : undefined;
        setUsuarios(usuarioObj);
        });
    },[])

    return (
       < UsuariosContext.Provider 
            value={{usuarios, setUsuarios}}>
           {children}
        </UsuariosContext.Provider>

    );
};

export {UsuariosProvider}
export default UsuariosContext;