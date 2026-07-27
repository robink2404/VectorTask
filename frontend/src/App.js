import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import { Header } from './components/Header';
import { Toolbar } from './components/Toolbar';
import { PipelineCanvas } from './components/PipelineCanvas';

function App() {
  return (
    <ReactFlowProvider>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Toolbar />
          <PipelineCanvas />
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
