import React, { useState, useContext } from 'react';
import Container from "../Container";
import "react-native-gesture-handler"
import { Button, Alert, Text, Input, Collapse, VStack, HStack, IconButton, CloseIcon, Box } from "native-base";
import "react-native-gesture-handler";
import axios from 'axios';
import Title from '../Title';
import MateriasContext from '../../context/MateriasContext';

const CadastroMaterias = () => {
    const { materias, setMaterias } = useContext(MateriasContext);
    const [titulo, setTitulos] = useState();
    const [professor_nome, setProfessor_nome] = useState();
    const [Cadastro, setCadastro] = useState(false);

    function Cadastrar() {
        const limparCampos = () => {
            setTitulos("");
            setProfessor_nome("");
        };
        axios.post('https://secret-headland-69654.herokuapp.com/materias',
            {
                titulo,
                professor_nome,
            })
            .then((response) => {
                setMaterias(response.data);
                limparCampos();
                setCadastro(true);
            });
    }

    return (
        <Container>
            <Collapse isOpen={Cadastro}>;
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
                                    Cadatro efetuado com sucesso.
                                </Text>
                            </HStack>
                            <IconButton
                                variant="unstyled"
                                icon={<CloseIcon size="3" color="coolGray.600" />}
                                onPress={() => { setCadastro(false) }}
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
                            O cadastro de materia foi realizado com sucesso!
                        </Box>
                    </VStack>
                </Alert>
            </Collapse>

            <Title>Serratec</Title>
            <Input
                mx="3"
                placeholder="Matéria"
                w={{
                    base: "80%",
                    md: "25%",
                }}
                style={{ marginTop: 20 }}
                onChangeText={setTitulos}
                value={titulo}
                keyboardType="default"
            />
            <Input
                mx="3"
                placeholder="Professor"
                w={{
                    base: "80%",
                    md: "25%",
                }}
                style={{ margin: 20 }}
                onChangeText={setProfessor_nome}
                value={professor_nome}
                keyboardType="default"
                type="text"
            />
            <>
                <Button size="lg" onPress={() => Cadastrar()}>Cadastrar</Button>
            </>
        </Container>

    )
}
export default CadastroMaterias;