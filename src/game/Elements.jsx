import React, {useState, useEffect} from 'react'

import data from '../game/data'

import { Button } from '@mui/material'
import { reset } from '../game/GameFunctions'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {IoIosHeartHalf} from 'react-icons/io'
import { DisplayAchievements } from './Elements/achievements';
import {Login, Signup} from '../menu/register';

import { addDiedAchv, addWinAchv, addDifficultyAchv, addOptionAchv } from './AddAchievements'; 

import gem from '../pics/gamePics/gem.gif'
import bigGem from '../pics/gamePics/bigGem.gif'
import potion from '../pics/gamePics/potion.png'
import { displayInventoryItems, displayItemInfo, displayEffectInfo, setItemMessage, selectDesign, displayCurse} from '../game/GameFunctions'
import gemC from '../pics/gamePics/gemC.png'
import trader from '../pics/gamePics/trader.gif'
import specialLigth from '../pics/gamePics/specialEffect.gif'
import poisoned from '../pics/gamePics/poisoned.gif'
import burned from '../pics/gamePics/burned.gif'
import frozen from '../pics/gamePics/frozen.gif'
import gear from '../pics/menuPics/gear.png'

import bluePotion from '../pics/gamePics/bluePotion.png'
import redPotion from '../pics/gamePics/redPotion.png'
import purplePotion from '../pics/gamePics/purplePotion.png'
import yellowPotion from '../pics/gamePics/yellowPotion.png'
import pinkPotion from '../pics/gamePics/pinkPotion.png'
import orangePotion from '../pics/gamePics/potion.png'
import character from "../pics/menuPics/knight.gif"
import inventory from "../pics/gamePics/inventory.png"
import banner from '../pics/menuPics/banner.png'


export const Gem = (props) =>{
    return(
        <div style={{opacity: `100%`, position: 'absolute',
                    background: "url(" + `${gem}` + ")no-repeat center",
                    zIndex: 0,
                    backgroundSize: '100% 100%',
                    height: '80%',
                    width: '100%',}}>
         </div>
    )
}

export const BigGem = (props) =>{
    return(
        <div style={{opacity: `100%`, position: 'absolute',
                    background: "url(" + `${bigGem}` + ")no-repeat center",
                    zIndex: 0,
                    backgroundSize: '100% 100%',
                    height: '80%',
                    width: '80%',
                    left: "5px",
                    top: "5px",
                    }}>
         </div>
    )
}

export const Sword = (props) =>{
    return(
        <div style={{opacity: `${props.opacity}%`, position: 'absolute',
                    background: "url(" + `${selectDesign("sword")}` + ")no-repeat center",
                    zIndex: 0,
                    backgroundSize: '100% 100%',
                    height: '100%',
                    width: '100%',}}></div>
    )
}

export const Shield = (props) =>{
    return(
        <div style={{opacity: `${props.opacity}%`, position: 'absolute',
                    background: "url(" + `${selectDesign("shield")}` + ")no-repeat center",
                    zIndex: 0,
                    backgroundSize: '100% 100%',
                    height: '100%',
                    width: '100%',}}></div>
    )
}

export const Potion = (props) =>{
    return(
        <div style={{opacity: `${props.opacity}%`, position: 'absolute',
                    background: "url(" + `${potion}` + ")no-repeat center",
                    zIndex: 0,
                    backgroundSize: '100% 100%',
                    height: '100%',
                    width: '100%',}}></div>
    )
}

export const GameEndButton = (props) =>{
    return(
        <div style={{position: 'absolute',left: '0%', top: '30px', backgroundColor: '#00000078',color: 'white', width: '100%', borderRadius: '10px', boxShadow: '0px 0px 10px 10px #00000078'}}>   
                        <Button sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1,}}
                    onClick={()=> reset()}>
                        {props.option}
                        </Button>
                    </div>
      )
}
  
export const Gameend = (props) =>{
      data["game"]["gamePause"] = true

      if(props.end !== "Game Over!"){
        addWinAchv()
        addDifficultyAchv(data["game"]["difficulty"])
      }else{
        addDiedAchv()
      }

    return(
        <div className='gameEnd'
        onClick={()=>{
            reset()
        }}
        >
            <div className='gameEndText'>
                {props.end}

                {props.end === "Game Over!" ?
                    <GameEndButton option={"Restart"} continue={"false"}/>
                    :
                    <GameEndButton option={"Restart"} continue={"Next Level"}/>
                }
            </div>
        </div>
    )
}

