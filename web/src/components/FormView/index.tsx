import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useResultStore } from "../../store/results";

export const FormView: React.FC = () => {
  const [document, setDocument] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");

  const { setResult } = useResultStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(
      `http://localhost:3001/api/v1/users?document=${document}&birthDate=${birthDate}`
    )
      .then((res) => res.json())
      .then((data) => setResult(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap={5}>
        <FormControl>
          <FormLabel>Documento</FormLabel>
          <Input
            type="text"
            name="document"
            onChange={(e) => setDocument(e.target.value)}
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
          disabled={!document || !birthDate}
        >
          Ver Descontos
        </Button>
      </Flex>
    </form>
  );
};
