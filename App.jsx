import "react-native-gesture-handler"
import React, { useEffect, useState } from 'react';
import { Image, StatusBar } from 'react-native';
import Title from "./components/Title";
import { NativeBaseProvider, Text } from "native-base";
import Menu from "./components/Menu";
import { UsuariosProvider } from "./context/index"
import { AlunoProvider } from "./context/AlunoContext"
import { MateriasProvider } from "./context/MateriasContext"
import Container from "./components/Container"

export default function App() {

  const [carregando, setCarregando] = useState(true);
  useEffect(() => {
    setTimeout(()=> {
      setCarregando(false);
    }, 1000)
  }, []);

  return (
    <UsuariosProvider>
      <AlunoProvider>
        <MateriasProvider>
          <NativeBaseProvider>
            {!carregando ? <Menu /> : <Container><Title>Loading</Title></Container>}
            <StatusBar backgroundColor='#FFF' />
          </NativeBaseProvider >
        </MateriasProvider >
      </AlunoProvider >
    </UsuariosProvider>
  );
}
