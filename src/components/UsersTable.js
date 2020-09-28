import React from "react";

import { Badge } from "@chakra-ui/core";
import { FiChevronDown, FiChevronUp, FiUser, FiUsers } from "react-icons/fi";

import { ExpandableTable } from "./ExpandableTable";

const groupByProject = (permissions) => {
  const projects = permissions.map((p) => p.project.name);

  return Array.from(new Set(projects)).map((name) => {
    const subRows = permissions.filter((p) => p.project.name === name);

    return {
      project: {
        name,
      },
      subRows,
    };
  });
};

const UserProjectCell = ({ row }) => {
  const { name, project } = row.original;

  if (!row.canExpand) {
    return <span style={{ marginLeft: 24 }}>{project?.name}</span>;
  }

  const Icon = row.isExpanded ? FiChevronUp : FiChevronDown;

  return (
    <div
      {...row.getToggleRowExpandedProps()}
      style={{ alignItems: "center", display: "flex", fontWeight: 500 }}
    >
      <Icon style={{ marginRight: "0.5rem" }} />
      {name}
    </div>
  );
};

const TeamCell = ({ row }) => {
  const { team, user } = row.original;

  if (team) {
    return (
      <div style={{ alignItems: "center", display: "flex" }}>
        <FiUsers style={{ marginRight: "0.5rem" }} />
        {team.name}
      </div>
    );
  }

  if (user) {
    return (
      <div style={{ alignItems: "center", display: "flex" }}>
        <FiUser style={{ marginRight: "0.5rem" }} />
        {user.name}
      </div>
    );
  }

  return null;
};

const columns = [
  {
    Header: "User/Project",
    accessor: "user.name",
    Cell: UserProjectCell,
  },
  {
    Header: "via team",
    Cell: TeamCell,
  },
  {
    Header: "Level",
    accessor: "level",
    Cell: ({ value }) => <Badge>{value}</Badge>,
  },
];

export function PermissionsTable({ columns, data: gqlData }) {
  const { permissions = [] } = gqlData;

  const data = React.useMemo(() => groupByProject(permissions), [permissions]);

  return <ExpandableTable columns={columns} data={data} />;
}

PermissionsTable.defaultProps = {
  columns,
};

export function UsersTable({ columns, data: gqlData }) {
  const data = (gqlData?.users || []).map((user) => ({
    ...user,
    subRows: user.permissions,
  }));

  return <ExpandableTable columns={columns} data={data} />;
}

UsersTable.defaultProps = {
  columns,
};
