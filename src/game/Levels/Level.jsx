import React, { useState, useEffect } from 'react'
import data from '../data'

import { Gameend, Shop, Inventory,returnLifes } from '../Elements'
import { handleFightStart, detectEnd, keyInput, displayCurse } from '../GameFunctions'
import { handleAchievements } from '../AddAchievements'

import gemC from '../../pics/gamePics/gemC.png'
import keyCount from '../../pics/gamePics/keyCount.png'
import bag from '../../pics/gamePics/bag.png'
import FieldMatrix from '../FieldMatrix'
import { Button } from '@mui/material'

const Level1 = () => {
    const [test,setTest] = useState(1)
    const [openShop,setOpenShop] = useState(false)
    const [openInventory, setOpenInventory] = useState(false)


    function userKeyInput(x){
        switch(x){
            case "i": setOpenInventory(x=>!x)
            break
            case "Escape": 
                setOpenShop(false)
                setOpenInventory(false)
            break
            case "o":
                setOpenShop(x=>!x)
            break

        }
    }

    useEffect(() => {
        const interval = setInterval(() =>setTest(x=>x+1),10);
        return () => {
            clearInterval(interval);
        };
    }, []);
  return (
    <div className='game-fieldDiv'
    tabIndex={0}
    onKeyDown={(e) => {
        keyInput(e["key"])
        userKeyInput(e["key"])
    }}
    style={{
        background: 'url(' + data["game"]["level"][ data["game"]["selected lv"]]["background"]+ ') no-repeat',
        backgroundSize: '100% 100%',
        position: 'absolute',
    }}>
        {data["player"]["lifes"] === 0 && <Gameend end="Game Over!"/>}
        {data["player"]["health"] <= 0 && <Gameend end="Game Over!"/>}
        {data["game"]["end"] === "win"  && <Gameend end="You Win!"/>}

        {/* Static Element (3 Live's (120 Health)) */}
        <div style={{position: 'relative', top: '3.2%', backgroundColor: '#00000078', width: '10%', margin: 'auto', borderRadius: '10px', boxShadow: '0px 0px 10px 10px #00000078'}}>
            {returnLifes()}
            {displayCurse()}
        </div>


        {/* Static Element (Lv number) */}
        <div style={{position: 'absolute', top: '5.5%', left: '30%', backgroundColor: '#00000078', width: '10%', margin: 'auto', borderRadius: '10px', boxShadow: '0px 0px 10px 10px #00000078'}}>
            Lv: {data["game"]["selected lv"]}
        </div>


        {/* Static Element (Keys) */}
        <div style={{position: 'absolute', top: '4.2%', right: '10%', backgroundColor: '#00000078', width: '8%', margin: 'auto', borderRadius: '10px', boxShadow: '0px 0px 10px 10px #00000078'}}>
            <div>
                <img style={{width: '40px', height: '40px'}} src={keyCount} alt=""></img>
                <p style={{position: 'absolute', top: '0px',right: '17%'}}>{data["player"]["keys"]}</p>
            </div>
        </div>

        {/* Shop Element */}
        <div style={{position: 'absolute', top: '5%', right: '0%', backgroundColor: '#00000078', width: '8%', margin: 'auto', borderRadius: '10px', boxShadow: '0px 0px 10px 10px #00000078'}}>
            <div>
                <Button sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1,}}
                onClick={()=> {
                    if((!openInventory && !openShop) || (openInventory && openShop))
                        setOpenInventory(x=>!x)
                        setOpenShop(x=>!x)
                        data["player"]["itemMessage"] = 0
                    }}>
                    Shop
                </Button>
            </div>
        </div>

        {openShop && <Shop/>}

        {/* Static Element (Bag) */}
        <div style={{position: 'absolute', top: '3%', right: '27%', backgroundColor: '#00000078', width: '15%', margin: 'auto', borderRadius: '10px', boxShadow: '0px 0px 10px 10px #00000078'}}>
            <Button style={{position: "absolute",zIndex: 1, height: "50px", width: "50px", margin: 0, padding: 0,top: "0%", left: "2%", background: "url("+bag+") no-repeat",backgroundSize: "100% 100%"}}
            onClick={()=>{
                setOpenInventory(x=>!x)
                data["player"]["itemMessage"] = 0
                }}>
            </Button>
            { data["player"]["item"] !== "none" && <img style={{width: '55px', height: '50px'}} src={data["player"]["itemPic"]} alt=""></img>} 
        </div>

        {openInventory && <Inventory/>}

        {/* Static Element (Gem) */}
        <div style={{position: 'absolute', top: '4%', right: '22%', backgroundColor: '#00000078', width: '6%', margin: 'auto', borderRadius: '10px', boxShadow: '0px 0px 10px 10px #00000078'}}>
            <div>
                <img style={{width: '40px', height: '40px'}} src={gemC} alt=""></img>
                <div style={{position: 'absolute', top: '0px',right: '5%'}}>
                    <p style={{position: 'absolute', top: '0px',right: '19%'}}>{data["player"]["gems"]}</p>
                </div>
            </div>
        </div>

        {/* Variable Element (Game Field) */}
        <div className='game-field'
        onClick={()=>{
            setOpenShop(false)
            setOpenInventory(false)
        }}>
            {/* {fieldElements} */}
            <FieldMatrix/>
            {handleFightStart()}
            {data["game"]["end"] === "none" && detectEnd()}
            {/* {handleAchievements()} */}
        </div>
    </div>
  )
}


export default Level1