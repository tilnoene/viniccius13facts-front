import styled from 'styled-components';

export const ContainerFact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PrimaryText = styled.p`
  color: #e3e3e3;
  font-size: 24px;
  padding: 0;
  margin: 0;
  text-align: left;
`;

export const SecondaryText = styled.p`
  color: #747474;
  font-size: 20px;
  padding: 0;
  margin: 0;
`;

export const ContainerId = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 18px;
  }
`;
