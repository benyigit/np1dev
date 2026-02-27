import { backgroundComponents } from './backgrounds';
import { textAnimationComponents } from './textAnimations';
import { animationComponents } from './animations';
import { componentComponents } from './components';
import { buttonComponents } from './buttons';
import { effectComponents } from './effects';

const componentRegistry = [
    ...backgroundComponents,
    ...textAnimationComponents,
    ...animationComponents,
    ...componentComponents,
    ...buttonComponents,
    ...effectComponents,
];

export const categories = [
    { id: 'backgrounds', icon: '◧' },
    { id: 'textAnimations', icon: '𝐓' },
    { id: 'animations', icon: '◎' },
    { id: 'components', icon: '⬡' },
    { id: 'buttons', icon: '◉' },
    { id: 'effects', icon: '✦' },
];

export default componentRegistry;
