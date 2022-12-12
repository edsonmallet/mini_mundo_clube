import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import React from "react";

interface TabsCustomProps {
  tabs: {
    tabName: string;
    tabPanel: React.ReactNode;
  }[];
}

export const TabsCustom: React.FC<TabsCustomProps> = ({ tabs }) => {
  return (
    <Tabs isLazy>
      <TabList>
        {tabs?.map((tab) => (
          <Tab key={tab.tabName}>{tab.tabName}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabs?.map((tab) => (
          <TabPanel key={Math.random()}>{tab.tabPanel}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
