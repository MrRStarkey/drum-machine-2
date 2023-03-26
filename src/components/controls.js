import React from "react";

function Controls(props){


    const controlButtons = {
        record: {
            label: "record",
            imgSrc: process.env.PUBLIC_URL + "/images/round-record.png"
        },
        stop: {
            label: "stop",
            imgSrc: process.env.PUBLIC_URL + "/images/round-stop.png"
        },
        play: {
            label: "play",
            imgSrc: process.env.PUBLIC_URL + "/images/round-play.png"
        },
        pause: {
            label: "pause",
            imgSrc: process.env.PUBLIC_URL + "/images/round-pause.png"
        },
        download: {
            label: "download",
            imgSrc: process.env.PUBLIC_URL + "/images/round-blank.png"
        },
        left: {
            label: "left",
            imgSrc: process.env.PUBLIC_URL + "/images/round-back.png"
        },
        right: {
            label: "right",
            imgSrc: process.env.PUBLIC_URL + "/images/round-forward.png"
        },
    }

    const handleTrack = (e) => {
        console.log(e);
        switch (e.currentTarget.id){
            case "back":
                if (props.track <= 1) break;    
                props.setTrack(props.track - 1);
                break;
            case "forward":
                if (props.track <= 1 && props.track.length === props.track) break;
                if (props.track === props.records.length){
                    
                    break;
                }else{
                props.setTrack(props.track + 1);
                break;
                }
            default:
                break;
        }

    };

    const handleDelete = () => {
        props.setRecords([]);
        props.setTrack(0);
    };

    return(
        <div id="controls-container">
            <div id="volume-container">
                <input
                    orient="vertical" 
                    id="vol-control" 
                    type="range" 
                    min="0" max="1" 
                    value={props.volume} 
                    onChange={props.handleChange}
                    step=".01"/>
                <p>VOLUME</p>
            </div>
            
            <div id="audio-buttons">
                
                <div id="play" className="audio-button" onClick={()=>{props.play(props.records[props.track-1])}} style={props.track === 0 ? {cursor: 'initial'} : {cursor: 'pointer'}}><p>PLAY</p><img src={props.trackPlaying ? controlButtons.pause.imgSrc : controlButtons.play.imgSrc} alt=""/></div>
                <div id="back" className="audio-button" onClick={handleTrack} style={props.track === 0 ? {cursor: 'initial'} : {cursor: 'pointer'}}><p>BACK</p><img src={controlButtons.left.imgSrc} alt=""/></div>
                <div id="forward" className="audio-button" onClick={handleTrack} style={props.track === 0 ? {cursor: 'initial'} : {cursor: 'pointer'}}><p>FWD</p><img src={controlButtons.right.imgSrc} alt=""/></div>
                <div id="record" className="audio-button" onClick={props.handleRecorder} style={{cursor: 'pointer'}}><p>REC</p><img src={controlButtons.record.imgSrc} alt=""/></div>
                <div id="delete" className="audio-button" onClick={handleDelete} style={props.track === 0 ? {cursor: 'initial'} : {cursor: 'pointer'}}><p>DEL</p><img src={controlButtons.download.imgSrc} alt=""/></div>
                <a id="download" className="audio-button" href={props.records.length > 0 ? props.records[props.track - 1].src : " "} download="audio.wav" style={props.track === 0 ? {pointerEvents: 'none'} : {}}><p>SAVE</p><img src={controlButtons.download.imgSrc} alt=""/></a>
            </div>
            <div id="records" /> 
        </div>
    );

}

export default Controls