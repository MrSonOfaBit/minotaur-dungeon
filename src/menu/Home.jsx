import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Level from '../game/Levels/Level';
import data from '../game/data'
import { reset } from '../game/GameFunctions'
import { mazeGen } from '../game/FieldMatrix';
import { Background, Options } from '../game/Elements';
import { addPlayAchv } from '../game/AddAchievements';

import fireBg from '../pics/menuPics/fireBg.gif'

const Home = () => {
    return(
	    <div
        tabIndex={0}
        >
            <Menu />
        </div>
    )
}

const Menu = (props) =>{
    const [open,setOpen] = useState(true)

    return(
        <div className='menuDiv'
        style={{
            height: `$100vh`,
            width: `${props.width}vh`,
            background: "url(" + fireBg + ") no-repeat",
            backgroundSize: '100% 100%',
            zIndex: 0,
        }}
        >
            <div className='menuContent'>
                <Background/>
                <div style={{position: 'absolute',
                    top: '10%',
                    left: '31%',
                    fontSize: 50,
                    zIndex: 0,
                    textShadow: ' 2px 0px 2px rgba(255, 255, 255, 0.8)',
                    WebkitBackgroundClip: 'text',
                    MozBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    backgroundColor: 'black'
            }}>
                Minotaur Dungeon 
                </div>
            </div>
            <StartScreen/>
        </div>
    )
}

const StartScreen = (props) =>{
    const [start, setStart] = useState(data["game"]["start"])
    const [newLv, setNewLv] = useState()

    useEffect(()=>{
        data["game"]["maze"] = mazeGen()
        setNewLv(x=>x+1)
        console.log("new level!", newLv)
    },[data["game"]["selected lv"]])

    return (
        <div className='startScreenDiv'
        tabIndex={0}
        >
            {start === true &&
            <div style={{position: 'absolute',left: '2%', top: '4.5%', backgroundColor: '#00000078',color: 'white', width: '10%', borderRadius: '10px', /* boxShadow: '0px 0px 10px 10px #00000078' */}}>
                <Button sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1,}}
                onClick={()=> {
                    setStart(x=>!x)
                    reset()
                    data["game"]["start"] = false
                    }}>
                    Quit 
                </Button>
            </div>
            }
            {start === true &&
            <div style={{position: 'absolute',left: '15%', top: '4.5%', backgroundColor: '#00000078',color: 'white', width: '10%', borderRadius: '10px', /* boxShadow: '0px 0px 10px 10px #00000078' */}}>
                <Button sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1,}}
                onClick={()=> {
                    switch(data["game"]["selected lv"]){
                        case 1: data["game"]["selected lv"] = 2
                        break
                        case 2: data["game"]["selected lv"] = 3
                        break
                        case 3: data["game"]["selected lv"] = 1
                        break
                    }
                    setStart(x=>!x)
                    reset()
                    data["game"]["start"] = false
                    }}>
                    Next Level
                </Button>
            </div>
            }


            {start === false && <Options/>}
            {start === false && <WelcomeUser/>}
            {start === false? 
            <div className='startButtonDiv'>
                <Button
                onClick={()=>{
                    setStart(x=>!x)
                    addPlayAchv()
                    data["game"]["start"] = true
                }}
                sx={{
                       fontFamily: "'Wonder Boy In Monster World', sans-serif",
                       color: 'white',
                       fontSize: 30,
                       height: '100%',
                       width: '100%',
                       background: "url(" + `${data["game"]["level"][data["game"]["selected lv"]]["background"]}` +") no-repeat center",
                    }}
                >Play!
                </Button>
            </div>
            :     
            <Level/>
            }
        </div>
    )
}

export default Home


const WelcomeUser = () =>{
    const [test,setTest] = useState(false)

    useEffect(() => {
        const interval = setInterval(() =>setTest(x=>x+1),100);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            {data["player"]["logged"]["status"] && <p>Welcome {data["player"]["logged"]["name"]}</p>}        
        </div>
    )
}