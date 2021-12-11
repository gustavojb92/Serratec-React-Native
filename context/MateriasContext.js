import React, {createContext, useState} from "react";

const estadoinicial = {
    materias:[],
    setMaterias:()=>{},
};

const MateriasContext = createContext(estadoinicial);

const MateriasProvider = ({children}) => {
    const [materias, setMaterias] = useState(estadoinicial.materias);

    return (
       <MateriasContext.Provider value={{materias, setMaterias}}>
           {children}
        </MateriasContext.Provider>

    );
};

export {MateriasProvider}
export default MateriasContext;