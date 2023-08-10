import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste da rota sobre', async () => {
  const { container } = renderWithRouter(<App />, { route: '/about' });

  const p1 = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémon.';
  const p2 = 'One can filter Pokémon by type, and see more details for each one of them.';
  const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  const paragraphs = container.querySelectorAll('.about-container div > p');
  const imgElement = await screen.findByAltText(/Pokédex/i);

  // console.log(imgElement);
  const titleSobre = await screen.findByRole('heading', { name: /About Pokédex/i, level: 2 });
  expect(titleSobre).toBeInTheDocument();

  expect(paragraphs[0].textContent).toBe(p1);
  expect(paragraphs[1].textContent).toBe(p2);
  expect(paragraphs).toHaveLength(2);

  expect(imgElement).toHaveAttribute('src', imgUrl);
});
