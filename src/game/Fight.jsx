import React, {useState} from 'react'
import { Bag, MessageField, EffectsField } from './Elements'
import { handlePlayerAttack, handleEnemyAttack, handleBattleRound, escape } from './GameFunctions'
import {Button} from '@mui/material'
import data from './data'

const Fight = () => {
    const [fight, setfight] = useState(false)
    const [bag, setbag] = useState(false)
    const [battleWindow, setbattleWindow] = useState(<></>)

    const FightOptions = () =>{
        
        const SwordOptions = () =>{
            return(
            <div className='fightOptions'>
                <p>Aim for</p>
                <Button sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1,
                position: 'absolute', left: '0%', top: '0%'}}
                onClick={()=>setfight(x=>!x)}>
                    X
                </Button>
                <div>
                    <Button sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1,}}
                    onClick={()=> {
                        handlePlayerAttack("sword","head")
                        handleEnemyAttack()
                        setfight(x=>!x)
                        handleBattleRound()
                        }}>
                        Head
                    </Button>
                </div>
                <div>
                    <Button sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1,}}
                    onClick={()=> {
                        handlePlayerAttack("sword","back")
                        handleEnemyAttack()
                        setfight(x=>!x)
                        handleBattleRound()
                        }}>
                    Back 
                    </Button>
                </div>
                <div>
                    <Button sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1,}}
                    onClick={()=> {
                        handlePlayerAttack("sword","hands")
                        handleEnemyAttack()
                        setfight(x=>!x)
                        handleBattleRound()
                        }}>
                        Hands
                    </Button>
                </div>
            </div>
            )
        }
        const ShieldOptions = () =>{
            return(
            <div className='fightOptions'>
                <p>Block</p>
                <Button sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1,
                position: 'absolute', left: '0%', top: '0%'}}
                onClick={()=>setfight(x=>!x)}>
                    X
                </Button>
                <div>
                    <Button sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1,}}
                    onClick={()=> {
                        handlePlayerAttack("shield")
                        handleEnemyAttack()
                        setfight(x=>!x)
                        handleBattleRound()
                        }}>
                        Block with shield
                    </Button>
                </div>
            </div>
            )
        }
        const MeleOptions = () => {
            return(
                <div className='fightOptions'>
                <p>Melee</p>
                <Button sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1,
                position: 'absolute', left: '0%', top: '0%'}}
                onClick={()=>setfight(x=>!x)}>
                    X
                </Button>
                <div>
                    <Button sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1,}}
                    onClick={()=> {
                        handlePlayerAttack("meleAttack")
                        handleEnemyAttack()
                        handleBattleRound()
                        setfight(x=>!x)
                        }}>
                        Attack with Hands
                    </Button>
                </div>
                <div>
                    <Button sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1,}}
                    onClick={()=> {
                        handlePlayerAttack("meleBlock")
                        handleEnemyAttack()
                        handleBattleRound()
                        setfight(x=>!x)
                        }}>
                        Block with Hands
                    </Button>
                </div>
            </div>
            )
        }
        switch (data["player"]["item"]){
            case "none": return <MeleOptions/>
            case "Sword": return <SwordOptions/>
            case "Shield": return <ShieldOptions/>
        }
    }
    const BagOptions = () =>{

        return(
        <div className='bagOptions'>
            <Bag/>
        </div>
        )
    }
    
  return (
    <div className='fightDiv' 
    style={{
        background: "url(" + 
        data["game"]["level"][ data["game"]["selected lv"] ]["fightBackground"]
        + ") no-repeat",
        backgroundSize: '100% 100%'
    }}>
        <div 
        style={{
            height: '100%',
            width: '100%',
            background: "url(" + 
            data["game"]["level"][ data["game"]["selected lv"] ]["falling"]
            + ") no-repeat",
            backgroundSize: '100% 100%',
        }}>   
        <div className={`${data["game"]["level"][ data["game"]["selected lv"] ]["fightStyle"]["enemy"]}`}>
                <div className='fight-enemyHp'>
                <p style={{position: 'absolute', bottom: '5%', width: '100%', height: '100%'}}>{data["minotaur"]["name"][data["game"]["selected lv"]]}</p>
                    <div className='fight-enemyHpBar' style={{width: `${data["minotaur"]["health"]}%`}}></div>
                </div>
                <div className='fight-enemyFigure' style={{
                background: "url(" + data["minotaur"]["type"][ data["game"]["selected lv"] ] + ") no-repeat",
                backgroundSize: '100% 100%',
            }}></div>
            </div>
        <div className={`${data["game"]["level"][ data["game"]["selected lv"] ]["fightStyle"]["player"]}`}>
                <div className='fight-playerHp'>
                    <p style={{position: 'absolute', bottom: '5%', width: '100%', height: '100%'}}>Solair</p>
                    <div className='fight-playerHpBar' style={{width: `${data["player"]["health"]}%`}}></div>
                </div>
                <EffectsField/>
                <MessageField/>
                <div className='fight-playerFigure'></div>

                { !data["game"]["fightEnd"] &&
                    <div className='fight-menu'>
                    <div className='fight-menuFight'>
                        <Button sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1,}}
                        onClick={()=>{
                            setfight(x=>!x)
                            setbag(false)
                            setbattleWindow(<FightOptions/>)
                            }}>
                        Fight
                        </Button>
                    </div>
                    <div className='fight-menuEscape'>
                        <Button sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1,}}
                        onClick={()=> escape()}
                        >
                        Escape
                        </Button>
                    </div>
                    <div className='fight-menuBag'>
                        <Button sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif", zIndex: 1,}}
                        onClick={()=>{
                            setbag(x=>!x)
                            setfight(false)
                            setbattleWindow(<BagOptions/>)
                            }}>
                        Bag
                        </Button>
                    </div>
                    {fight && battleWindow || bag && battleWindow}
                </div>
                }
            </div>
        </div>

    </div>
  )
}

export default Fight