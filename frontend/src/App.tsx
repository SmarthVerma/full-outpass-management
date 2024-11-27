import React from 'react';

import AppRoutes from './AppRoutes';
import { Toaster } from './components/ui/toaster';

const App = () => {
  return (
    <>
        <Toaster />
        <AppRoutes />
    </>
  )
};

export default App;
