import React, { useState } from 'react';
import Display from './components/display';
import Drumpad from './components/drumpad';
import Controls from './components/controls';
import './App.css';

// font imports

import "./fonts/Ledsim-JRz7o.ttf";

// web audio

import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';

register(connect());

//const options = {mimeType: "audio/webm"};
const audioCtx = new AudioContext();
const destination = audioCtx.createMediaStreamDestination();
const recorder = new MediaRecorder(destination.stream);
const gainNode = audioCtx.createGain();
console.log(recorder.mimeType);



function App() {

  const drumObj = {
       
    drums: [{
        pad: 1,
        id: "Q",
        keycode: 81,
        label: "High Tom",
        src: process.env.PUBLIC_URL + "/audio/hitom.wav"
      },
      {
        pad: 2,
        id: "W",
        keycode: 87,
        label: "Mid Tom",
        src: process.env.PUBLIC_URL + "/audio/midtom2.wav"
      },
      {
        pad: 3,
        id: "E",
        keycode: 69,
        label: "Low Tom",
        src: process.env.PUBLIC_URL + "/audio/loetom.wav"
      },
      {
        pad: 4,
        id: "A",
        keycode: 65,
        label: "Kick",
        src: process.env.PUBLIC_URL + "/audio/808bd2.wav"
      },
      {
        pad: 5,
        id: "S",
        keycode: 83,
        label: "Open High Hat",
        src: process.env.PUBLIC_URL + "/audio/707-ohh.wav"
      },
      {
        pad: 6,
        id: "D",
        keycode: 68,
        label: "Foot High Hat",
        src: process.env.PUBLIC_URL + "/audio/big-foot-hh.wav"
      },
      {
        pad: 7,
        id: "Z",
        keycode: 90,
        label: "Snare",
        src: process.env.PUBLIC_URL + "/audio/brass-sd2.wav"
      },
      {
        pad: 8,
        id: "X",
        keycode: 88,
        label: "Bright Open High Hat",
        src: process.env.PUBLIC_URL + "/audio/909-bright-ohh.wav"
      },
      {
        pad: 9,
        id: "C",
        keycode: 67,
        label: "Collapsed Hat",
        src: process.env.PUBLIC_URL + "/audio/909-collapsed-hat.wav"
      }

    ]};  
    
  
  const [display, setDisplay] = useState("");
  const [volume, setVolume] = useState(1);
  const [recording, setRecording] = useState(false);
  const [records, setRecords] = useState([]);
  const [track, setTrack] = useState(0);
  const [trackPlaying, setTrackPlaying] = useState(false);
  
  const handleVolumeControl = (e) => {
    setVolume(e.target.value);
    gainNode.gain.value = e.target.value;
  };


  const handlePause = (e) => {
    
    if (e){
      setTrackPlaying(!trackPlaying);
      console.log(`${e}exists`);
      if(trackPlaying){

        console.log("pause");
        e.pause();
      }else if (e.currentTime !== 0){
        console.log("play");
        e.play();
      
      }else{
        handlePlaySound(e);
      }

      e.onended = () => {
        setTrackPlaying(false);
        console.log("track is done playing")

      }
      
    } else {
      return
    }
  };
  

  const handlePlaySound = (e) => {
    
    let sound = e;
    audioCtx.resume();
    sound.currentTime = 0;
    sound.play();
    let source = audioCtx.createMediaElementSource(sound);
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    gainNode.connect(destination);
  };

  

  const handleRecorder = (e) => {
    if (!recording) {
      let chunks = [];
      recorder.start();
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = (e) => {
        console.log(recorder.mimeType);
        const blob = new Blob(chunks, {type: "audio/wav"});
        const url = URL.createObjectURL(blob);
        let a;
        a = new Audio()
        a.src = url;
        a.controls = true;
        a.download = 'a.mp3';
        a.preload = 'auto';
        document.getElementById('records').appendChild(a);
        setRecords([...records, a]);
        if (track === 0) setTrack(1);
      }

    }else{
      recorder.stop(); 
    }
    setRecording(!recording);
    
  };


  return (
    <div className="App" onClick={void(0)}>
      <div className="App-header">React Drum Machine</div>
      <div id="drum-machine">
        <div id="drumpad-container">

          {drumObj.drums.map((drum) => <Drumpad key={drum.id} drum={drum} drumObj={drumObj} handlePlaySound={handlePlaySound} displayHandler={setDisplay} volume={volume}/>)}
        </div>

        <div id="display-control-container">

          <Display 
            value={display} 
            volume={volume} 
            rec={recording} 
            records={records} 
            track={track} />

          <Controls 
            value={display} 
            volume={volume} 
            rec={recording} 
            records={records}
            setRecords={setRecords} 
            track={track}
            trackPlaying={trackPlaying}
            setTrackPlaying={setTrackPlaying} 
            setTrack={setTrack}

            play={handlePause} 
            handleRecorder={handleRecorder} 
            handleChange={handleVolumeControl}/>
        
        </div>
      </div>
    </div>
  );
};

export default App;
