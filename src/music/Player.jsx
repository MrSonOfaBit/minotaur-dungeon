import React, { useState } from 'react'
import song from "../music/mainTheme.mp3";

const Player = () => {

    const [audio, setAudio] = useState(new Audio(song))
    const [playing, setplaying] = useState(false)

    const playPause =() =>{
        playing ? audio.pause()
        :
        audio.play()
        setplaying(x=>!x)
    }
        
    
    return (
        <div className='player'>
            <p>
                {playing? "Is playing" : "Is paused"}
            </p>
            <button onClick={()=>playPause()}>
            Play | Pause
            </button>
        </div>
  )
}

export default Player