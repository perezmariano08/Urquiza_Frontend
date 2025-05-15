import AppRouter from './router';
import { PrimeReactProvider } from 'primereact/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "primereact/resources/themes/lara-light-blue/theme.css";

const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <PrimeReactProvider>
            <AppRouter />
         </PrimeReactProvider>
      </QueryClientProvider>
   )
}

export default App;
