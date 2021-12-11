import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Actionsheet, Box, HStack, Icon, Pressable, Spacer, Text, useDisclose, VStack } from 'native-base';
import React, { useEffect, useState, useContext } from "react";
import { SwipeListView } from 'react-native-swipe-list-view';
import AlunoContext from '../../context/AlunoContext';

const Alunos = () => {
  const { alunos, setAlunos } = useContext(AlunoContext);
  const [alunosSelecionado, setAlunosSelecionado] = useState();
  const { isOpen, onOpen, onClose } = useDisclose();
  const URLALUNO ='https://secret-headland-69654.herokuapp.com/alunos';

  useEffect(() => {
    consultarAlunos();
  }, []);

  const consultarAlunos = () =>{
    axios.get(URLALUNO)
      .then((response) => {
        setAlunos(response.data)
      });
  }

  const deletarAluno = () => {
    axios.delete(URLALUNO, {data: alunosSelecionado})
    .then((response) => {
      onClose;
      consultarAlunos();
    });
  };

  const renderItem = ({ item }) => {
    const ClicarAluno = () =>{
      setAlunosSelecionado(item);
      onOpen();
    };

    return (
      <Box>
        <Pressable onPress={ClicarAluno} bg="white">
          <Box
            pl="4"
            pr="5"
            py="2"
          >
            <HStack alignItems="center" space={3}>
              <VStack>
                <Text color="coolGray.800" _dark={{ color: 'warmGray.50' }} bold>
                  {item.nome}
                </Text>
                <Text color="coolGray.600" _dark={{ color: 'warmGray.200' }}>{item.cidade}</Text>
              </VStack>
              <Spacer />
              <Text fontSize="xs" color="coolGray.800" _dark={{ color: 'warmGray.50' }} alignSelf="flex-start">
                {`${item.idade} anos`}
              </Text>
            </HStack>
          </Box>
        </Pressable>
      </Box>
    )
  };

  return (
    <>

      <SwipeListView
        data={alunos}
        renderItem={renderItem}
      />

      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: "gray.300",
              }}
            >
              Opções
            </Text>
          </Box>
          <Actionsheet.Item
            startIcon={
              <Icon
                as={MaterialIcons}
                color="trueGray.400"
                mr="1"
                size="6"
                name="delete"
              />
            }onPress={() => deletarAluno()}
          >
            Deletar
          </Actionsheet.Item>
          <Actionsheet.Item
            startIcon={
              <Icon
                as={MaterialIcons}
                name="edit"
                color="trueGray.400"
                mr="1"
                size="6"
              />
            }
          >
            Editar
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  )
}

export default Alunos;