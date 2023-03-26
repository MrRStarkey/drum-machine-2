import React, { useState } from "react";

function Drumpad({ /*drumObj,*/ drum, displayHandler, volume/*, audioCtx, gainNode, destination, recorder,*/, handlePlaySound }){

    const [active, setActive] = useState(false);
    const activeStyle = {
        "backgroundColor": "red",
        "borderColor": "rgba(255,10,10,1)"
    };


    const handleKeypress = (e) => {

        if (e.keyCode === drum.keycode) {
            playClip();
            //handlePlaySound();
            //setActive(true);
            //setTimeout(()=>setActive(false), 200);
            //handlePlaySound();
        }
        
    };

    
    React.useEffect(() => {
        document.addEventListener("keydown", handleKeypress);
        return () => {
            document.removeEventListener("keydown", handleKeypress);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [volume]); 

    

    
    

    const playClip = (e) => {
        console.log(e);
        displayHandler(drum.label);
        setActive(true);
        setTimeout(()=>setActive(false), 200);
        const sound = document.getElementById(drum.id);
        handlePlaySound(sound);
        
        //console.log(sound);
        //sound.currentTime = 0;
        
        //sound.play();
        /*
        let source = audioCtx.createMediaElementSource(sound);
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        gainNode.connect(destination);*/
    };


    return(
        <div className="drum-pad-container" id={drum.label} onClick={playClip}>
            <div className={`drum-pad`} id={drum.pad} style={ active ? activeStyle:{}}>
                {drum.id}
                <audio src={drum.src} id={drum.id} className="clip"></audio>    
            </div>
            <div className="row">
                <div>PAD {drum.pad}</div>
                <div>KEY {drum.id}</div>
            </div>
            
        </div>
    );
}

export default Drumpad;