export const Player = () =>{
    return(
        <div className='game-player'>
        </div>
    )
}
  
export const Minotaur = () =>{
  
    return(
        <div className='game-minotaurDiv'>
            <div style={{
              background: "url(" + data["minotaur"]["type"][ data["game"]["selected lv"] ] + ") no-repeat",
              backgroundSize: '100% 100%',
              height: '50px',
              width: '50px',
              zIndex: 1,
              }}></div>
        </div>
    )
}

export const returnLifes = () =>{
    switch (true) {
        case data["player"]["health"] ===  120: return <p style={{zIndex: 1}}>
                            <FavoriteIcon sx={{color: 'red'}}/>
                            <FavoriteIcon sx={{color: 'red'}}/>
                            <FavoriteIcon sx={{color: 'red'}}/>
                        </p>
        case data["player"]["health"] >=  81: return <p>
                            <FavoriteIcon sx={{color: 'red'}}/>
                            <FavoriteIcon sx={{color: 'red'}}/>
                            <IoIosHeartHalf color='red' size={23}/>
                        </p>
        case data["player"]["health"] ===  80: return <p style={{zIndex: 1}}>
                            <FavoriteIcon sx={{color: 'red'}}/>
                            <FavoriteIcon sx={{color: 'red'}}/>
                            <FavoriteBorderOutlinedIcon sx={{color: 'red'}}/>
                        </p>

        
        case data["player"]["health"] >=  41: return <p style={{zIndex: 1}}>
                            <FavoriteIcon sx={{color: 'red'}}/>
                            <IoIosHeartHalf color='red' size={23}/>
                            <FavoriteBorderOutlinedIcon sx={{color: 'red'}}/>
                        </p>

        case data["player"]["health"] === 40: return <p style={{zIndex: 1}}>
                        <FavoriteIcon sx={{color: 'red'}}/>
                        <FavoriteBorderOutlinedIcon sx={{color: 'red'}}/>
                        <FavoriteBorderOutlinedIcon sx={{color: 'red'}}/>
                        </p>

        case data["player"]["health"] >=  1: return <p style={{zIndex: 1}}>
                            <IoIosHeartHalf color='red' size={23}/>
                            <FavoriteBorderOutlinedIcon sx={{color: 'red'}}/>
                            <FavoriteBorderOutlinedIcon sx={{color: 'red'}}/>
                        </p>

        default:  return <p style={{zIndex: 1}}>
                        <FavoriteBorderOutlinedIcon sx={{color: 'red'}}/>
                        <FavoriteBorderOutlinedIcon sx={{color: 'red'}}/>
                        <FavoriteBorderOutlinedIcon sx={{color: 'red'}}/>
                    </p>
    }
}

