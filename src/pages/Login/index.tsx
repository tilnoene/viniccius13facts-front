import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { ContainerPage } from './styles';

import api from '../../services/api';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import { useUser } from '../../context/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useUser();

  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    setPassword('');

    api
      .post('/auth/login', {
        password,
      })
      .then(response => {
        setAccessToken(response.data.access_token);

        toast.success('Senha correta!');

        navigate('/admin/dashboard');
      })
      .catch(() => {
        toast.error('Senha inválida!');
      });
  };

  return (
    <ContainerPage>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '260px',
        }}
      >
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={event => handleChange(event)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Senha"
            onKeyPress={e => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
        </FormControl>

        <Button onClick={() => handleSubmit()}>Entrar</Button>
      </div>
    </ContainerPage>
  );
};

export default Login;
