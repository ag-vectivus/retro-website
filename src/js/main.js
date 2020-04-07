'use strict';

import { handleNav } from './functions/navigation.js';
import { runSlider } from './functions/slider.js';
import { handlePortfolio} from './functions/portfolio.js';
import { handleSocialMedia } from './functions/social-media.js';
import { handleUpButton, handleEnter } from './functions/accessibility.js';

handleNav();
handleEnter();
handleUpButton();
handlePortfolio(); 
handleSocialMedia();
runSlider(0, 10000);