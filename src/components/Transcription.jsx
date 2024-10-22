import React, { useState } from 'react';
import { createClient } from "@deepgram/sdk"; // Deepgram SDK

const Transcription = () => {
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');

  const deepgram = createClient("e41556c7abcd970766db44ee3306ec3cecf33de5"); // Your Deepgram API Key

  const transcribeAudioFromUrl = async () => {
    try {
      const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
        {
          url: "https://dpgr.am/spacewalk.wav", // Replace with your pre-recorded audio URL
        },
        {
          model: "nova-2" // You can choose other models like 'general' or 'phonecall'
        }
      );
      
      if (error) {
        setError(error);
      } else {
        setTranscription(result.results.channels[0].alternatives[0].transcript);
      }
    } catch (err) {
      setError('Error in transcription process');
    }
  };

  return (
    <div>
      <button onClick={transcribeAudioFromUrl}>Transcribe Pre-recorded Audio</button>
      {error && <p>{error}</p>}
      {transcription && <p>Transcription: {transcription}</p>}
    </div>
  );
};

export default Transcription;
