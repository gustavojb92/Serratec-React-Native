import React, { useState, useContext } from 'react';
import Container from "../Container";
import "react-native-gesture-handler"
import { Button, Input } from "native-base";
import "react-native-gesture-handler";
import axios from 'axios';
import Title from '../Title';
import MateriasContext  from '../../context/MateriasContext';

const CadastroMaterias = () => {    
    const { materias, setMaterias } = useContext(MateriasContext);
    const [titulo, setTitulos] = useState();
    const [professor_nome, setProfessor_nome] = useState();
    const [msgErro, setmsgErro] = useState(false);

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
            }).catch((erro) => { setmsgErro(true); });
    }

    return (
        <Container>
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