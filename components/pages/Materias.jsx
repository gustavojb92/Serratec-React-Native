import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Actionsheet, Box, HStack, Icon, Pressable, Spacer, Text, useDisclose, VStack } from 'native-base';
import React, { useEffect, useState, useContext } from "react";
import { SwipeListView } from 'react-native-swipe-list-view';
import MateriasContext  from '../../context/MateriasContext';


const Materias = () => {

  const { materias, setMaterias } = useContext(MateriasContext);
  const [materiaSelecionada, setMateriaSelecionada] = useState();
  const { isOpen, onOpen, onClose } = useDisclose();
  const URLMATERIA ="https://secret-headland-69654.herokuapp.com/materias"
  
  const consultarMaterias = () =>{
    axios.get(URLMATERIA)
      .then(response => {
        setMaterias(response.data)
      });
  };
  
  
  useEffect(() => {
    consultarMaterias()
  }, []);

  const deletarMateria = () => {
    axios.delete(URLMATERIA, {data: materiaSelecionada})
    .then((response) => {
      onClose;
      consultarMaterias();
    });
  };
  

  const renderItem = ({ item }) =>{

    const ClicarMateria = () =>{
      setMateriaSelecionada(item);
      onOpen();
    };

   return(
    <Box>
      <Pressable onPress={ClicarMateria} bg="white">
        <Box
          pl="4"
          pr="5"
          py="2"
        >
          <HStack alignItems="center" space={3}>
            <VStack>
              <Text color="coolGray.800" _dark={{ color: 'warmGray.50' }} bold>
                {item.titulo}
              </Text>
              <Text color="coolGray.600" _dark={{ color: 'warmGray.200' }}>{item.professor_nome}</Text>
            </VStack>
            <Spacer />
            
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );
  }
  return (
    <>
      <SwipeListView
        data={materias}
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
            }onPress={() => deletarMateria()}
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

export default Materias;