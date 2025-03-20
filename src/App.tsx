import React from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import { store } from './store';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageDropzone from './components/ImageDropzone';
import ImagePreview from './components/ImagePreview';
import CompressionControls from './components/CompressionControls';

const AppContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  background-color: transparent;
`;

const Main = styled.main`
  min-height: calc(100vh - 200px);
  padding: 1rem 0;
`;

function App() {
  return (
    <Provider store={store}>
      <AppContainer>
        <Header />
        <Main>
          <ImageDropzone />
          <ImagePreview />
          <CompressionControls />
        </Main>
        <Footer />
      </AppContainer>
    </Provider>
  );
}

export default App; 