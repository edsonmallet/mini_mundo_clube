import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useResultStore } from "../../store/results";

export const FormRegister: React.FC = () => {
  const [document, setDocument] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");

  const toast = useToast();

  const { setResult } = useResultStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        document,
        email,
        password,
        birthDate,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((data) => setResult(data))
      .catch((error) => {
        error.json().then((jsonError: any) => {
          toast({
            title: "Erro",
            description: jsonError.message,
            status: "error",
          });
        });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap={5}>
        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Documento</FormLabel>
          <Input
            type="text"
            name="document"
            onChange={(e) => setDocument(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>E-mail</FormLabel>
          <Input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Data de Nascimento</FormLabel>
          <Input
            type="date"
            name="birthDate"
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme={"green"}
          disabled={!document || !birthDate || !password || !email || !name}
        >
          Cadastrar
        </Button>
      </Flex>
    </form>
  );
};
