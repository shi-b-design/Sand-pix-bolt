import { Toaster } from 'react-hot-toast';
import { useSwipeStore } from './store/useSwipeStore';
import SwipeInterface from './components/SwipeInterface';
import BrandInfoForm from './components/BrandInfoForm';
import HeroPreview from './components/HeroPreview';
import ChatInterface from './components/ChatInterface';
import FullPagePreview from './components/FullPagePreview';

function App() {
  const currentPhase = useSwipeStore((state) => state.currentPhase);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1F2937',
            color: '#F9FAFB',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#F9FAFB',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#F9FAFB',
            },
          },
        }}
      />

      {currentPhase === 'swipe' && <SwipeInterface />}
      {currentPhase === 'brandInfo' && <BrandInfoForm />}
      {currentPhase === 'heroPreview' && <HeroPreview />}
      {currentPhase === 'chat' && <ChatInterface />}
      {currentPhase === 'fullPagePreview' && <FullPagePreview />}
    </>
  );
}

export default App;
