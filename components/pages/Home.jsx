import React from "react";
import { Box, Image, Text } from 'native-base';
import Container from "../Container";
import Title from "../Title";


const Home =() =>{
    return (
        <Container>
        <Title>Serratec</Title>
        <Text>Olá, seja bem-vindo!</Text>
        <Text>Utilize o menu ao lado para navegar pelo nosso app</Text>
       <Image source={require('../../assets/download.png')} alt="serratec logo"/>
    </Container>

    )
};

export default Home;