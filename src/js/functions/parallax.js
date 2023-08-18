import Rellax from 'rellax';
import { isMobile } from './check-viewport';

if (document.querySelector('[data-rellax]')) {
  const parallax = new Rellax('[data-rellax]');

  if (isMobile()) {
    parallax.destroy();
  }
}
