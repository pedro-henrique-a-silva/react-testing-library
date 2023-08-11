import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

test('Testando rota de detalhes', async () => {
  const { id, name, summary } = pokemonList[0];

  const { container, user } = renderWithRouter(<App />, { route: `/pokemon/${id}` });

  const titleDetails = await screen.findByRole('heading', { level: 2, name: `${name} Details` });
  expect(titleDetails).toBeInTheDocument();

  const sumaryTitle = await screen.findByRole('heading', { level: 2, name: /Summary/i });
  expect(sumaryTitle).toBeInTheDocument();

  const summaryContainer = container.querySelector('.summary-container');
  expect(summaryContainer).toHaveTextContent(summary);

  const location = await screen.findByRole('heading', { level: 2, name: `Game Locations of ${name}` });
  expect(location).toBeInTheDocument();

  const imgLocation = await screen.findAllByAltText('Pikachu location');

  expect(imgLocation[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
  expect(imgLocation[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');

  const labelFavoritado = await screen.findByLabelText(/Pokémon favoritado?/i);
  expect(labelFavoritado).toBeInTheDocument();

  await user.click(labelFavoritado);

  expect(labelFavoritado).toBeChecked();
});
