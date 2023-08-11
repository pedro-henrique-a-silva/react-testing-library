import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

// Teste se é mostrado apenas um Pokémon por vez.
// Teste se a Pokédex tem os botões de filtro:
// Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
// obs.: Os botões devem ser capturados pelo data-testid=pokemon-type-button.
// Após a seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo.
// O texto do botão deve corresponder ao nome do tipo, ex.: Psychic.
// O botão All precisa estar sempre visível.
// Teste se a Pokédex contém um botão para resetar o filtro:
// O texto do botão deve ser All.
// A Pokedéx deverá mostrar os Pokémon normalmente (sem filtros) quando o botão All for clicado.
// Ao carregar a página, o filtro selecionado deverá ser All.
// O que será verificado

// Se o arquivo-teste Pokedex.test.tsx contempla 100% dos casos de uso criados pelo Stryker:
// Os botões de filtragem por tipo têm o nome correto
// Os botões de filtragem por tipo têm o data-testid=pokemon-type-button, exceto o botão All
// É possível clicar no botão de filtragem All
describe('Tesando funcionamento da pokedex', () => {
  test('Verificando se existe um H2 na tela, e funcionalidade do botão proximo pokemon', async () => {
    const { user } = renderWithRouter(<App />);

    const titlePokedex = await screen.findByRole('heading', { level: 2, name: /Encountered Pokémon/i });
    expect(titlePokedex).toBeInTheDocument();

    const pokemonNameBefore = (await screen.findByTestId(/pokemon-name/i)).textContent;

    const nextPokemonButton = await screen.findByRole('button', { name: 'Próximo Pokémon' });
    expect(nextPokemonButton).toBeInTheDocument();

    await user.click(nextPokemonButton);

    const pokemonNameAfter = (await screen.findByTestId(/pokemon-name/i)).textContent;

    expect(pokemonNameBefore).not.toEqual(pokemonNameAfter);

    await user.click(nextPokemonButton);
    await user.click(nextPokemonButton);
    await user.click(nextPokemonButton);
    await user.click(nextPokemonButton);
    await user.click(nextPokemonButton);
    await user.click(nextPokemonButton);
    await user.click(nextPokemonButton);

    const lastPokemon = (await screen.findByTestId(/pokemon-name/i)).textContent;
    await user.click(nextPokemonButton);
    const firstPokemon = (await screen.findByTestId(/pokemon-name/i)).textContent;

    expect(lastPokemon).toBe('Dragonair');
    expect(firstPokemon).toBe('Pikachu');
  });

  test('Verifica se os botões de filtro estão na tela', async () => {
    const { user } = renderWithRouter(<App />);

    const testButtonFilter = async (buttonFilter: HTMLElement) => {
      await user.click(buttonFilter);
      const buttonContent = buttonFilter.textContent;

      const pokemonName = await screen.findByTestId('pokemon-name');
      const pokemonType = await screen.findByTestId('pokemon-type');
      const pokemonWeight = await screen.findByTestId('pokemon-weight');
      const pokemonNextButton = await screen.findByTestId('next-pokemon');

      expect(pokemonName).toBeInTheDocument();
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonWeight).toBeInTheDocument();
      expect(pokemonType.textContent).not.toBe('');

      if (buttonContent === 'All') {
        expect(pokemonType.textContent).toBe('Electric');
        expect(pokemonName.textContent).toBe('Pikachu');
        expect(pokemonNextButton).toBeEnabled();
      } else {
        expect(pokemonType.textContent).toBe(buttonContent);
      }
    };

    const filterButtons = await screen.findAllByTestId('pokemon-type-button');
    const filterAllButton = await screen.findByRole('button', { name: /All/i });

    expect(filterButtons).not.toHaveLength(0);
    expect(filterAllButton).toBeInTheDocument();

    await testButtonFilter(filterButtons[0]);
    await testButtonFilter(filterButtons[1]);
    await testButtonFilter(filterButtons[2]);
    await testButtonFilter(filterButtons[3]);
    await testButtonFilter(filterButtons[4]);
    await testButtonFilter(filterButtons[5]);
    await testButtonFilter(filterButtons[6]);
    await testButtonFilter(filterAllButton);
  });
});
