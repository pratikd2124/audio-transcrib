import React, { useState, useRef } from 'react';
import { createClient } from "@deepgram/sdk"; // Deepgram SDK

const LiveTranscription = () => {
  const [transcription, setTranscription] = useState('');
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState('');
  const mediaRecorderRef = useRef(null);
  const deepgram = createClient("e41556c7abcd970766db44ee3306ec3cecf33de5"); // Your Deepgram API Key

  const startLiveTranscription = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const liveStream = deepgram.listen.live({
        model: 'nova',
      });

      mediaRecorder.ondataavailable = (event) => {
        liveStream.send(event.data);
      };

      mediaRecorder.start();
      setRecording(true);

      liveStream.on('transcriptReceived', (response) => {
        const transcript = response.channel.alternatives[0].transcript;
        setTranscription(transcript);
      });

      liveStream.on('error', (error) => {
        setError(`Live transcription error: ${error}`);
        stopLiveTranscription();
      });

    } catch (err) {
      setError('Error accessing microphone or starting transcription');
    }
  };

  const stopLiveTranscription = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      <button onClick={recording ? stopLiveTranscription : startLiveTranscription}>
        {recording ? 'Stop Live Transcription' : 'Start Live Transcription'}
      </button>
      {error && <p>{error}</p>}
      {transcription && <p>Live Transcription: {transcription}</p>}
    </div>
  );
};

export default LiveTranscription;
