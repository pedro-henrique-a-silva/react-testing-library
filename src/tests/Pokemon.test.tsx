import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import pokemonList from '../data';

describe('Testando card do pokemon', () => {
  test('testando pokemon sem favorito', async () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemonList[0] }
        showDetailsLink
        isFavorite={ false }
      />,
    );

    const { averageWeight, id, image, name, type } = pokemonList[0];

    const { value, measurementUnit } = averageWeight;

    const average = `Average weight: ${value} ${measurementUnit}`;

    const pokemonName = await screen.findByTestId('pokemon-name');
    const pokemonType = await screen.findByTestId('pokemon-type');
    const pokemonWeight = await screen.findByTestId('pokemon-weight');
    const pokemonImage = await screen.findByAltText(`${name} sprite`);
    const pokemonLink = await screen.findByRole('link', { name: /More details/i });

    expect(pokemonName.textContent).toBe(name);

    expect(pokemonType.textContent).toBe(type);

    expect(pokemonWeight.textContent).toBe(average);

    expect(pokemonImage).toHaveAttribute('src', image);

    expect(pokemonLink).toHaveAttribute('href', `/pokemon/${id}`);
    renderWithRouter(<App />, { route: `/pokemon/${id}` });

    const pokemonDetailsTitle = await screen.findByRole('heading', { level: 2, name: /Pikachu Details/i });

    expect(pokemonDetailsTitle).toBeInTheDocument();
  });

  test('testando pokemon com favorito', async () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemonList[0] }
        showDetailsLink
        isFavorite
      />,
    );

    const { averageWeight, id, image, name, type } = pokemonList[0];

    const { value, measurementUnit } = averageWeight;

    const average = `Average weight: ${value} ${measurementUnit}`;

    const pokemonName = await screen.findByTestId('pokemon-name');
    const pokemonType = await screen.findByTestId('pokemon-type');
    const pokemonWeight = await screen.findByTestId('pokemon-weight');
    const pokemonImage = await screen.findByAltText(`${name} sprite`);
    const pokemonLink = await screen.findByRole('link', { name: /More details/i });
    const pokemonFavoriteImage = await screen.findByAltText(/Pikachu is marked as favorite/i);

    expect(pokemonName.textContent).toBe(name);

    expect(pokemonType.textContent).toBe(type);

    expect(pokemonWeight.textContent).toBe(average);

    expect(pokemonImage).toHaveAttribute('src', image);

    expect(pokemonLink).toHaveAttribute('href', `/pokemon/${id}`);

    expect(pokemonFavoriteImage).toBeInTheDocument();
    expect(pokemonFavoriteImage).toHaveAttribute('src', '/star-icon.png');
    expect(pokemonFavoriteImage).toHaveAttribute('alt', 'Pikachu is marked as favorite');

    renderWithRouter(<App />, { route: `/pokemon/${id}` });

    const pokemonDetailsTitle = await screen.findByRole('heading', { level: 2, name: /Pikachu Details/i });

    expect(pokemonDetailsTitle).toBeInTheDocument();
  });
});
