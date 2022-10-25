import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { ContainerForm } from './styles';
import { InputAdornment } from '@mui/material';
import Button from '../Button';
import { toast } from 'react-toastify';
import { toastOptions } from '../../services/utils';
import api from '../../services/api';

const SubmitBugForm = () => {
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

  const handleSubmit = () => {
    if (username.length === 0) {
      toast.error('Username inválido!', toastOptions);
      return;
    }

    if (message.length === 0) {
      toast.error('Mensagem inválida!', toastOptions);
      return;
    }

    api
      .post('/bugs', {
        message,
        author: {
          username,
        },
      })
      .then(() => {
        toast.success('Sua mensagem foi enviada para análise! Obrigado.', toastOptions);

        setUsername('');
        setMessage('');
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao enviar sua mensagem!', toastOptions);
      });
  };

  return (
    <ContainerForm>
      <TextField
        id="outlined-message-flexible"
        label="Username"
        placeholder="username"
        value={username}
        onChange={event => handleChangeUsername(event)}
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
        }}
        required
        inputProps={{
          maxLength: 32,
        }}
        autoComplete="off"
      />

      <TextField
        id="outlined-message-flexible"
        label="Mensagem"
        placeholder="Escreva sua mensagem..."
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

      <Button onClick={handleSubmit}>Enviar</Button>
    </ContainerForm>
  );
};

export default SubmitBugForm;
