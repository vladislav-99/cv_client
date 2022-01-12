import React, { useState } from 'react';

import { DataGrid, GridColumns } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const StyledDataGrid = styled(DataGrid)({
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  borderColor: '#E3E3EA',
  '& .MuiDataGrid-iconSeparator': {
    display: 'none'
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0
  },
  '& .MuiDataGrid-cell:focus': {
    outline: 'none'
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#FFFFFF'
  },
  '& .MuiDataGrid-actionsCell button': {
    borderRadius: 5
  },
  '& .MuiDataGrid-columnHeaderTitleContainer': {
    paddingLeft: 0,
    color: '#989CA8'
  },
  '& .MuiDataGrid-columnHeader:first-of-type': {
    paddingLeft: '40px'
  },
  '& .MuiDataGrid-columnHeader:focus': {
    outline: 'none'
  },
  '& .MuiDataGrid-footerContainer': {
    // display: 'none'
    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
      fontFamily: 'Nunito'
    }
  }

  //hide pagination
  // '& .MuiDataGrid-row:last-child .MuiDataGrid-cell': {
  //   border: 'none'
  // },
  // '& .MuiDataGrid-row:last-child:hover': {
  //   backgroundColor: 'transparent'
  // },
  // '& .MuiDataGrid-footerContainer': {
  //   display: 'none'
  // }

});

interface TableProps {
  columns: GridColumns;
  rows: {
    [key: string]: any;
  }[];
}

const Table: React.FC<TableProps> = ({ columns, rows }) => {
  const [pageSize, setPeageSize] = useState(10);
  const handleChangePageSize = (num: number) => {
    setPeageSize(num)
  }
  return (
    <Box sx={{ width: '100%' }}>
      <StyledDataGrid
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        disableSelectionOnClick
        hideFooterSelectedRowCount
        autoHeight
        columns={columns}
        rows={rows}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 25, 50]}
        onPageSizeChange={handleChangePageSize}
      />
    </Box>
  );
};

export default Table;
