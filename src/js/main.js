'use strict';

import { handleNav } from './functions/navigation.js';
import { runSlider } from './functions/slider.js';
import { handleSocialMedia } from './functions/social-media.js';
import { handleUpButton, handleEnter } from './functions/accessibility.js';

handleNav();
handleEnter();
handleUpButton(); 
handleSocialMedia();
runSlider(0, 10000);