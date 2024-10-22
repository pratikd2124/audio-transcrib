import React, { useState } from 'react';
import Microphone from './components/Microphone';
import Transcription from './components/Transcription';
import LiveTranscription from './components/LiveTranscription';

const App = () => {
  const [audioBlob, setAudioBlob] = useState(null);

  return (
    <div className="App">
      <h1>Audio Transcription App</h1>
      <Microphone onStop={setAudioBlob} />
      <Transcription />
      <LiveTranscription/>
    </div>
  );
};

export default App;
