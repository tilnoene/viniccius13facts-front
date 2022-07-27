import { useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { toast } from 'react-toastify';

import { Cell, ContainerGrid, ContainerIcon } from './styles';
import { makeStyles } from '@material-ui/core/styles';

import api from '../../../services/api';
import { toastOptions } from '../../../services/utils';

import DoneAllIcon from '@mui/icons-material/DoneAll';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Modal } from '@mui/material';
import FactQuote from '../../FactQuote';
import Button from '../../Button';
import { useUser } from '../../../context/UserContext';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  maxWidth: '400px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 6,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const useStyles = makeStyles({
  root: {
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
  },
});

const GridFacts = ({
  facts, // tipar fatos
  setFacts,
}: {
  facts: any;
  setFacts: any;
}) => {
  const classes = useStyles();
  const { accessToken } = useUser();

  const [currentFact, setCurrentFact] = useState<any | undefined>(); // TODO: tipar fact aqui tb
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // TODO: tipar fact aqui tb
  const onClickCell = (fact: any) => {
    setCurrentFact(fact);
    handleOpenModal();
  };

  const handleApprove = (fact: any) => {
    api
      .patch(
        `/facts/${fact.id}`,
        {
          status: 'APPROVED',
        },
        {
          headers: {
            Authorization: accessToken,
          },
        },
      )
      .then(() => {
        toast.success('O fato foi aprovado!', toastOptions);

        setFacts(facts.filter((myFact: any) => myFact.id !== fact.id)); // TODO: tipar fact
        handleCloseModal();
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao aprovar o fato!', toastOptions);
      });
  };

  const handleDeny = (fact: any) => {
    api
      .patch(
        `/facts/${fact.id}`,
        {
          status: 'DENIED',
        },
        {
          headers: {
            Authorization: accessToken,
          },
        },
      )
      .then(() => {
        toast.success('O fato foi rejeitado!', toastOptions);

        setFacts(facts.filter((myFact: any) => myFact.id !== fact.id)); // TODO: tipar fact
        handleCloseModal();
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao rejeitar o fato!', toastOptions);
      });
  };

  const columns: GridColDef[] = [
    {
      field: 'author',
      headerName: 'Autor',
      width: 140,
      disableColumnMenu: true,
      renderCell: (params: GridValueGetterParams) => (
        <Cell onClick={() => onClickCell(params.row)}>
          {params.row?.author.username}
        </Cell>
      ),
    },
    {
      field: 'message',
      headerName: 'Mensagem',
      width: 130,
      disableColumnMenu: true,
      flex: 1,
      renderCell: (params: GridValueGetterParams) => (
        <Cell onClick={() => onClickCell(params.row)}>
          {params.row?.message}
        </Cell>
      ),
    },
    {
      field: 'approve',
      headerName: 'Aprovar',
      width: 80,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridValueGetterParams) => (
        <Cell onClick={() => handleApprove(params.row)}>
          <ContainerIcon>
            <DoneAllIcon />
          </ContainerIcon>
        </Cell>
      ),
    },
    {
      field: 'deny',
      headerName: 'Rejeitar',
      width: 80,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridValueGetterParams) => (
        <Cell onClick={() => handleDeny(params.row)}>
          <ContainerIcon>
            <ClearIcon />
          </ContainerIcon>
        </Cell>
      ),
    },
  ];

  return (
    <ContainerGrid>
      <DataGrid
        disableSelectionOnClick
        className={classes.root}
        rows={facts}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-submit-fact-title"
        aria-describedby="modal-submit-fact-description"
      >
        <Box sx={style}>
          {currentFact && <FactQuote fact={currentFact} />} <br />
          <Button onClick={() => handleApprove(currentFact)}>Aprovar</Button>
          <Button onClick={() => handleDeny(currentFact)}>Rejeitar</Button>
        </Box>
      </Modal>
    </ContainerGrid>
  );
};

export default GridFacts;
