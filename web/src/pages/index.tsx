import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { FormRegister, FormView, Result, TabsCustom } from "../components";
import { useResultStore } from "../store/results";

export default function Home() {
  const tabs = [
    {
      tabName: "Ver Descontos",
      tabPanel: <FormView />,
    },
    {
      tabName: "Cadastrar",
      tabPanel: <FormRegister />,
    },
  ];

  const { result } = useResultStore();

  return (
    <>
      <Head>
        <title>Mini Mundo Clube</title>
        <meta name="description" content="MiniMundoClube" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        width="full"
        alignItems={"center"}
        justifyContent={"center"}
        direction={"column"}
      >
        <Image src="/logo.png" alt="Logo" width={300} height={300} />
        {!result ? <TabsCustom tabs={tabs} /> : <Result />}
      </Flex>
    </>
  );
}