export const Shop = () =>{
    const [bubble,setBubble] = useState("Hello stranger,if you have the right amount of gems I will share my values with you")
    const [word,setWord] = useState()

    useEffect(()=>{
        setWord(bubble)
    },[bubble])

    const [item,setItem] = useState([])
    const answers = ["Thank you! Farewell stranger", 
    "A good choice! Till next time", 
    "It shall be yours! Good luck with that", 
    "Here you go, anything else?"
]
    function buyItem(x){
        
        if(item){
            switch(x){
                case "aqua": 
                    if(data["player"]["gems"] >= 10){
                        data["player"]["gems"] -= 10
                        data["player"]["inventory"]["aqua"]["list"].push(bluePotion)
                        setBubble(answers[Math.floor(Math.random() * answers.length)])
                    }
                break
                case "potentia":
                    if(data["player"]["gems"] >= 20){
                        data["player"]["gems"] -= 20
                        data["player"]["inventory"]["potentia"].push(redPotion)
                        setBubble(answers[Math.floor(Math.random() * answers.length)])
                    }
                    break
                case "antidotum":
                    if(data["player"]["gems"] >= 10){
                        data["player"]["gems"] -= 10
                        data["player"]["inventory"]["antidotum"].push(purplePotion)
                        setBubble(answers[Math.floor(Math.random() * answers.length)])
                    }
                    break
                case "ventus":
                    if(data["player"]["gems"] >= 20){
                        data["player"]["gems"] -= 20
                        data["player"]["inventory"]["ventus"].push(yellowPotion)
                        setBubble(answers[Math.floor(Math.random() * answers.length)])
                    }
                    break
                case "armis":
                    if(data["player"]["gems"] >= 20){
                        data["player"]["gems"] -= 20
                        data["player"]["inventory"]["armis"].push(pinkPotion)
                        setBubble(answers[Math.floor(Math.random() * answers.length)])
                    }
                    break
                case "vita":
                    if(data["player"]["gems"] >= 10){
                        data["player"]["gems"] -= 10
                        data["player"]["inventory"]["vita"].push(orangePotion)
                        setBubble(answers[Math.floor(Math.random() * answers.length)])
                    }
                    break
            }
        }

    }
    return(
        <div className='game-shop'>
            Mysterious Shop
            <div style={{
                position: "absolute",
                height: "300px",
                width: "300px",
                background: "url(" + trader + ") no-repeat",
                backgroundSize: "100% 100%",
                left: "5%",
                zIndex: 0,
            }}>
            </div>
            <div style={{position: "absolute", left: "50%", top: "15%", textAlign: "left", fontSize: 12}}>
                    {word}
            </div>

            <div className='game-shopInventory'>
                <div style={{position: "absolute", left: "5%", top:"3%", height: "45px", width: "35px", background: "url("+gemC+") no-repeat", backgroundSize: "100% 100%", zIndex: 1}}></div>
                <div style={{position: "absolute", left: "12%", top:"7%", height: "45px", width: "50px",}}>
                    :{data["player"]["gems"]}
                </div>

                <div style={{position: "absolute", left: "30%", top:"3%", height: "45px", width: "50px",}}>
                     {item[1]}
                </div>
                <Button sx={{position: "absolute", top: "5%", right: "22%", color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1,}}
                onClick={()=>buyItem(item[0])}
                >
                    Buy
                </Button>
                <div className='game-shopInventory-items'>
                    <Button style={{position: "absolute", height: "50px", width: "50px", margin: 0, padding: 0,top: "20%", left: "6%", background: "url("+bluePotion+") no-repeat",backgroundSize: "65% 100%"}}
                    onClick={()=>{
                        setItem(["aqua",<div style={{position: "absolute", height: "50px", width: "50px", margin: 0, padding: 0,top: "0%", left: "2%", background: "url("+bluePotion+") no-repeat",backgroundSize: "65% 100%"}}></div>])
                        setBubble("The aqua potion, it may be usefull for deep waters... Costs 10 gems"
                        )
                    }}
                    >

                    </Button>
                    <Button style={{position: "absolute", height: "50px", width: "50px", margin: 0, padding: 0,top: "20%", left: "18.5%", background: "url("+redPotion+") no-repeat",backgroundSize: "58% 100%"}}
                    onClick={()=>{
                        setItem(["potentia",<div style={{position: "absolute", height: "50px", width: "50px", margin: 0, padding: 0,top: "0%", left: "2%", background: "url("+redPotion+") no-repeat",backgroundSize: "58% 100%"}}></div>])
                        setBubble("The potentia potion, it lends you true power! Costs 20 gems")
                    }}
                    >

                    </Button>
                    <Button style={{position: "absolute", height: "50px", width: "50px", margin: 0, padding: 0,top: "20%", left: "31%", background: "url("+purplePotion+") no-repeat",backgroundSize: "60% 100%"}}
                    onClick={()=>{
                        setItem(["antidotum",<div style={{position: "absolute", height: "50px", width: "50px", margin: 0, padding: 0,top: "0%", left: "2%",background: "url("+purplePotion+") no-repeat",backgroundSize: "60% 100%"}}></div>])
                        setBubble("The antidotum potion, helps you with bad curses. Costs 10 gems")
                    }}
                    >

                    </Button>
                    <Button style={{position: "absolute", height: "50px", width: "50px", margin: 0, padding: 0,top: "20%", left: "45%", background: "url("+yellowPotion+") no-repeat",backgroundSize: "40% 100%"}}
                    onClick={()=>{
                        setItem(["ventus",<div style={{position: "absolute", height: "50px", width: "50px", margin: 0, padding: 0,top: "0%", left: "2%", background: "url("+yellowPotion+") no-repeat",backgroundSize: "40% 100%"}}></div>])
                        setBubble("The ventus potion, you will be fast as the wind! Costs 20 gems")
                    }}
                    >

                    </Button>
                    <Button style={{position: "absolute", height: "50px", width: "50px", margin: 0, padding: 0,top: "20%", left: "56%", background: "url("+pinkPotion+") no-repeat",backgroundSize: "60% 100%"}}
                    onClick={()=>{
                        setItem(["armis",<div style={{position: "absolute", height: "50px", width: "50px", margin: 0, padding: 0,top: "0%", left: "2%", background: "url("+pinkPotion+") no-repeat",backgroundSize: "60% 100%"}}></div>])
                        setBubble("The armis potion, makes your defense stronger. Costs 20 gems")
                    }}
                    >

                    </Button>
                    <Button style={{position: "absolute", height: "50px", width: "50px", margin: 0, padding: 0,top: "20%", left: "65%", background: "url("+orangePotion+") no-repeat",backgroundSize: "100% 100%"}}
                    onClick={()=>{
                        setItem(["vita",<div style={{position: "absolute", height: "50px", width: "50px", margin: 0, padding: 0,top: "0%", left: "2%", background: "url("+orangePotion+") no-repeat",backgroundSize: "100% 100%"}}></div>])
                        setBubble("The vita potion, heals your wounds and maybe mental illness too... Costs 10 gems")
                    }}
                    >

                    </Button>
                </div>
            </div>
        </div>
    )
}

