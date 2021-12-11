import React, { useState, useContext } from 'react';
import Container from "../Container";
import "react-native-gesture-handler"
import { Button, Input } from "native-base";
import "react-native-gesture-handler";
import axios from 'axios';
import { Alert, IconButton, HStack, Collapse, VStack, CloseIcon, Text, Box} from "native-base"
import Title from '../Title';
import UsuariosContext  from '../../context/index';

const CadastroUsuario = ({navigation}) => {
    const { setUsuarios } = useContext(UsuariosContext);
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [NovoUsuario, setNovoUsuario] = useState(false);


    function Cadastrar() {
        const limparCampos = () => {
            setNome("");
            setEmail("");
            setSenha("");
          };
        axios.post('https://secret-headland-69654.herokuapp.com/usuario',
            {
                nome, email, senha
              })
              .then((response) => {
                setUsuarios(response.data);
                limparCampos();   
                setNovoUsuario(true);            
            });
    }

    const cadastroOk = () =>{
        setNovoUsuario(false);
       navigation.navigate("Login");
    }
    return (
        <Container>
            <Collapse isOpen={NovoUsuario}>;
               <Alert w="100%" status="success">
               <VStack space={2} flexShrink={1} w="100%">
                 <HStack
                   flexShrink={1}
                   space={1}
                   alignItems="center"
                   justifyContent="space-between"
                 >
                   <HStack space={2} flexShrink={1} alignItems="center">
                     <Alert.Icon />
                     <Text
                       fontSize="md"
                       fontWeight="medium"
                       _dark={{
                         color: "coolGray.800",
                       }}
                     >
                       Cadatro efetuado com sucesso
                     </Text>
                   </HStack>
                   <IconButton
                     variant="unstyled"
                     icon={<CloseIcon size="3" color="coolGray.600"/>}
                     onPress={()=>{cadastroOk()}}
                   />
                 </HStack>
                 <Box
                   pl="6"
                   _dark={{
                     _text: {
                       color: "coolGray.600",
                     },
                   }}
                 >
                 O cadastro de usuário foi realizado com sucesso! Feche o dialogo para retornar a tela de login.
                 </Box>
               </VStack>
             </Alert>  
          </Collapse>
            <Title>Serratec</Title>
            <Input
                mx="3"
                placeholder="Nome"
                w={{
                    base: "80%",
                    md: "25%",
                }}
                style={{ marginTop: 20 }}
                onChangeText={setNome}
                value={nome}
                keyboardType="default"
            />
            <Input
                mx="3"
                placeholder="Email"
                w={{
                    base: "80%",
                    md: "25%",
                }}
                style={{ margin: 20 }}
                onChangeText={setEmail}
                value={email}
                keyboardType="default"
                type="text"
            />
            <Input
                mx="3"
                placeholder="Senha"
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
                <Button size="lg" onPress={() => Cadastrar()}>Cadastrar</Button>
            </>
        </Container>
    )
}
export default CadastroUsuario;