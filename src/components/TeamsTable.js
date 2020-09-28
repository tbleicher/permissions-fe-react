import React from "react";
import styled from "@emotion/styled";

import { Badge } from "@chakra-ui/core";

import { ExpandableTable } from "./ExpandableTable";

const ShowLess = styled.div`
  color: ${({ theme }) => theme.colors.blue[500]};
  cursor: pointer;
  font-size: 13px;
  font-style: italic;
  font-weight: 500;
  margin-top: 3px;
`;

const ShowMore = styled.span`
  color: ${({ theme }) => theme.colors.blue[500]};
  cursor: pointer;
  font-size: 13px;
  font-style: italic;
  font-weight: 500;
  margin-left: 4px;
`;

const UsersCell = ({ value }) => {
  const [expanded, setExpanded] = React.useState(false);

  if (expanded)
    return (
      <div>
        {value.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
        <ShowLess onClick={() => setExpanded(!expanded)}>hide</ShowLess>
      </div>
    );

  return (
    <div>
      total: {value.length}
      <ShowMore onClick={() => setExpanded(!expanded)}>expand</ShowMore>
    </div>
  );
};

const columns = [
  {
    Header: "Team",
    accessor: "name",
  },
  {
    Header: "Project",
    accessor: "permission.project.name",
  },
  {
    Header: "Permission",
    accessor: "permission.level",
    Cell: ({ value }) => <Badge>{value}</Badge>,
  },
  {
    Header: "Users",
    accessor: "users",
    Cell: UsersCell,
  },
];

export function TeamsTable({ columns, data: gqlData }) {
  const data = (gqlData?.teams || [])
    .map((team) => {
      return team.permissions.map((permission) => ({
        ...team,
        permission,
      }));
    })
    .flat();

  return <ExpandableTable columns={columns} data={data} />;
}

TeamsTable.defaultProps = {
  columns,
};
