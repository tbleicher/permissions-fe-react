import React from "react";
import styled from "@emotion/styled";

import { useTable, useExpanded } from "react-table";

const Table = styled.table`
  border-spacing: 0;
  margin-top: 20px;
  table-layout: fixed;
  width: 100%;
`;

const TD = styled.td`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  margin: 0;
  padding: 0.5rem 1rem;
  vertical-align: top;
`;

const TH = styled.th`
  background: ${({ theme }) => theme.colors.gray[100]};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[100]};
  margin: 0;
  padding: 0.5rem 1rem;
  text-align: left;
`;

const TR = styled.tr`
  :last-child {
    td {
      border-bottom: 0;
    }
  }
`;

export function ExpandableTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useExpanded // Use the useExpanded plugin hook
  );

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <TR {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TH {...column.getHeaderProps()}>{column.render("Header")}</TH>
            ))}
          </TR>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TR {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <TD {...cell.getCellProps()}>{cell.render("Cell")}</TD>
              ))}
            </TR>
          );
        })}
      </tbody>
    </Table>
  );
}
