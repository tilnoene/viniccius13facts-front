import { ContainerPage, Image } from './styles';

import BackgroundImage from '../../assets/background_cave.jpg';
import RedstoneDust from '../../assets/redstone_dust.png';

const NotFound = () => {
  return (
    <ContainerPage backgroundImage={BackgroundImage}>
      <Image src={RedstoneDust} />
      <p>Página não encontrada :(</p>
    </ContainerPage>
  );
};

export default NotFound;
