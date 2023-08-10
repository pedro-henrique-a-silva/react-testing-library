import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Testa se menu de navegação existe', async () => {
  const { user } = renderWithRouter(<App />);

  // const headerComponent = screen.getBt
  const linkHome = await screen.findByRole('link', { name: /Home/i });
  const linkSobre = await screen.findByRole('link', { name: /About/i });
  const linkFavorito = await screen.findByRole('link', { name: /Favorite Pokémon/i });

  expect(linkHome).toBeInTheDocument();
  expect(linkSobre).toBeInTheDocument();
  expect(linkFavorito).toBeInTheDocument();

  await user.click(linkHome);

  const titleHome = await screen.findByRole('heading', { name: /Encountered Pokémon/i, level: 2 });
  expect(titleHome).toBeInTheDocument();

  await user.click(linkSobre);

  const titleSobre = await screen.findByRole('heading', { name: /About Pokédex/i, level: 2 });
  expect(titleSobre).toBeInTheDocument();

  await user.click(linkFavorito);

  const titleFavorito = await screen.findByRole('heading', { name: /Favorite Pokémon/i, level: 2 });
  expect(titleFavorito).toBeInTheDocument();
});
