import { useEffect, useState } from 'react';

import GridFacts from '../../../components/Admin/GridFacts';

import { ContainerPage } from './styles';

import api from '../../../services/api';
import { toast } from 'react-toastify';
import { useUser } from '../../../context/UserContext';

const Dashboard = () => {
  const { accessToken } = useUser();

  const [facts, setFacts] = useState<Fact[]>([]);

  const getFacts = () => {
    api
      .get('/facts?status=PENDING', {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response: any) => {
        setFacts(response.data);
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
      <GridFacts facts={facts} setFacts={setFacts} />
    </ContainerPage>
  );
};

export default Dashboard;
