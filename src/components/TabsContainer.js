import React from "react";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";

import { PermissionsTable } from "./PermissionsTable";
import { QueryWrapper } from "./QueryWrapper";
import { TeamsTable } from "./TeamsTable";
import { UsersTable } from "./UsersTable";

const LABELS = [
  {
    Component: PermissionsTable,
    header: "Project",
    icon: "pi pi-fw pi-folder",
    query:
      "{ permissions { id level project { name } team { name } user { name } } }",
  },
  {
    Component: TeamsTable,
    header: "Team",
    icon: "pi pi-fw pi-users",
    query:
      "{ teams { id name permissions { id level project { name } } users { id name } } }",
  },
  {
    Component: UsersTable,
    header: "User",
    icon: "pi pi-fw pi-user",
    query:
      "{ users { id name permissions { id level project { name } team { name } } } }",
  },
];

const renderPanel = ({ Component, header, query }) => {
  return (
    <TabPanel key={header}>
      <QueryWrapper
        query={query}
        render={(data) => <Component data={data} />}
      />
    </TabPanel>
  );
};

export const TabsContainer = ({ labels }) => {
  return (
    <Tabs>
      <TabList>
        <Tab>Projects</Tab>
        <Tab>Teams</Tab>
        <Tab>Users</Tab>
      </TabList>

      <TabPanels>{labels.map(renderPanel)}</TabPanels>
    </Tabs>
  );
};

TabsContainer.defaultProps = {
  labels: LABELS,
};
