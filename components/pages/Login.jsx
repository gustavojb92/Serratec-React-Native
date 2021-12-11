import axios from 'axios';
import { Alert, Button, Input, IconButton, HStack, Collapse, VStack, CloseIcon, Box,  Text} from "native-base"
import React, { useState, useContext, useEffect } from 'react';
import "react-native-gesture-handler"
import Container from "../Container";
import Title from '../Title';
import UsuariosContext  from '../../context/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgErro, setmsgErro] = useState();
    const { usuarios, setUsuarios } = useContext(UsuariosContext);
    const URLUSUARIO = "https://secret-headland-69654.herokuapp.com/logar"

    useEffect(()=>{
        if (usuarios) navigation.navigate("Home");
    },[usuarios])

    const efetuarLogin = () => {
        axios.post(URLUSUARIO,{
             email, senha 
            }).then(async (result) => {
                const usuarioEmString = JSON.stringify(result.data);
                AsyncStorage.setItem("@usuario", usuarioEmString);                            
                setUsuarios(result.data);
                navigation.navigate("Home");
            }).catch((erro) => { setmsgErro(true) })
    }
    return (
        <Container>
            <Title>Serratec</Title>
            <Collapse isOpen={msgErro}>
                <Alert w="100%" status={"error"} mt="5">
                    <VStack space={2} flexShrink={1} w="100%">
                        <HStack flexShrink={1} space={2} justifyContent="space-between">
                            <HStack space={2} flexShrink={1}>
                                <Alert.Icon mt="1" />
                                <Text fontSize="md" color="coolGray.800">
                                    {"Usuário ou senha incorretos"}
                                </Text>
                            </HStack>
                            <IconButton
                                variant="unstyled"
                                icon={<CloseIcon size="3" color="coolGray.600" />}
                                onPress={() => { setmsgErro(false) }}
                            />
                        </HStack>
                    </VStack>
                </Alert>
            </Collapse>
            <Input
                mx="3"
                placeholder="Seu e-mail"
                w={{
                    base: "80%",
                    md: "25%",
                }}
                style={{ marginTop: 20 }}
                onChangeText={setEmail}
                value={email}
                keyboardType="default"
            />
            <Input
                mx="3"
                placeholder="Sua senha"
                w={{
                    base: "80%",
                    md: "25%",
                }}
                style={{ margin: 20 }}
                onChangeText={setSenha}
                value={senha}
                keyboardType="default"
                type="password"
            />
            <>
                <Button size="lg" onPress={() => efetuarLogin()}>Login</Button>
            </>
            <Text>É novo por aqui? Faça seu cadstro.</Text>
            <Button size="lg" onPress={()=> navigation.navigate("Cadastrar Usuario")}>Cadastrar</Button>
        </Container>

    )
}
export default Login;