export const Inventory = () =>{             
    const [text,setText] = useState("")

    
    const effects = data["player"]["currentItemUse"].map(x=>{
        return <p style={{fontSize: 11}}>{displayEffectInfo(x)}</p>
    })
    return(
        <div className='game-playerInventory'>
            <div style={{
                position: "absolute",
                height: "300px",
                width: "300px",
                top: "-10%",
                left: "0%",
                background: "url("+character+") no-repeat",
                backgroundSize: "100% 100%",
            }}>
            
            { data["player"]["currentItemUse"].length > 0 && <div style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                top: "50%",
                left: "17%",
                background: "url("+specialLigth+") no-repeat",
                backgroundSize: "50% 50%"
            }}></div>}


            </div>
                Inventory
                <div style={{position: "absolute", right: "0%"}}>Effects
                    {effects}
                    {data["player"]["poison"] && <p style={{fontSize: 11}}>Poisoned! Health -33% <br/> Defense -10%</p>}
                    {data["player"]["frozen"] && <p style={{fontSize: 11}}>Frozen! Health -33% <br/> Hitrate -10%</p>}
                    {data["player"]["burned"] && <p style={{fontSize: 11}}>Burned! Health -33% <br/> Attack -10%</p>}

                </div>
                <div style={{position: "absolute", bottom: "42%", right: "5%", width: "50%"}}>
                    <p>{displayItemInfo(data["player"]["itemMessage"])}</p>
                </div>

            <Bag/>
        </div>
    )
}

export const Torch = () =>{
    return(
        <div style={{position: 'absolute',
                    background: "url(" + `${selectDesign("torch")}` + ")no-repeat center",
                    zIndex: 0,
                    backgroundSize: '100% 100%',
                    height: '100%',
                    width: '100%',
                    top: '-10%',
                }}></div>
    )
}

export const Poisoned = () =>{
    return (
        <div style={{
            position: 'absolute',
            background: "url(" + poisoned + ") no-repeat",
            backgroundSize: '100% 100%',
            height: '250%',
            width: '50%',
            bottom: '-30%',
            left: '23%',
            zIndex: 0,
        }}>

        </div>
    )
}

export const Burned = () =>{
    return (
        <div style={{
            position: 'absolute',
            background: "url(" + burned + ") no-repeat",
            backgroundSize: '100% 100%',
            height: '250%',
            width: '50%',
            bottom: '-60%',
            left: '25%',
            zIndex: 0,
        }}>

        </div>
    )
}

export const Frozen = () =>{
    return (
        <div style={{
            position: 'absolute',
            background: "url(" + frozen + ") no-repeat",
            backgroundSize: '100% 100%',
            height: '250%',
            width: '50%',
            bottom: '-40%',
            left: '23%',
            zIndex: 0,
        }}>

        </div>
    )
}

