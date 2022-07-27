import { useEffect, useState } from 'react';

import GridFacts from '../../../components/Admin/GridFacts';

import { ContainerPage } from './styles';

import api from '../../../services/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [facts, setFacts] = useState<any[]>([]); // TODO: tipar fatos

  const getFacts = () => {
    api
      .get('/facts?status=PENDING') // TODO: passar token de autorização
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
