import React, { useState } from "react";

import auth from "@react-native-firebase/auth";

import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Alert } from "react-native";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously();
  }

  function handleCreateUserAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert(" usuário criado"))
      .catch((err) => {
        console.log(err.code);
        if (err.code === "auth/email-already-in-use") {
          Alert.alert("email em uso");
        }
        if (err.code === "auth/invalid-email") {
          Alert.alert("email inválido");
        }
        if (err.code === "auth/weak-password") {
          Alert.alert("A senha deve ter ao menos 6 digitos.");
        }
      });
    //https://firebase.google.com/docs/auth/admin/errors?hl=pt-br
  }

  function handleSignInWithEmailAndPassword() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => console.log(user))
      .catch((err) => {
        err.code;
        if (
          err.code === "auth/user-not-found" ||
          err.code === "auth/wrong-password"
        ) {
          Alert.alert("Usuário não encontrado. E-mail e/ou senha inválida! ");
        }

        // https://firebase.google.com/docs/auth/admin/errors?hl=pt-br
      });
  }

  function handleForgotPassword() {
    auth()
      .sendPasswordResetEmail(email)
      .then(() =>
        Alert.alert("Enviamos um link no seu email redifinir sua senha!")
      );
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input placeholder="senha" secureTextEntry onChangeText={setPassword} />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText
          title="Criar minha conta"
          onPress={handleCreateUserAccount}
        />
      </Account>
    </Container>
  );
}
