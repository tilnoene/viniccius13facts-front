import { ContainerFact, SecondayText } from './styles';

// ❝ “ ” ‟ ❝ ❞

const Fact = ({ fact }: { fact: any }) => {
  return (
    <ContainerFact>
      <p style={{fontSize: '100px'}}>❝</p>
      {fact.message}

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

export default Fact;
