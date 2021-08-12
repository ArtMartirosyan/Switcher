import { useState } from "react";
import { Table, Pagination } from "semantic-ui-react";

const DataTable = ({ columns, data, pageSize }) => {
  const [activePage, setActivePage] = useState(1);

  const handlePageInfo = (e, pageInfo) => {
    setActivePage(pageInfo.activePage);
  };
  console.log("data", data);
  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            {columns.map((col) => {
              return <Table.HeaderCell>{col.value}</Table.HeaderCell>;
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data
            .slice((activePage - 1) * pageSize + 1, activePage * pageSize)
            .map((row, rowIndex) => {
              return (
                <Table.Row key={rowIndex}>
                  {columns.map((column, columnIndex) => {
                    return (
                      <Table.Cell key={columnIndex}>
                        {column.cellRenderer
                          ? column.cellRenderer(
                              row,
                              rowIndex,
                              column,
                              columnIndex
                            )
                          : row[column.value]}
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              );
            })}
        </Table.Body>

        <Pagination
          totalPages={Math.ceil(data.length / pageSize)}
          activePage={activePage}
          onPageChange={(e, pageInfo) => handlePageInfo(e, pageInfo)}
        />
      </Table>
    </div>
  );
};

export default DataTable;
