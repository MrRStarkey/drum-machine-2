import React, { useState } from "react";
import Tappable from 'react-tappable';

function Drumpad({ drum, displayHandler, volume, handlePlaySound }){

    const [active, setActive] = useState(false);
    const activeStyle = {
        "backgroundColor": "red",
        "borderColor": "rgba(255,10,10,1)"
    };


    const handleKeypress = (e) => {

        if (e.keyCode === drum.keycode) {
            playClip();  
        }
    };

    
    React.useEffect(() => {
        document.addEventListener("keydown", handleKeypress);
        return () => {
            document.removeEventListener("keydown", handleKeypress);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [volume]); 

    

    
    

    const playClip = () => {
        
        displayHandler(drum.label);
        setActive(true);
        setTimeout(()=>setActive(false), 200);
        let sound = document.getElementById(drum.id);
        handlePlaySound(sound);
        
    };


    return(
        <div className="drum-pad-container" id={drum.label}>
            <Tappable className={`drum-pad`} id={drum.pad} style={ active ? activeStyle:{}} onTap={playClip}>
                {drum.id}
                <audio src={drum.src} id={drum.id} className="clip"></audio>    
            </Tappable>
            <div className="row">
                <div>PAD {drum.pad}</div>
                <div>KEY {drum.id}</div>
            </div>            
        </div>
    );
}

export default Drumpad;