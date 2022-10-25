import { toast } from 'react-toastify';

import {
  ContainerFact,
  ContainerId,
  PrimaryText,
  SecondaryText,
} from './styles';

import { copyTextToClipboard } from '../../services/utils';

// ❝ “ ” ‟ ❝ ❞

const FactQuote = ({
  fact,
  withId = false,
}: {
  fact: any;
  withId?: boolean;
}) => {
  return (
    <ContainerFact>
      {withId && (
        <ContainerId>
          <i style={{ cursor: 'pointer' }} onClick={() => copyTextToClipboard(fact.id)}>
            <SecondaryText>{fact?.id}</SecondaryText>
          </i>
        </ContainerId>
      )}

      <PrimaryText>{fact.message}</PrimaryText>

      {fact.author?.url ? (
        <a target="_blank" rel="noreferrer" href={fact.author?.url}>
          <SecondaryText>{`@${fact.author?.username}`}</SecondaryText>
        </a>
      ) : (
        <SecondaryText>{`@${fact.author?.username}`}</SecondaryText>
      )}
    </ContainerFact>
  );
};

export default FactQuote;
