import * as React from 'react';
import { render } from 'react-dom';

import { Dashboard } from './src/Dashboard';
import registerServiceWorker from './src/registerServiceWorker';

render(<Dashboard />, document.getElementById('root'));

registerServiceWorker();
