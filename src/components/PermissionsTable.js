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

const ProjectCell = ({ row }) => {
  // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
  // to build the toggle for expanding a row
  const name = row.original?.project?.name || "";

  if (!row.canExpand) {
    return <span style={{ marginLeft: 24 }}>{name}</span>;
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

const TeamUserCell = ({ row }) => {
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
    Header: "Project",
    accessor: "project.name",
    Cell: ProjectCell,
  },
  {
    Header: "Team/User",
    Cell: TeamUserCell,
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
