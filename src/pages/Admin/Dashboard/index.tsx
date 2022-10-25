import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormControl, InputLabel, MenuItem, Select, Skeleton } from '@mui/material';

import GridFacts from '../../../components/Admin/GridFacts';
import Button from '../../../components/Button';

import { ContainerInputs, ContainerPage } from './styles';

import api from '../../../services/api';
import { useUser } from '../../../context/UserContext';
import { factStatus } from '../../../services/utils';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Dashboard = () => {
  const { accessToken } = useUser();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1,
  );
  const [status, setStatus] = useState<string>(
    searchParams.get('status') || 'PENDING',
  );
  const [facts, setFacts] = useState<Fact[]>([]);

  const getFacts = () => {
    setLoading(true);

    api
      .get(`/facts?status=${status}&page=${page}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response: any) => {
        setFacts(response.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao carregar os fatos!');
        setLoading(false);
      });
  };

  const handlePrev = () => setPage(Math.max(page-1, 1));
  const handleNext = () => setPage(page+1);

  useEffect(() => {
    getFacts();
  }, []);

  useEffect(() => {
    window.history.pushState('', '', `?status=${status}&page=${page}`);
    getFacts();
  }, [page, status]);

  return (
    <ContainerPage>
      {loading ? (
        <>
          <Skeleton variant="rectangular" width={'100%'} height={80} />
          <Skeleton variant="rectangular" width={'100%'} height={620} />
        </>
      ) : (
        <>
          <ContainerInputs>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={(e: any) => setStatus(e.target.value)}
              >
                {factStatus.map(status => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button iconButton onClick={handlePrev}><ArrowBackIcon /></Button>
            <Button iconButton onClick={handleNext}><ArrowForwardIcon /></Button>
          </ContainerInputs>

          <GridFacts
            facts={facts}
            setFacts={setFacts}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </>
      )}
    </ContainerPage>
  );
};

export default Dashboard;
