import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('testando rota de favoritos', () => {
  test('Teste da rota de favoritos sem nenhum favorito', async () => {
    renderWithRouter(<App />, { route: '/favorites' });
    const pokemonsLocalStorate = JSON.parse(localStorage.getItem('favoritePokemonIds') || '[]');

    expect(pokemonsLocalStorate).toHaveLength(0);

    const notFavoritePokemon = await screen.findByText(/No favorite Pokémon found/i);
    expect(notFavoritePokemon).toBeInTheDocument();
  });

  test('Teste da rota de favoritos com favoritos', async () => {
    const { container, user } = renderWithRouter(<App />);

    // mostra mais detalhes do pokemon e favorita ele
    const moreDetails = await screen.findByText(/More details/i);
    await user.click(moreDetails);
    const favoriteCheck = await screen.findByText(/Pokémon favoritado?/i);
    await user.click(favoriteCheck);
    // mostra mais detalhes do pokemon e favorita ele

    // vai ao home novamente e escolhe outro pokemon
    const HomeRoute = await screen.findByRole('link', { name: /Home/i });
    await user.click(HomeRoute);
    const getNewPokemon = await screen.findByRole('button', { name: /Próximo Pokémon/i });
    await user.click(getNewPokemon);
    // vai ao home novamente e escolhe outro pokemon

    // mostra mais detalhes do pokemon e favorita ele
    const moreDetails2 = await screen.findByText(/More details/i);
    await user.click(moreDetails2);
    const favoriteCheck2 = await screen.findByText(/Pokémon favoritado?/i);
    await user.click(favoriteCheck2);
    // mostra mais detalhes do pokemon e favorita ele

    const pokemonsLocalStorate = JSON.parse(localStorage.getItem('favoritePokemonIds') || '[]');
    expect(pokemonsLocalStorate).toHaveLength(2);

    const favoriteRoute = await screen.findByRole('link', { name: /Favorite Pokémon/i });
    await user.click(favoriteRoute);

    const pokemonElements = container.querySelectorAll('.favorite-container div');

    expect(pokemonElements).not.toHaveLength(0);

    const favoritePokemonsName = pokemonList
      .filter((pokemon) => pokemonsLocalStorate.includes(pokemon.id));

    favoritePokemonsName.forEach(async (favoritePokemon) => {
      const pokemonName = await screen.findByText(`/${favoritePokemon.name}/i`);
      expect(pokemonName).toBeInTheDocument();
    });
  });
});
