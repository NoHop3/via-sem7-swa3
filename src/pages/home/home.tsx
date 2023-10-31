// src/pages/home/home.tsx
// import { IHomeProps } from './home.props';
import { StyledHomeWrapper } from './home.styles';
import { Gameboard } from '../../components';

function* stringGenerator() {
  const characters = ['A', 'B', 'C'];
  while (true) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    yield characters[randomIndex];
  }
}

export const _Home = () => {
  const generator = stringGenerator(); // Create an instance of the generator

  return (
    <StyledHomeWrapper>
      <Gameboard rows={5} cols={5} generator={generator} />
    </StyledHomeWrapper>
  );
};
