import React from "react";


function Display(props){

    

    
    
/*
    const mouseDown = () => {
        
    };
  */  
    return (
        <div id="display-container">
            <div id="display">
                <div className="line">
                    <span>VOLUME</span>
                    <span>{Math.round(props.volume * 100)}%</span>
                </div>
                <div className="line">
                    <span>DRUM</span>
                    <span>{props.value.toUpperCase()}</span>
                </div>
                <div className="line">
                    <span>RECORDING</span>
                    <span>{props.rec ? "ON" : "OFF"}</span>
                </div>
                <div className="line">
                    <span>TRACK</span>
                    <span>{props.track}/{props.records ? props.records.length:0}</span>
                </div>
                
            </div>
            
            
        </div>
    );
}

export default Display;