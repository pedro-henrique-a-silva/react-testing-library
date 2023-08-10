import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
// Teste se o topo da aplicação contém um conjunto fixo de links de navegação:
// O primeiro link deve ter o texto Home.

// O segundo link deve ter o texto About.

// O terceiro link deve ter o texto Favorite Pokémon.

// Teste se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação.

// Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.

// Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação.

// Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.
describe('Testa menu de navegação', () => {
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
});
