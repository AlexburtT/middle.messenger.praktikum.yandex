import { HomePage } from './pages/Home';
import { renderDOM } from './utills/renderDOM';

document.addEventListener('DOMContentLoaded', () => {
  const homePage = new HomePage();
  renderDOM('#app', homePage);
});
