import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { ContainerPage, ContainerTable } from './styles';

import api from '../../../services/api';
import { toast } from 'react-toastify';

import DoneAllIcon from '@mui/icons-material/DoneAll';
import ClearIcon from '@mui/icons-material/Clear';

const Dashboard = () => {
  const [facts, setFacts] = useState<any[]>([]);

  const columns: GridColDef[] = [
    {
      field: 'author',
      headerName: 'Autor',
      width: 140,
      disableColumnMenu: true,
    },
    {
      field: 'message',
      headerName: 'Mensagem',
      width: 130,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: 'approve',
      headerName: 'Aprovar',
      width: 80,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: 'deny',
      headerName: 'Rejeitar',
      width: 80,
      disableColumnMenu: true,
      sortable: false,
    },
  ];

  const onClickCell = (factId: string) => {
    console.log(factId);
  };

  const createData = (id: string, author: any, message: string) => ({
    id,
    author,
    message,
  });

  const getFacts = () => {
    api
      .get('/facts?status=PENDING') // TODO: passar token de autorização
      .then((response: any) => {
        const apiFacts = response.data;

        setFacts(
          apiFacts.map((apiFact: any) =>
            createData(apiFact.id, apiFact.author.username, apiFact.message),
          ),
        );
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao carregar os fatos!');
      });
  };

  useEffect(() => {
    getFacts();
  }, []);

  return (
    <ContainerPage>
      <ContainerTable>
        <DataGrid
          rows={facts}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </ContainerTable>

      <DoneAllIcon />
      <ClearIcon />
    </ContainerPage>
  );
};

export default Dashboard;
