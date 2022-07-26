import styled from 'styled-components';

type ContainerButtonType = {
  iconButton?: boolean;
  type?: 'button' | 'submit';
};

export const ContainerButton = styled.button<ContainerButtonType>`
  min-width: ${props => (props.iconButton ? '50px' : 'min-content')};
  padding: ${props => (props.iconButton ? '0' : '0 14px')};
  height: 50px;
  gap: 8px;

  align-items: center;
  appearance: none;
  background-color: #4e4e4e;
  border-radius: 4px;
  border-width: 0;
  box-shadow: #363636 0 -3px 0 inset;
  box-sizing: border-box;
  color: #e3e3e3;
  cursor: pointer;
  display: inline-flex;
  font-family: 'JetBrains Mono', monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(2px);
  }
`;
