import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const rows = [
  {
    id: 1,
    username: '@MUI',
    age: 20,
  },
  
];

export default function HeaderColumnsGrid() {
  return (
    <div style={{ height: 250, width: '100%',bgcolor:'#121212' }}>
      <DataGrid
        columns={[{ field: 'username', width: 200 }, { field: 'age' },{field: 'email', width: 200}]}
        rows={rows}
      />
    </div>
  );
}