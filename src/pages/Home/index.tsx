/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import FactQuote from '../../components/FactQuote';

import api from '../../services/api';
import { toastOptions } from '../../services/utils';

import ShareIcon from '@mui/icons-material/Share';
import TungstenIcon from '@mui/icons-material/Tungsten';
import BugReportIcon from '@mui/icons-material/BugReport';

import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import CasinoIcon from '@mui/icons-material/Casino';
import InfoIcon from '@mui/icons-material/Info';

import {
  ContainerButtons,
  ContainerFact,
  ContainerPage,
  ContainerShareButtons,
} from './styles';
import { Modal, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import SubmitFactForm from '../../components/SubmitFactForm';
import SubmitBugForm from '../../components/SubmitBugForm';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  maxWidth: '400px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const factId = searchParams.get('fact');

  const [loading, setLoading] = useState<boolean>(true);
  const [fact, setFact] = useState<Fact | undefined>();

  const [openShare, setOpenShare] = useState<boolean>(false);
  const handleOpenShare = () => setOpenShare(true);
  const handleCloseShare = () => setOpenShare(false);

  const [submitFact, setSubmitFact] = useState<boolean>(false);
  const handleOpenSubmitFact = () => setSubmitFact(true);
  const handleCloseSubmitFact = () => setSubmitFact(false);

  const [openBugReport, setOpenBugReport] = useState<boolean>(false);
  const handleOpenBugReport = () => setOpenBugReport(true);
  const handleCloseBugReport = () => setOpenBugReport(false);

  const getRandomFact = async (changeUrl = false) => {
    setLoading(true);

    api
      .get('/facts/random')
      .then(response => {
        const apiFact = response.data;

        setFact(apiFact);

        if (changeUrl) {
          window.history.pushState('', '', `?fact=${apiFact.id}`); // adicionar id do fato na URL
        }

        setLoading(false);
      })
      .catch(() => {
        navigate('/erro');

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
        navigate('/erro');

        toast.error(
          'Ocorreu um erro ao carregar o fato! Reinicie a página ou reporte o bug.',
          toastOptions,
        );
      });
  };

  const getFactUrl = () => {
    const url = window.location.href;

    if (url.includes('?fact=')) {
      return url;
    }

    return `${window.location.href}?fact=${fact?.id}`;
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
      <ContainerButtons>
        <Link to="/sobre">
          <Button>
            <InfoIcon />
            <p>Sobre</p>
          </Button>
        </Link>

        <Button iconButton onClick={handleOpenShare}>
          <ShareIcon />
        </Button>
      </ContainerButtons>

      <ContainerFact>
        {loading ? (
          <>
            <Skeleton variant="text" width={'100%'} height={30} />
            <Skeleton
              variant="text"
              width={100}
              style={{ alignSelf: 'flex-start' }}
              height={30}
            />
          </>
        ) : (
          <FactQuote fact={fact} />
        )}
      </ContainerFact>

      <ContainerButtons>
        <Button onClick={handleOpenSubmitFact}>
          <TungstenIcon style={{ transform: 'rotate(180deg)' }} />
          <p>Enviar um fato</p>
        </Button>

        <Button iconButton onClick={handleOpenBugReport}>
          <BugReportIcon />
        </Button>

        <Button iconButton onClick={() => getRandomFact(true)}>
          <CasinoIcon />
        </Button>
      </ContainerButtons>

      <Modal
        open={openShare}
        onClose={handleCloseShare}
        aria-labelledby="modal-share-title"
        aria-describedby="modal-share-description"
      >
        <Box sx={style}>
          <h3>Compartilhar</h3>
          <br />

          <ContainerShareButtons>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://twitter.com/intent/tweet?url=${getFactUrl()}&text=${
                fact?.message
              } @${fact?.author?.username}`}
            >
              <Button iconButton>
                <TwitterIcon />
              </Button>
            </a>

            <a
              target="_blank"
              rel="noreferrer"
              href={`http://www.facebook.com/sharer.php?u=${getFactUrl()}`}
            >
              <Button iconButton>
                <FacebookIcon />
              </Button>
            </a>

            <a
              target="_blank"
              rel="noreferrer"
              href={`whatsapp://send?text=${fact?.message} ${getFactUrl()}`}
              data-action="share/whatsapp/share"
            >
              <Button iconButton>
                <WhatsAppIcon />
              </Button>
            </a>

            <a
              target="_blank"
              rel="noreferrer"
              href={`https://t.me/share/url?url=${getFactUrl()}&text=${
                fact?.message
              }`}
            >
              <Button iconButton>
                <TelegramIcon />
              </Button>
            </a>
          </ContainerShareButtons>
        </Box>
      </Modal>

      <Modal
        open={openBugReport}
        onClose={handleCloseBugReport}
        aria-labelledby="modal-bug-report-title"
        aria-describedby="modal-bug-report-description"
      >
        <Box sx={style}>
          <h3>Reportar um bug ou feedback</h3>
          <br />

          <SubmitBugForm />
        </Box>
      </Modal>

      <Modal
        open={submitFact}
        onClose={handleCloseSubmitFact}
        aria-labelledby="modal-submit-fact-title"
        aria-describedby="modal-submit-fact-description"
      >
        <Box sx={style}>
          <h3>Enviar um fato</h3>
          <br />

          <SubmitFactForm />
        </Box>
      </Modal>
    </ContainerPage>
  );
};

export default Home;
