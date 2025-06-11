import React from 'react';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { store, RootState } from './store';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageDropzone from './components/ImageDropzone';
import ImagePreview from './components/ImagePreview';
import CompressionControls from './components/CompressionControls';
import ImageCropper from './components/ImageCropper';
import FormatSelector from './components/FormatSelector';

const AppContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AppContent: React.FC = () => {
  const { processingMode } = useSelector((state: RootState) => state.image);

  return (
    <AppContainer>
      <Header />
      <FormatSelector />
      <Main>
        <ImageDropzone />
        {processingMode === 'compress' && (
          <>
            <ImagePreview />
            <CompressionControls />
          </>
        )}
        {processingMode === 'crop' && (
          <>
            <ImageCropper />
            <ImagePreview />
          </>
        )}
      </Main>
      <Footer />
    </AppContainer>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App; 