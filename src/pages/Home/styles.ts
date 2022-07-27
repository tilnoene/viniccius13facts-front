import styled from 'styled-components';

export const ContainerPage = styled.div`
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-rows: 78px calc(100% - 2 * 78px) 78px;
`;

export const ContainerFact = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 10%;
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 14px;
  padding: 0 14px;
`;

export const ContainerShareButtons = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
`;
