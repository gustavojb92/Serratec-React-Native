import React, { useEffect } from 'react';
import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import {
  Box, Pressable, VStack, Text, HStack, Divider, Icon,
} from 'native-base';
import Login from "./pages/Login"
import UsuariosContext from '../context/index';
import Alunos from "./pages/Alunos"
import Materias from "./pages/Materias"
import CadastrarAlunos from "./pages/CadastroAlunos"
import CadastrarMaterias from "./pages/CadastroMaterias"
import CadastrarUsuarios from "./pages/CadastroLogin"
import Home from "./pages/Home"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const getIcon = (screenName) => {
  switch (screenName) {
    case 'Login':
      return 'login';
    case 'Home':
      return 'home';
    case 'Cadastrar Usuario':
      return "addusergroup";
    case 'Alunos':
      return 'user';
    case 'Cadastrar Alunos':
      return 'adduser';
    case 'Materias':
      return 'book';
    case 'Cadastrar Materias':
      return 'addfolder';
    case 'Sair':
      return 'logout';
    default:
      return undefined;
  }
};
function CustomDrawerContent(props) {
  const { setUsuarios } = useContext(UsuariosContext);
  const renderLogout = () => {
    return (
      <Pressable
        px="5"
        py="3"
        rounded="md"
        bg={"transparent"}
        onPress={() => {
          setUsuarios(undefined);
          AsyncStorage.removeItem("@usuario").then(() => {
            props.navigation.navigate("Login");
          });
        }}
      >
        <HStack space="7" alignItems="center">
          <Icon
            color={"#A2A1A6"}
            size="5"
            as={<AntDesign name={getIcon("Sair")} />}
          />
          <Text
            fontWeight="500"
            color={"#A2A1A6"}
          >
            Sair
          </Text>
        </HStack>
      </Pressable>
    );
  };
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Text bold color="#ddd">
            {props.usuarios?.nome}
          </Text>
          <Text fontSize="14" mt="1" color="#ddd" fontWeight="500">
            {props.usuarios?.email}
          </Text>
          <Text fontSize="14" mt="1" color="#ddd" fontWeight="500">
            {props.usuarios?.email}
          </Text>
        </Box>
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routeNames.map((name, index) => (
              <Pressable
                px="5"
                py="3"
                rounded="md"
                bg={
                  index === props.state.index
                    ? 'rgba(6, 182, 212, 0.1)'
                    : 'transparent'
                }
                onPress={(event) => {
                  props.navigation.navigate(name);
                }} key={index}>
                <HStack space="7" alignItems="center">
                  <Icon
                    color={
                      index === props.state.index ? '#10bbff' : '#ddd'
                    }
                    size="5"
                    as={<AntDesign name={getIcon(name)} />}
                  />
                  <Text
                    fontWeight="500"
                    color={
                      index === props.state.index ? '#10bbff' : '#ddd'
                    }>
                    {name}
                  </Text>
                </HStack>
              </Pressable>
            ))}
            {renderLogout()}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}
function MyDrawer({ usuarios }) {
  return (
    <Box safeArea flex={1}>
      <Drawer.Navigator
        drawerContent={(props) => (<CustomDrawerContent usuarios={usuarios} {...props} />)}
        screenOptions={{ headerShown: usuarios ? true : false }}
        initialRouteName={usuarios ? "Home" : "Login"}>
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Cadastrar Usuario" component={CadastrarUsuarios} />
        <Drawer.Screen name="Alunos" component={Alunos} />
        <Drawer.Screen name="Cadastrar Alunos" component={CadastrarAlunos} />
        <Drawer.Screen name="Materias" component={Materias} />
        <Drawer.Screen name="Cadastrar Materias" component={CadastrarMaterias} />
      </Drawer.Navigator>
    </Box>
  );
}

export default function Menu() {
  const { usuarios } = useContext(UsuariosContext);
  return (
    <NavigationContainer>
      <MyDrawer usuarios={usuarios} />
    </NavigationContainer>
  );
}