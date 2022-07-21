/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Fact from '../../components/Fact';

import api from '../../services/api';
import { toastOptions } from '../../services/utils';

import { ContainerPage } from './styles';

type Status = 'PENDING' | 'APPROVED' | 'DENIED';

type Author = {
  id: string;
  username: string;
  url?: string;
};

type Fact = {
  id: string;
  status: Status;
  message: string;
  author: Author;
  created_at: string;
  updated_at?: string;
};

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const factId = searchParams.get('fact');

  const [loading, setLoading] = useState<boolean>(true);
  const [fact, setFact] = useState<Fact | undefined>();

  const getRandomFact = async () => {
    api
      .get('/random_fact')
      .then(response => {
        const apiFact = response.data;

        setFact(apiFact);
        window.history.pushState('', '', `?fact=${apiFact.id}`);

        setLoading(false);
      })
      .catch(() => {
        // navigate('/erro');

        toast.error(
          'Ocorreu um erro ao gerar um fato aleatório! Reinicie a página ou reporte o bug.',
          toastOptions,
        );
      });
  };

  const getFact = (factId: string) => {
    api
      .get(`/facts/${factId}`)
      .then(response => {
        setFact(response.data);

        setLoading(false);
      })
      .catch(() => {
        // navigate('/erro');

        toast.error(
          'Ocorreu um erro ao carregar o fato! Reinicie a página ou reporte o bug.',
          toastOptions,
        );
      });
  };

  useEffect(() => {
    if (!factId) {
      getRandomFact();
    } else {
      getFact(factId);
    }
  }, []);

  return (
    <ContainerPage>
      {loading ? <div>skeleton screen</div> : <Fact fact={fact} />}
    </ContainerPage>
  );
};

export default Home;
