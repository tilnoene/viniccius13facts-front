import styled from 'styled-components';

type ContainerPageProps = {
  backgroundImage: any;
};

export const ContainerPage = styled.div<ContainerPageProps>`
  width: 100vw;
  height: 100vh;
  background-image: radial-gradient(rgb(34, 34, 34, 0.5), rgb(34, 34, 34, 1)),
    url(${props => props.backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Image = styled.img`
  width: 160px;
  height: 160px;
  animation: spin 4s linear infinite;
  -webkit-animation: spin 4s linear infinite;
  -moz-animation: spin 4s linear infinite;

  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
