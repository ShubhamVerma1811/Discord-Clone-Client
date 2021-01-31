import { PusherProvider } from '@harelpls/use-pusher';
import pusherConfig from 'configs/pusher';
import dynamic from 'next/dynamic';
import 'nprogress/nprogress.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store from 'store';
import 'styles/globals.css';
import 'styles/reset.css';

const TopProgressBar = dynamic(
  () => {
    return import('components/TopProgressBar/TopProgressBar');
  },
  { ssr: false }
);

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  let persistor = persistStore(store);

  return (
    <>
      <title>Disscord</title>
      <TopProgressBar />
      <Provider store={store}>
        <PersistGate
          loading={<div>Hydrating State...</div>}
          persistor={persistor}>
          <PusherProvider {...pusherConfig}>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </PusherProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
