import {
  Button,
  Divider,
  Flex,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { useResultStore } from "../../store/results";

export const Result: React.FC = () => {
  const { result, setResult } = useResultStore();

  return (
    <Flex direction={"column"} width="50%">
      <Button
        variant={"ghost"}
        colorScheme="green"
        onClick={() => setResult(null)}
      >
        Voltar
      </Button>
      <p>{result?.name}</p>
      <p>{result?.email}</p>
      <p>{result?.document}</p>
      <p>{result?.tokenDiscount}</p>
      <p>TOKEN DESCONTO: {result?.tokenDiscount}</p>
      <Divider my={5} />
      <p>{result?.wallets.version}</p>
      <p>{result?.wallets.textContract}</p>
      <Divider my={5} />
      <UnorderedList>
        {result?.wallets.walletsBeneficts.map((wallet) => (
          <ListItem key={wallet.beneficts.slug} mb={4}>
            <p>{wallet.beneficts.name}</p>
            <p>{wallet.beneficts.description}</p>
            <p>{wallet.realDiscount}%</p>
          </ListItem>
        ))}
      </UnorderedList>
    </Flex>
  );
};
