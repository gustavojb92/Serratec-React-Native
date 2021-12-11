import React, { useState, useContext } from 'react';
import Container from "../Container";
import "react-native-gesture-handler"
import { Button, Text, Input, Collapse, VStack, HStack, IconButton, CloseIcon, Box } from "native-base";
import "react-native-gesture-handler";
import axios from 'axios';
import Title from '../Title';
import AlunoContext from '../../context/AlunoContext';
import { Alert } from 'native-base';

const CadastroAluno = () => {
  const { alunos, setAlunos } = useContext(AlunoContext);
  const [nome, setNome] = useState();
  const [cidade, setCidade] = useState();
  const [idade, setIdade] = useState();
  const [Cadastro, setCadastro] = useState(false);

  const limparCampos = () => {
    setNome("");
    setIdade("");
    setCidade("");
  };

  function Cadastrar() {
    const novoAluno = {
      nome,
      idade,
      cidade,
    }
    axios.post('https://secret-headland-69654.herokuapp.com/alunos',
      novoAluno)
      .then((response) => {
        console.log(novoAluno)
        setAlunos([...alunos, novoAluno])
        limparCampos();
        setCadastro(true)
      }).catch((erro) => { setCadastro(true); });
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
                  Cadatro efetuado com sucesso
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
              O cadastro do aluno foi realizado com sucesso!
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
        placeholder="Cidade"
        w={{
          base: "80%",
          md: "25%",
        }}
        style={{ margin: 20 }}
        onChangeText={setCidade}
        value={cidade}
        keyboardType="default"
        type="text"
      />
      <Input
        mx="3"
        placeholder="Idade"
        w={{
          base: "80%",
          md: "25%",
        }}
        style={{ margin: 20 }}
        onChangeText={setIdade}
        value={idade}
        keyboardType="default"
        type="text"
      />
      <>
        <Button size="lg" onPress={() => Cadastrar()}>Cadastrar</Button>
      </>
    </Container>

  )
}
export default CadastroAluno;