export const Bag = () =>{
    return (
        <div style={{
            position: "absolute",
            height: "400px",
            width: "500px",
            bottom: "-35%",
            background: "url("+inventory+") no-repeat",
            backgroundSize: "100% 100%"
        }}>
            <div style={{position: 'absolute', bottom: "50%", height: "30%", width: "100%"}}>

                {/* Potions */}

                <div style={{position: 'absolute',top: "0%", left: "7%"}}>{displayInventoryItems("aqua")}</div>
                <p style={{color: "black", position: "absolute",top:  "-15%", left: "14%"}}>
                    {data["player"]["inventory"]["aqua"]["list"].length > 1 ? data["player"]["inventory"]["aqua"]["list"].length : ""}
                </p>

                <div style={{position: 'absolute',top: "0%", left: "19.5%"}}>{displayInventoryItems("potentia")}</div>
                <p style={{color: "black", position: "absolute",top:  "-15%", left: "26%"}}>
                    {data["player"]["inventory"]["potentia"].length > 1 ? data["player"]["inventory"]["potentia"].length : ""}
                </p>

                <div style={{position: 'absolute',top: "0%", left: "31.5%"}}>{displayInventoryItems("antidotum")}</div>
                <p style={{color: "black", position: "absolute",top:  "-15%", left: "38.5%"}}>
                    {data["player"]["inventory"]["antidotum"].length > 1 ? data["player"]["inventory"]["antidotum"].length : ""}
                </p>

                <div style={{position: 'absolute',top: "0%", left: "45%"}}>{displayInventoryItems("ventus")}</div>
                <p style={{color: "black", position: "absolute",top:  "-15%", left: "51%"}}>
                    {data["player"]["inventory"]["ventus"].length > 1 ? data["player"]["inventory"]["ventus"].length : ""}
                </p>

                <div style={{position: 'absolute',top: "2%", left: "56%"}}>{displayInventoryItems("armis")}</div>
                <p style={{color: "black", position: "absolute",top:  "-15%", left: "63%"}}>
                    {data["player"]["inventory"]["armis"].length > 1 ? data["player"]["inventory"]["armis"].length : ""}
                </p>

                <div style={{position: 'absolute',top: "0%", left: "66%"}}>{displayInventoryItems("vita")}</div>
                <p style={{color: "black", position: "absolute",top:  "-15%", left: "75%"}}>
                    {data["player"]["inventory"]["vita"].length > 1 ? data["player"]["inventory"]["vita"].length : ""}
                </p>

                {/* Weapons */}
                {data["player"]["itemPic"] !== "none" && 
                <div style={{position: 'absolute',top: "53%", left: "5%"}}>
                    <Button style={{height: "55px",width: "30px", background: "url("+data["player"]["itemPic"]+") no-repeat",backgroundSize: "100% 100%"}}
    onClick={() => setItemMessage(data["player"]["item"] === "Sword" ? 7 : 8)}></Button>
                </div>
                }
            </div>
        </div>
    )
}

export const EffectsField = () =>{
    const effects = data["player"]["currentItemUse"].map(x=>{
        return <p style={{fontSize: 11}}>{displayEffectInfo(x)}</p>
    })

    return (
        <div className='fight-effects'>
            Effects
            {data["player"]["poison"] && <p style={{fontSize: 11}}>Poisoned! Health -40%</p>}
            {effects}
        </div>
    )
}

export const Ok = () =>{
    function endTheFight(){
        data["game"]["fight"] = false
        data["game"]["gamePause"] = false
        data["game"]["gameEnd"] = false
        data["game"]["fightEnd"] = false
        data["game"]["fightNote"] = ""
        
        if(data["player"]["health"] < 50 && data["minotaur"]["health"] <= 0)
            data["player"]["health"] = 50

        data["minotaur"]["health"] = 100
    }
    return(
            <Button sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1}}
                    onClick={()=> endTheFight()}>
                    End
            </Button> 
    )
}

export const MessageField = () =>{
    return (
        <div className='fight-message'>
            <br/>
            {data["game"]["fightNote"]}
            <br/>
            {data["game"]["fightEnd"] && <Ok/>}
        </div>
    )
}

export const Background = () =>{
    return(
        <div className='gameMenu-div'>
                <div className='game-MenuOptions'>
                    <div className='gameMenu-content'>
                        <div style={{
                        position: 'absolute',
                        background: "url(" + banner + ") no-repeat",
                        backgroundSize: '100% 100%',
                        boxShadow: 'inset 0px 0px 30px 30px rgba(0,0,0,9)',
                        height: '40%',
                        width: '20%',
                        zIndex: -1,
                        opacity: '50%',
                        bottom: '87%',
                        left: '40%'

                    }}>
                        </div>   
                    </div>
                </div>
        </div>
    )
}

