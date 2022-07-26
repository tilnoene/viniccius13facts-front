import { ContainerFact, PrimaryText, SecondayText } from './styles';

// ❝ “ ” ‟ ❝ ❞

const FactQuote = ({ fact }: { fact: any }) => {
  return (
    <ContainerFact>
      <PrimaryText>{fact.message}</PrimaryText>

      {fact.author.url ? (
        <a target="_blank" rel="noreferrer" href={fact.author.username}>
          <SecondayText>{`@${fact.author.username}`}</SecondayText>
        </a>
      ) : (
        <SecondayText>{`@${fact.author.username}`}</SecondayText>
      )}
    </ContainerFact>
  );
};

export default FactQuote;
