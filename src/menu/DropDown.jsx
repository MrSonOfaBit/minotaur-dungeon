import React, { useState} from 'react'
import { Button } from '@mui/material'
import Player from '../music/Player';
import banner from '../pics/menuPics/banner.png'

const Dropdown = (props) => {
    return (
        <div>
            <DropdownMenu/>
        </div>
    )
}

const DropdownMenu = (props) =>{
    const [open,setOpen] = useState("")

    function defineContent(x){
        console.log(open !== "")
        if( open !== ""){
            if(open["type"]["name"] === x) x = ""
        }
        switch (x) {
            case "Options":
                setOpen(<Options/>)
                break;
            case "Rules":
                setOpen(<Rules/>)
                break;
            case "Credits":
                setOpen(<Credits/>)
                break;
            case "Feedback":
                setOpen(<Feedback/>)
                break;
            default:
                setOpen("")
                break;
        }
    }

    const Buttons = (props) =>{
        return(
            <div>
                <Button sx={{
                       fontFamily: "'Wonder Boy In Monster World', sans-serif",
                       color: 'white',
                       fontSize: 25,
                       height: '100%',
                       width: '100%'
                }}
                onClick={()=>defineContent(props.name)}>
                {props.name}
                </Button>
            </div>
        )
    }

    const buttonElements = [["Options"],["Rules"],["Credits"],["Feedback"]].map(
        x=>{
        return <Buttons name={x[0]}/>
    })

    /* Menu Content */

    const Options = () =>{
        const [condition, setCondition] = useState([false,false,false])

        return(
            <div>
                <div>
                    <Button sx={{
                        color:'white',
                        fontFamily: "'Wonder Boy In Monster World', sans-serif",
                        position: 'absolute',
                        left: '0%',
                        top: '0%'
                }}
                onClick={()=>setOpen("")}>X</Button>
                </div>
                <p>Options</p>
                <br></br>
                <div>
                    <Button onClick={()=> setCondition([!condition[0], false, false])}
                     sx={{color:'white',fontFamily: "'Wonder Boy In Monster World', sans-serif",}}>
                        Music
                    </Button>
                    {condition[0] && <Music/>}
                </div>
                <br></br>
                <div>
                    <Button onClick={()=>setCondition([false, !condition[1], false])}
                    sx={{color:'white',fontFamily: "'Wonder Boy In Monster World', sans-serif",}}>
                    Character
                    </Button>
                    {condition[1] && <Character/>}
                </div>
                <br></br>
                <div>
                    <Button onClick={()=> setCondition([false, false, !condition[2]])}
                    sx={{color:'white',fontFamily: "'Wonder Boy In Monster World', sans-serif",}}>
                        Difficulty
                    </Button>
                    {condition[2] && <Difficulty/>}
                </div>
            </div>
        )
    }
    
    const Rules = () =>{
        return(
            <div>
                <div>
                    <Button sx={{
                        color:'white',
                        fontFamily: "'Wonder Boy In Monster World', sans-serif",
                        position: 'absolute',
                        left: '0%',
                        top: '0%'
                }}
                onClick={()=>setOpen("")}>X</Button>
                </div>
                <p>Game Rules</p>
                <br></br>
                <p>The Game is based on turns</p>
                <p>After you did a move, the enemy moves</p>
                <p></p>
                <br></br>
                <p>Goal: Collect all keys to open the gate</p>
                <br></br>
                <p>Moving: click the field in your area to move</p>
                <br></br>
                <p>Attack: When weapon is selected, click on enemy to attack</p>
                <br></br>
                <p>Item: You can only have one Item, the old one respawns</p>
                <p></p>
            </div>
        )
    } 
    
    const Credits = () =>{
        return(
            <div>
                <div>
                    <Button sx={{
                        color:'white',
                        fontFamily: "'Wonder Boy In Monster World', sans-serif",
                        position: 'absolute',
                        left: '0%',
                        top: '0%'
                }}
                onClick={()=>setOpen("")}>X</Button>
                </div>
                <p>Credits</p>
                <p>This game is still in work and not ready yet.</p>
                <br></br>
                <p>- Created by Oliver S</p>
                <p>- Idea: Lukas J</p>
                <p>- Framework: React</p>
                <p>- Started developing: 07.06.2022</p>
                <p>
                    <a style={{color: 'white', textDecoration: 'none'}} href='https://xdeviruchi.itch.io/8-bit-fantasy-adventure-music-pack'>
                    - Music used 
                    </a>
                </p>
            </div>
        )
    } 
    
    const Feedback = () =>{
        return(
            <div>
                <div>
                    <Button sx={{
                        color:'white',
                        fontFamily: "'Wonder Boy In Monster World', sans-serif",
                        position: 'absolute',
                        left: '0%',
                        top: '0%'
                }}
                onClick={()=>setOpen("")}>X</Button>
                </div>
                <p>Feedback</p>
                <br></br>
                <form>
                    <input style={{fontFamily: "'Wonder Boy In Monster World', sans-serif"}} placeholder='Type...'></input>
                </form>
                <Button type='submit' sx={{color:'white',fontFamily: "'Wonder Boy In Monster World', sans-serif",}}>
                    Send
                </Button>
            </div>
        )
    }

    return(
        <div className='gameMenu-div'>
                <div className='game-MenuOptions'>
                    {/* {buttonElements} */}
                    <div className='gameMenu-content'>
                    <div style={{
                    position: 'absolute',
                    background: "url(" + banner + ") no-repeat",
                    backgroundSize: '100% 100%',
                    height: '40%',
                    width: '20%',
                    zIndex: -1,
                    opacity: '50%',
                    bottom: '87%',
                    left: '40%'

                }}
                ></div>
                        {/* {open} */}
                    </div>
                </div>
        </div>
    )
}

const Music = () =>{
    return(
        <div className='options-music'>
            <Player/>
        </div>
    )
}
const Character = () =>{
    return(
        <div className='options-character'>
            <div className='knight'></div>
        </div>
    )
}
const Difficulty = () =>{
    return(
        <div>
            <div>
                <Button sx={{color:'white',fontFamily: "'Wonder Boy In Monster World', sans-serif",}}>
                    Easy
                </Button>
            </div>
            <div>
                <Button sx={{color:'white',fontFamily: "'Wonder Boy In Monster World', sans-serif",}}>
                    Normal
                </Button>
            </div>
            <div>
                <Button sx={{color:'white',fontFamily: "'Wonder Boy In Monster World', sans-serif",}}>
                    Hard
                </Button>
            </div>
        </div>
    )
}
export default Dropdown