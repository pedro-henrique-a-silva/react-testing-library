import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Testando rota inexistente', async () => {
  renderWithRouter(<App />, { route: '/xablau' });
  const notFoundText = /page requested not found/i;
  const imgAltText = /Clefairy pushing buttons randomly with text I have no idea what i'm doing/i;

  const pageNotFound = await screen.findByRole('heading', { level: 2, name: notFoundText });

  const imgNotFound = await screen.findByAltText(imgAltText);

  expect(pageNotFound).toBeInTheDocument();
  expect(imgNotFound).toBeInTheDocument();
});
