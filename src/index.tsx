import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './assets/boxicons-2.1.2/css/boxicons.min.css';
import './assets/css/grid.css';
import './assets/css/index.css';
import './assets/css/theme.css';
import { store } from './redux/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: 1000 * 20,
    },
  },
});

document.title = 'Freshen';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Router>,
);