export const Options = (props) =>{
    const [open,setOpen] = useState(false)

    return (
        <div className='options'> 
            <div>
                <Button sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1}}
                onClick={() => {
                    setOpen(x=>!x)
                    addOptionAchv()
                    }}>
                    <img style={{width: '50px', height: '50px'}} alt="" src={gear}/>
                </Button>
                {open && <OptionField/>}

            </div>
        </div>
    )
}


/* Game Option Elements*/

const OptionField = () =>{
    const [openOption, setOpenOption] = useState(false)

    const [rules, setRules] = useState(false)
    const [difficulty, setDifficulty] = useState(false)
    const [achievements, setAchievements] = useState(false)
    const [feedback, setFeedback] = useState(false)
    const [credits, setCredits] = useState(false)
    const [login, setLogin] = useState(false)

    const OptionButtons = () =>{
        return (
            <div>
                <Button sx={{position: 'absolute',top: '18%', color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1, opacity: '90%',left: '0%', textShadow: '5px 5px 5px black'}}
                onClick={()=>{
                    setOpenOption(x=>!x)
                    setRules(x=>!x)
                }}>
                    Rules
                </Button>
    
                <br/>
                <Button sx={{position: 'absolute',top: '28%', color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1, opacity: '90%',left: '0%', textShadow: '5px 5px 5px black'}}
                onClick={()=>{
                    setOpenOption(x=>!x)
                    setDifficulty(x=>!x)
                }}>
                    Difficulty
                </Button>
    
                <br/>
                <Button sx={{position: 'absolute',top: '38%', color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1, opacity: '90%',left: '0%', textShadow: '5px 5px 5px black'}}
                onClick={()=>{
                    setOpenOption(x=>!x)
                    setAchievements(x=>!x)
                }}>
                    Achievements
                </Button>
    
                <br/>
                <Button sx={{position: 'absolute',top: '48%', color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1, opacity: '90%',left: '0%', textShadow: '5px 5px 5px black'}}
                onClick={()=>{
                    setOpenOption(x=>!x)
                    setFeedback(x=>!x)
                }}>
                    Feedback
                </Button>
    
                <br/>
                <Button sx={{position: 'absolute',top: '58%', color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1, opacity: '90%',left: '0%', textShadow: '5px 5px 5px black'}}
                onClick={()=>{
                    setOpenOption(x=>!x)
                    setCredits(x=>!x)
                }}>
                    Credits
                </Button>
                <br/>
                <Button sx={{position: 'absolute',top: '68%', color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1, opacity: '90%',left: '0%', textShadow: '5px 5px 5px black'}}
                onClick={()=>{
                    setOpenOption(x=>!x)
                    setLogin(x=>!x)
                }}>
                    Login
                </Button>
            </div>
        )
    }
    
    const Rules = () =>{
        return(
            <div>
                <Button sx={{position: 'absolute',top: '10%', color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1, opacity: '90%',left: '0%', textShadow: '5px 5px 5px black'}}
                onClick={()=>{
                    setRules(x=>!x)
                    setOpenOption(x=>!x)
                }}>X</Button>

                <p style={{opacity: '90%'}}>Welcome to the Game</p>
                <br/>
                <p style={{opacity: '90%', fontSize: '80%'}}>Your Goal is to escape the Dungeon</p>
                <br/>
                <p style={{opacity: '90%', fontSize: '80%'}}>Collect 8 Keys and go to the Gate but be aware of the Monster in the Dungeon</p>
                <br/>
                <p style={{opacity: '90%', fontSize: '80%'}}>You can move with wasd or with arrow keys</p>
                <br/>
                <p style={{opacity: '90%', fontSize: '80%'}}>The game is turn based: </p>
                <p style={{opacity: '90%', fontSize: '80%'}}>When you move the enemy does it too. Same goes for the fight </p>

            </div>
        )
    }
    
    const Difficulty = () =>{
        return(
            <div>
                <Button sx={{position: 'absolute',top: '10%', color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1, opacity: '90%',left: '0%', textShadow: '5px 5px 5px black'}}
                onClick={()=>{
                    setDifficulty(x=>!x)
                    setOpenOption(x=>!x)
                }}>X</Button>
                <p style={{opacity: '90%'}}>Difficulty</p>
                <br/>
                <Button sx={{top: '30%',position: 'absolute', color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1, opacity: '90%',left: '40%', textShadow: '5px 5px 5px black'}}
                onClick={()=>{ data["game"]["difficulty"] = 1
                }}>
                    Easy
                </Button>
                <br/>
                <Button sx={{top: '40%',position: 'absolute', color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1, opacity: '90%',left: '40%', textShadow: '5px 5px 5px black'}}
                onClick={()=>{ data["game"]["difficulty"] = 2
                }}>
                    Normal
                </Button>
                <br/>
                <Button sx={{top: '50%',position: 'absolute', color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1, opacity: '90%',left: '40%', textShadow: '5px 5px 5px black'}}
                onClick={()=>{ data["game"]["difficulty"] = 3
                }}>
                    Hard
                </Button>
                <br/>
                <Button sx={{top: '60%',position: 'absolute', color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1, opacity: '90%',left: '40%', textShadow: '5px 5px 5px black'}}
                onClick={()=>{ data["game"]["difficulty"] = 4
                }}>
                    Deathmarch
                </Button>
            </div>
        )
    }
    
    const Achievements = () =>{
        return(
            <div style={{overflow: 'auto', height: '85%', position: 'relative'}}>
                <Button sx={{position: 'absolute',top: '10%', color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1, opacity: '90%',left: '0%', textShadow: '5px 5px 5px black', height: '5%'}}
                onClick={()=>{
                    setAchievements(x=>!x)
                    setOpenOption(x=>!x)
                }}>X</Button>
                <p style={{opacity: '90%'}}>Achievements</p>
                <br/>
                
                <DisplayAchievements/>

            </div>
        )
    }
    
    const Feedback = () =>{
        return(
            <div>
                <Button sx={{position: 'absolute',top: '10%', color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1, opacity: '90%',left: '0%', textShadow: '5px 5px 5px black'}}
                onClick={()=>{
                    setFeedback(x=>!x)
                    setOpenOption(x=>!x)
                }}>X</Button>
                <p style={{opacity: '90%'}}>Feedback</p>
                <br/>
                <form>
                    <input style={{opacity: '80%',color: 'black', fontFamily: "'Wonder Boy In Monster World', sans-serif"}}></input>
                </form>
                <p style={{opacity: '80%'}}>*in progress</p>
            </div>
        )
    }
    
    const Credits = () =>{
        return(
            <div>
                <Button sx={{position: 'absolute',top: '10%', color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1, opacity: '90%',left: '0%', textShadow: '5px 5px 5px black'}}
                onClick={()=>{
                    setCredits(x=>!x)
                    setOpenOption(x=>!x)
                }}>X</Button>
                <p style={{opacity: '90%'}}>Credits</p>
                <br/>
                <p>This game is still in work and not ready yet</p>
                <br></br>
                <p>Created by Oliver S</p>
                <p>Idea: Lukas J</p>
                <p>Framework: React</p>
                <p>Started developing: 07.06.2022</p>
                <br/>
                <p>Special thanks to: <br/> <br/> @SmackTheStack <br/> </p>
            </div>
        )
    }

    const _Login = () =>{
        const [register,setRegister] = useState(true)


        return(
            <div>
                <Button sx={{position: 'absolute',top: '10%', color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1, opacity: '90%',left: '0%', textShadow: '5px 5px 5px black'}}
                onClick={()=>{
                    setLogin(x=>!x)
                    setOpenOption(x=>!x)
                }}>X</Button>
                {register ? <Login/> : <Signup/>}
                
                <Button sx={{position: 'absolute',top: '70%', color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1, opacity: '90%',left: '20%', textShadow: '5px 5px 5px black'}}
                onClick={()=>{
                    setRegister(x=>!x)
                }}>
                    {register ? "Sign Up" : "Log In"}
                </Button>
            </div>
        )
    }

    return(
        <div className='optionField'>
            <p style={{opacity: '90%'}}>Options</p>
            <br/>
            { !openOption && <OptionButtons/>}

            {rules && <Rules/>}
            {difficulty && <Difficulty/>}
            {achievements && <Achievements/>}
            {feedback && <Feedback/>}
            {credits && <Credits/>}
            {login && <_Login/>}
        </div>
    )
}