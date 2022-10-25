import { useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { toast } from 'react-toastify';

import { Cell, ContainerGrid, ContainerIcon } from './styles';
import { makeStyles } from '@material-ui/core/styles';

import api from '../../../services/api';
import { toastOptions } from '../../../services/utils';

import DoneAllIcon from '@mui/icons-material/DoneAll';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  FormControlLabel,
  InputAdornment,
  Modal,
  Switch,
  TextField,
} from '@mui/material';
import FactQuote from '../../FactQuote';
import Button from '../../Button';
import { useUser } from '../../../context/UserContext';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: window.innerWidth >= 420 ? '420px' : '300px',
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
  facts,
  setFacts,
  handlePrev,
  handleNext,
}: {
  facts: Fact[];
  setFacts: (facts: Fact[]) => void;
  handlePrev: (page: number) => void;
  handleNext: (page: number) => void;
}) => {
  const classes = useStyles();
  const { accessToken } = useUser();

  const [currentFact, setCurrentFact] = useState<Fact | undefined>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setEditMode(false);
  };

  const [username, setUsername] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleChangeUsername = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setUsername(event.target.value);
  };

  const handleChangeMessage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setMessage(event.target.value);
  };

  const onClickCell = (fact?: Fact) => {
    if (!fact) {
      return;
    }

    setCurrentFact(fact);

    setUsername(fact?.author?.username || '');
    setMessage(fact?.message || '');

    handleOpenModal();
  };

  const handleApprove = (fact?: Fact) => {
    if (!fact) {
      return;
    }

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

        setFacts(facts.filter((myFact: Fact) => myFact.id !== fact.id));
        handleCloseModal();
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao aprovar o fato!', toastOptions);
      });
  };

  const handleDeny = (fact?: Fact) => {
    if (!fact) {
      return;
    }

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

        setFacts(facts.filter((myFact: Fact) => myFact.id !== fact.id));
        handleCloseModal();
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao rejeitar o fato!', toastOptions);
      });
  };

  const handleEditMode = () => {
    setEditMode(!editMode);

    setUsername(currentFact?.author?.username || '');
    setMessage(currentFact?.message || '');
  };

  const handleEdit = () => {
    if (!currentFact) {
      toast.error('Nenhum fato foi selecionado!', toastOptions);
      return;
    }

    if (username.length === 0) {
      toast.error('Username inválido!', toastOptions);
      return;
    }

    if (message.length === 0) {
      toast.error('Fato inválido!', toastOptions);
      return;
    }

    api
      .patch(
        `/facts/${currentFact.id}`,
        {
          message,
          author: {
            username,
            url: `https://twitter.com/${username}`,
          },
        },
        {
          headers: {
            Authorization: accessToken,
          },
        },
      )
      .then((response: any) => {
        toast.success('Fato editado com sucesso!', toastOptions);

        setUsername('');
        setMessage('');

        setCurrentFact(response.data);

        setEditMode(false);
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao editar o fato!', toastOptions);
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
          {params.row?.author?.username}
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
          <FormControlLabel
            control={
              <Switch
                checked={editMode}
                onChange={handleEditMode}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label="Modo de edição"
          />

          {editMode ? (
            <div
              style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}
            >
              <TextField
                id="outlined-message-flexible"
                label="Username"
                placeholder="username"
                value={username}
                onChange={event => handleChangeUsername(event)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">@</InputAdornment>
                  ),
                }}
                required
                inputProps={{
                  maxLength: 32,
                }}
                autoComplete="off"
              />

              <TextField
                id="outlined-message-flexible"
                label="Fato"
                placeholder="Escreva seu fato..."
                multiline
                required
                rows={4}
                value={message}
                onChange={event => handleChangeMessage(event)}
                inputProps={{
                  maxLength: 256,
                }}
                autoComplete="off"
              />

              <Button onClick={() => handleEdit()}>Salvar</Button>
            </div>
          ) : (
            <>
              {currentFact && <FactQuote fact={currentFact} withId />} <br />
              <Button onClick={() => handleApprove(currentFact)}>
                Aprovar
              </Button>
              <Button onClick={() => handleDeny(currentFact)}>Rejeitar</Button>
            </>
          )}
        </Box>
      </Modal>
    </ContainerGrid>
  );
};

export default GridFacts;
