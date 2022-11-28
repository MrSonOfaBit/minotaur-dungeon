import React, {useState, useEffect} from 'react'

import data from '../game/data'
import { Button } from '@mui/material'
import { Poisoned, Burned, Frozen } from './Elements'
import { solveMaze } from './finnSolve'
import { resetAccessAchv } from './Elements/achievements'
import { addHealthAchv, addPotionAchv, addSwampAchv, addFightAchv, addSwordAchv } from './AddAchievements'

import Fight from '../game/Fight'
import bluePotion from '../pics/gamePics/bluePotion.png'
import redPotion from '../pics/gamePics/redPotion.png'
import purplePotion from '../pics/gamePics/purplePotion.png'
import yellowPotion from '../pics/gamePics/yellowPotion.png'
import pinkPotion from '../pics/gamePics/pinkPotion.png'
import potion from '../pics/gamePics/potion.png'

import path from '../pics/gamePics/wood.jpg'
import bag from '../pics/gamePics/bag.png'
import darkWall from '../pics/gamePics/darkWallBg.jpg'
import key from '../pics/gamePics/key.jpg'
import keyCount from '../pics/gamePics/keyCount.png'
import torch from '../pics/gamePics/pixelTorch.gif'
import sword from '../pics/gamePics/sword.png'
import shield from '../pics/gamePics/shield.png'
import minotaur from '../pics/gamePics/minotaur2.gif'
import magma from '../pics/gamePics/magma.gif'

import fightBg from '../pics/fightPics/fightBg.png'
import iceFight from '../pics/fightPics/iceFight.png'
import swampFight from '../pics/fightPics/swampFightBg.jpg'

import iceWall from '../pics/gamePics/Ice Lv/darkWallBgIce.jpg'
import death from '../pics/gamePics/Ice Lv/death.gif'
import iceBag from '../pics/gamePics/Ice Lv/iceBag.png'
import iceSword from '../pics/gamePics/Ice Lv/iceSword.png'
import iceWater from '../pics/gamePics/Ice Lv/iceWater.gif'
import keyCountIce from '../pics/gamePics/Ice Lv/keyCountIce.png'
import keyIce from '../pics/gamePics/Ice Lv/keyIce.jpg'
import iceTorch from '../pics/gamePics/Ice Lv/pixelTorchIce.gif'
import snow from '../pics/gamePics/Ice Lv/schnee.gif'
import iceShield from '../pics/gamePics/Ice Lv/shieldIce.png'

import swampBag from '../pics/gamePics/Swamp Lv/bag.png'
import swampWall from '../pics/gamePics/Swamp Lv/darkWallBg.jpg'
import swampKey from '../pics/gamePics/Swamp Lv/key.jpg'
import keyCountSwamp from '../pics/gamePics/Swamp Lv/keyCount.png'
import rain from '../pics/gamePics/Swamp Lv/rain.gif'
import swampShield from '../pics/gamePics/Swamp Lv/shield.png'
import ghoul from '../pics/gamePics/Swamp Lv/swampMonster.gif'
import swampSword from '../pics/gamePics/Swamp Lv/swampSword.png'
import swampWater from '../pics/gamePics/Swamp Lv/swampWater.gif'


/* -- Function Content Table -- */

/* 
    Number | Categorie
    -------|----------
    1      | Add                 
    2      | Damage             
    3      | Curse              
    4      | Shop & Inventory   
    5      | Movement           
    6      | Fight              
    7      | Reset              
    8      | Gameend            
    9      | Level Design       
    10     | Potion Effects     
    11     | Import Images      
    12     | Difficulty         
*/
/* 
|
|
|
|
| _______________________________1_______________________________ */
/* ~ Add Functions ~ */

export function addGems(x,s){
    if(!data["player"]["collected gems"].includes(x) && s !== 2){
        data["player"]["gems"]+=1
        data["player"]["collected gems"].push(x)
    }
    if(!data["player"]["collected gems"].includes(x) && s === 2){
        data["player"]["gems"]+=10
        data["player"]["collected gems"].push(x)
    }
}

export function addKeys(x){
    if(!data["player"]["collected keys"].includes(x))
        data["player"]["keys"]+=1
        data["player"]["collected keys"].push(x)
}

export function addItem(n,x){
    if(n === "Potion" && data["player"]["potion"]){
        data["player"]["potion"] = false
        data["player"]["inventory"]["vita"].push(potion)
    }
    if(data["player"]["item"] !== n && data["player"]["itemPic"] !== x && n !== "Potion"){
        data["player"]["item"] = n
        data["player"]["itemPic"] = x
    }
}

export function addCurse(){
    switch(data["game"]["selected lv"]){
        case 1: data["player"]["burned"] = true
           break
        case 2: data["player"]["frozen"] = true
            break
        case 3: data["player"]["poison"] = true
                addSwampAchv()
            break
    }
}
/* 
|
|
|
|
| _______________________________2_______________________________ */
/* Handle Damage Function*/

export function takeLife(x){
    if(!data["player"]["magmaFields"].includes(x)){
        data["player"]["magmaFields"].push(x)
        if(!takeAqua()){
            data["player"]["health"] -= 40
            addCurse()
        }
    }
}
/* 
|
|
|
|
| _______________________________3_______________________________ */
/* Curse Function */

export function displayCurse(){
    if(data["player"]["poison"]) 
        return <Poisoned/>
    if(data["player"]["burned"]) 
        return <Burned/>
    if(data["player"]["frozen"]) 
        return <Frozen/>
}
/* 
|
|
|
|
| _______________________________4_______________________________ */
/* ~ Shop and Inventory Functions ~ */

export function setItemMessage(x){
    data["player"]["itemMessage"] = x
}

export function activateItem(x){
    switch(x){
        case 1: if(!data["player"]["currentItemUse"].includes(x)) {
            data["player"]["currentItemUse"].push(1)
            data["player"]["inventory"]["aqua"]["list"].pop()
            data["player"]["itemMessage"] = 0
            data["player"]["inventory"]["aqua"]["count"] = 3
        }
        break
        case 2: if(!data["player"]["currentItemUse"].includes(x)) {
            data["player"]["currentItemUse"].push(2)
            data["player"]["inventory"]["potentia"].pop()
            data["player"]["itemMessage"] = 0
        }
        break
        case 3: if(data["player"]["poison"]) {
            data["player"]["inventory"]["antidotum"].pop()
            data["player"]["itemMessage"] = 0
            data["player"]["poison"] = false
        }else{
            if(data["player"]["frozen"]) {
                data["player"]["inventory"]["antidotum"].pop()
                data["player"]["itemMessage"] = 0
                data["player"]["frozen"] = false
            }else{
                if(data["player"]["burned"]) {
                    data["player"]["inventory"]["antidotum"].pop()
                    data["player"]["itemMessage"] = 0
                    data["player"]["burned"] = false
                }
            }
        }
        case 4: if(!data["player"]["currentItemUse"].includes(x)) {
            data["player"]["currentItemUse"].push(4)
            data["player"]["inventory"]["ventus"].pop()
            data["player"]["itemMessage"] = 0
        }
        break
        case 5: if(!data["player"]["currentItemUse"].includes(x)) {
            data["player"]["currentItemUse"].push(5)
            data["player"]["inventory"]["armis"].pop()
            data["player"]["itemMessage"] = 0
        }
        break
        case 6: if(data["player"]["health"] < 120) {
            data["player"]["health"] = 120
            data["player"]["inventory"]["vita"].pop()
            data["player"]["itemMessage"] = 0
            addHealthAchv()
        }
        break
    }
    addPotionAchv()
}

export function displayInventoryItems(x){
    switch(x){
        case "aqua": if(data["player"]["inventory"][x]["list"].length > 0) return <Button style={{height: "55px",width: "30px", background: "url("+bluePotion+") no-repeat",backgroundSize: "60% 100%"}}
        onClick={() => setItemMessage(1)}></Button> 

        case "potentia": if(data["player"]["inventory"][x].length > 0) return <Button style={{height: "55px",width: "30px", background: "url("+redPotion+") no-repeat",backgroundSize: "60% 100%"}}
        onClick={() => setItemMessage(2)}></Button> 
            
        case "antidotum": if(data["player"]["inventory"][x].length > 0) return <Button style={{height: "55px",width: "30px", background: "url("+purplePotion+") no-repeat",backgroundSize: "60% 100%"}}
        onClick={() => setItemMessage(3)}></Button> 
           
        case "ventus": if(data["player"]["inventory"][x].length > 0) return <Button style={{height: "55px",width: "30px", background: "url("+yellowPotion+") no-repeat",backgroundSize: "40% 100%"}}
        onClick={() => setItemMessage(4)}></Button> 
            
        case "armis": if(data["player"]["inventory"][x].length > 0) return <Button style={{height: "55px",width: "30px", background: "url("+pinkPotion+") no-repeat",backgroundSize: "60% 90%"}}
        onClick={() => setItemMessage(5)}></Button> 
            
        case "vita": if(data["player"]["inventory"][x].length > 0) return <Button style={{height: "55px",width: "30px", background: "url("+potion+") no-repeat",backgroundSize: "100% 100%"}}
        onClick={() => setItemMessage(6)}></Button> 
    }
}

export function displayItemInfo(x){
    switch(x){
        case 1: return <div>The aqua potion let you walk on water fields for 3times <Button  sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif"}}
        onClick={()=>{activateItem(1)}}>Use</Button></div>
        case 2: return <div>The potentia potion gives you +50% damage on attacks<Button  sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif"}}
        onClick={()=>{activateItem(2)}}>Use</Button></div>
        case 3: return <div>The antidotum potion removes poison, fire and frozen effects <Button  sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif"}}
        onClick={()=>{activateItem(3)}}>Use</Button></div>
        case 4: return <div>The ventus potion raises your hitrate for 20% and escape chance for 40% <Button  sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif"}}
        onClick={()=>{activateItem(4)}}>Use</Button></div>
        case 5: return <div>The armis potion raises your defense for 30% and block-chance plus 20% <Button  sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif"}}
        onClick={()=>{activateItem(5)}}>Use</Button></div>
        case 6: return <div>The vita potion heals +1 heart <Button  sx={{color: 'white', fontFamily: "'Wonder Boy In Monster World', sans-serif"}}
        onClick={()=>{activateItem(6)}}>Use</Button></div>
        case 7: return <div>A sword for attacking mobs and scare off the minotaur</div>
        case 8: return <div>A shield for blocking enemy attacks</div>
    }
}

export function displayEffectInfo(x){
    switch(x){
        case 1: return `aqua: ${data["player"]["inventory"]["aqua"]["count"]} remain`
        case 2: return `attack +50%`
        case 4: return `hitrate +20% escaperate +40%`
        case 5: return `defense +30% block + 20%`
    }
}
/* 
|
|
|
|
| _______________________________5_______________________________ */
/* ~ Movement Functions ~ */

export function setPlayerPos(x){
    var playerPosition = []
    var matrix = data["game"]["maze"]
    for (let i = 0; i < matrix.length; i++){
        for (let k = 0; k < matrix[i].length; k++) {
            if(matrix[i][k]["props"]["fieldId"] === data["player"]["playerPosition"]){
                playerPosition.push(i)
                playerPosition.push(k)
            }
        }
    }
    
    switch (x) {
        case 1: 
            if(matrix[ playerPosition[0] ][ playerPosition[1]-1]["props"]["id"] !== "Wall"){
                data["player"]["playerPosition"] = matrix[ playerPosition[0] ][ playerPosition[1]-1]["props"]["fieldId"]
            }
            break;
        case 2: 
            if(matrix[ playerPosition[0]-1 ][ playerPosition[1]]["props"]["id"] !== "Wall"){
                data["player"]["playerPosition"] = matrix[ playerPosition[0]-1 ][ playerPosition[1]]["props"]["fieldId"]
            }
            break;
        case 3: 
            if(matrix[ playerPosition[0]+1 ][ playerPosition[1]]["props"]["id"] !== "Wall"){
                data["player"]["playerPosition"] = matrix[ playerPosition[0]+1 ][ playerPosition[1]]["props"]["fieldId"]
            }
            break;
        case 4: 
            if(data["game"]["maze"][ playerPosition[0] ][ playerPosition[1]+1]["props"]["id"] !== "Wall"){
                data["player"]["playerPosition"] = matrix[ playerPosition[0] ][ playerPosition[1]+1]["props"]["fieldId"]
            }
            break;
        default:
            console.log("Nothing changed! ",data["game"]["maze"][ playerPosition[0] ][ playerPosition[1]])
            break
    }

    if(data["game"]["maze"][playerPosition[0]][playerPosition[1]]["props"]["id"] !== "Magma"){
        data["player"]["playerCor"] = [playerPosition[0],playerPosition[1]]
    }

    if(data["minotaur"]["rest"] === 0){
        setMinotaurPos()
    }else{
        data["minotaur"]["rest"] -= 1
    }

}

export function setMinotaurPos(){
    data["game"]["huntPath"] =  findPlayer()
    data["minotaur"]["minotaurOldPos"] = data["minotaur"]["minotaurposition"]
    /* if(data["game"]["huntPath"].length() === 2 && data["game"]["maze"]){

    } */

    detectFight()

    if(data["game"]["huntPath"].length !== 1)
        data["minotaur"]["minotaurposition"] = data["game"]["huntPath"][1]

    detectFight()
}

function findPlayer(){
    var matrix = data["game"]["maze"]
    var path = []
    var start=[]
    var result = []

    for (let i = 0; i < matrix.length; i++) {
        path[i] = []
        for (let k = 0; k < matrix[i].length; k++) {
            if(matrix[i][k]["props"]["fieldId"] === data["minotaur"]["minotaurposition"]) data["minotaur"]["minotaurCor"] = [i,k]
            
            switch(matrix[i][k]["props"]["id"]){
                case "Path": path[i].push(0)
                break
                case "Gate": path[i].push(0)
                break
                case "Path start": path[i].push(0)
                break
                case "Key": path[i].push(0)
                break
                default: path[i].push(1)
                break
            }   
        }
    }
    
    result = solveMaze(path)
    return result
}

export function keyInput(x){
    if(!data["game"]["gamePause"]){
        switch(x){
                case "ArrowLeft": setPlayerPos(1)
                break
                case "ArrowUp": setPlayerPos(2)
                break
                case "ArrowDown": setPlayerPos(3)
                break
                case "ArrowRight": setPlayerPos(4)
                break
                case "a": setPlayerPos(1)
                break
                case "w": setPlayerPos(2)
                break
                case "s": setPlayerPos(3)
                break
                case "d": setPlayerPos(4)
                break  
        }
    }
}
/* 
|
|
|
|
| _______________________________6_______________________________ */
/* Fight Functions */

export function handleFightStart(){
    if(data["game"]["fight"])
        return <div style={{position: 'absolute', zIndex: 1, right: '27%',top:'0%', height: '100%', width: '100%'}}><Fight/></div>
}
export function detectFight(){
    if(!data["game"]["recentFight"]){
        if(data["player"]["playerPosition"] === data["minotaur"]["minotaurposition"] || data["player"]["playerPosition"] === data["minotaur"]["minotaurOldPos"]){
            data["minotaur"]["rest"] = 10
            data["game"]["fight"] = true
            data["game"]["recentFight"] = true
            data["game"]["gamePause"] = true
        }else{
            data["game"]["fight"] = false
            data["game"]["recentFight"] = false
            data["game"]["gamePause"] = false
        }
    }
    data["game"]["recentFight"] = false

}
export const handlePlayerAttack = (x,y) =>{
    switch (x) {
        case "meleAttack":
            data["player"]["attack state"] = "meleAttack"
            break;
        case "meleBlock":
            data["player"]["attack state"] = "meleBlock"
            break;
        case "shield":
            data["player"]["attack state"] = "shield"
            break;
        case "sword":
            data["player"]["attack state"] = "sword"
            data["player"]["aim"] = y
            break;
    
        default:
            break;
    }
}
export const handleEnemyAttack = () =>{
    const moves = ["attack", "block","attack"]

    switch (moves[Math.floor(Math.random() * 3)]) {
        case "attack":
            data["minotaur"]["attack state"] = "sword"
            break;
        case "block":
            data["minotaur"]["attack state"] = "shield"
            break;
    }
}
export const escape = () =>{
    switch(Math.floor(Math.random() * 5)){
        case data["player"]["currentItemUse"].includes(4) ? 3 : 1: {
            data["game"]["fightNote"] = ("You escaped!")
            return end()
        }
        default:{
            data["game"]["fightNote"] = ("Escape failed and " + data["minotaur"]["name"][ data["game"]["selected lv"] ] + " hits you!")
            data["player"]["health"] -= data["player"]["currentItemUse"].includes(5) ? 10 : 30
        } 
    }
    checkHealth()
}
export const handleBattleRound = () =>{
    var name = data["minotaur"]["name"][data["game"]["selected lv"]]

    if(data["minotaur"]["attack state"] === "shield"){
        data["game"]["fightNote"] = (name + " blocked!")
    }else{
        switch(data["player"]["attack state"]){
            case "sword":
                switch(data["player"]["aim"]){
                    case "head":
                        if(Math.floor(Math.random() * 100) > (data["player"]["currentItemUse"].includes(4) ? 
                        battleStrength(50) : battleStrength(39)))
                        {
                            data["game"]["fightNote"] = ("You missed and "+ name + " lands a direct hit!")
                            data["player"]["health"] -= data["player"]["currentItemUse"].includes(5) ? battleStrength(10) : battleStrength(20)
                        }else{
                            data["game"]["fightNote"] = ("Your hit the Minotaur!")
                            if(data["player"]["currentItemUse"].includes(2)){
                                data["minotaur"]["health"] -= battleStrength(100)
                            }else
                                data["minotaur"]["health"] -= battleStrength(50)
                        }
                        break
                    case "back":
                        if(Math.floor(Math.random() * 100) > (data["player"]["currentItemUse"].includes(4) ? 
                        battleStrength(94.8) : battleStrength(79)))
                        {
                            data["game"]["fightNote"] = ("You missed and "+ name + "lands a direct hit!")
                            data["player"]["health"] -= data["player"]["currentItemUse"].includes(5) ? battleStrength(10) : battleStrength(20)
                        }else{
                            data["game"]["fightNote"] = ("Your hit "+ name + "!")
                            if(data["player"]["currentItemUse"].includes(2)){
                                data["minotaur"]["health"] -= battleStrength(40)
                            }else
                                data["minotaur"]["health"] -= battleStrength(20)
                        }
                        break
                    case "hands":
                        if(Math.floor(Math.random() * 100) > (data["player"]["currentItemUse"].includes(4) ? 
                        battleStrength(50) : battleStrength(39)))
                        {
                            data["game"]["fightNote"] = ("You missed and "+ name + " lands a direct hit!")
                            data["player"]["health"] -= data["player"]["currentItemUse"].includes(5) ? battleStrength(10) : battleStrength(20)
                        }else{
                            data["game"]["fightNote"] = ("Your hit "+ name + "!")
                            if(data["player"]["currentItemUse"].includes(2)){
                                data["minotaur"]["health"] -= battleStrength(50)
                            }else
                                data["minotaur"]["health"] -= battleStrength(25)
                        }
                        break
                }
                break
            case "shield":
                if(Math.floor(Math.random() * 100) > (data["player"]["currentItemUse"].includes(5) ? 80 : 59)){
                    data["game"]["fightNote"] = (name + " attacks and your block fails")
                    data["player"]["health"] -= data["player"]["currentItemUse"].includes(5) ? battleStrength(10) : battleStrength(20)
                }else{
                    data["game"]["fightNote"] = ("Block was succesfull, you escape!")
                    end()
                }
                break
            case "meleAttack":

                if(Math.floor(Math.random() * 100) > (data["player"]["currentItemUse"].includes(4) ? 
                battleStrength(49) : battleStrength(29)))
                {
                    data["game"]["fightNote"] = ("You missed and "+ name + " lands a direct hit!")
                    data["player"]["health"] -= data["player"]["currentItemUse"].includes(5) ? battleStrength(10) : battleStrength(20)
                }else{
                    data["game"]["fightNote"] = ("You hit "+ name + "!")
                    if(data["player"]["currentItemUse"].includes(2)){
                        data["minotaur"]["health"] -= battleStrength(10)
                    }else
                        data["minotaur"]["health"] -= battleStrength(5)
                }
                 break
            case "meleBlock":

                if(Math.floor(Math.random() * 100) > (data["player"]["currentItemUse"].includes(5) ? 49 : 29)){
                    data["game"]["fightNote"] = (name + " breaks through your defense and hit you!")
                    data["player"]["health"] -= data["player"]["currentItemUse"].includes(5) ? battleStrength(10) : battleStrength(20)
                }else{
                    data["game"]["fightNote"] = ("Block was succesfull, you escape!")
                    end()
                }
                break
        }
    }

    checkHealth()
}
export const end = () =>{
    data["game"]["fightEnd"] = true


    if(data["player"]["health"] > 0){
        addFightAchv()
    }
}
export function checkHealth(){
    if(data["minotaur"]["health"] <= 0){
        data["game"]["fightNote"] = `${data["minotaur"]["name"][data["game"]["selected lv"]]} defeated! You escaped`
        addSwordAchv()
        end()
    }
    if(data["player"]["health"] <= 0){
        data["game"]["fightNote"] = `${data["minotaur"]["name"][data["game"]["selected lv"]]} hits you deadly! Your fading out`
        end()
    }
}
/* If a curse is active, activate effect */
export function battleStrength(x){
    var nr = x
    if(data["player"]["attack state"] === "shield" || data["player"]["attack state"] === "meleBlock"){
        nr += nr / 100 * difficulty_Fight_Procent()
    }else{
        nr -= nr / 100 * difficulty_Fight_Procent()
    }


    switch(true){
        case data["player"]["frozen"] || data["player"]["burned"]: {
            console.log("attack or hit chance: ",nr - (nr * difficulty_Curse()))
            return nr - (nr * difficulty_Curse())
        }
        case data["player"]["poison"]: {
            console.log("damage: ",nr - (nr * difficulty_Curse()))
            return nr + (nr * difficulty_Curse())
        }
        default: return nr
    }
} 

/* 
|
|
|
|
| _______________________________7_______________________________ */
/* ~ Reset Functions ~ */

export function findStartPosition(x,matrix){
    if(x===1){
        for (let i = 0; i < matrix.length; i++) {
            if(matrix[i][30]["props"]["id"] === "Path start")
                return matrix[i][30]["props"]["fieldId"]
        }
    }else{
        for (let i = 0; i < matrix.length; i++) {
            if(matrix[i][0]["props"]["id"] === "Gate")
                return matrix[i][0]["props"]["fieldId"]
        } 
    }
}

export const reset = () =>{

    resetAccessAchv()

    data["game"]["start"] = false
    data["game"]["end"] = "none"
    data["game"]["fight"] = false
    data["game"]["fightNote"] = ""
    data["game"]["fightEnd"] = false
    data["game"]["gamePause"] = false
    data["game"]["recentFight"] = false
    data["game"]["huntPath"] = []
    data["game"]["steps"] = 0
    /* Default player settings */

    data["player"]["playerPosition"] = findStartPosition(1,data["game"]["maze"])

    data["player"]["item"] = "none"
    data["player"]["itemPic"]= "none"

    data["player"]["poison"]= false
    data["player"]["burned"]= false
    data["player"]["frozen"]= false
    data["player"]["potion"]= true
    data["player"]["inventory"]= {
        "aqua": {
           "list":[],
           "count": 0,
        },
        "potentia":[],
        "antidotum":[],
        "ventus":[],
        "armis":[],
        "vita":[],
    }

    data["player"]["itemMessage"]= 0
    data["player"]["currentItemUse"]=[]

    data["player"]["keys"] = 0
    data["player"]["collected keys"]= []

    data["player"]["gems"]= 0
    data["player"]["collected gems"]= []

    data["player"]["magmaFields"]= []

    data["player"]["health"]= 120
    data["player"]["attack state"]= "none"
    data["player"]["aim"]= "none"
    

    /* Default minotaur settings */

    data["minotaur"]["minotaurposition"] = findStartPosition(2,data["game"]["maze"])
    data["minotaur"]["rest"] = 0
    data["minotaur"]["health"] = 100
    data["minotaur"]["mode"] = "easy"
    data["minotaur"]["phase"] = "search"
}
/* 
|
|
|
|
| _______________________________8_______________________________ */
/* GameEnd Functions */

export function detectEnd(){
    if(data["player"]["playerPosition"] === data["game"]["gatePosition"] && data["player"]["keys"] === 8){
        data["game"]["end"] = "win"
    }
}
/* 
|
|
|
|
| _______________________________9_______________________________ */
/* Level Design Functions */

export function selectDesign(name){
    switch(name){
        case "wall": switch(data["game"]["selected lv"]){
            case 1: return darkWall
            case 2: return iceWall
            case 3: return swampWall
        }
        case "enemy": switch(data["game"]["selected lv"]){
            case 1: return minotaur
            case 2: return death
            case 3: return ghoul
        }
        case "sword": switch(data["game"]["selected lv"]){
            case 1: return sword
            case 2: return iceSword
            case 3: return swampSword
        }
        case "magma": switch(data["game"]["selected lv"]){
            case 1: return magma
            case 2: return iceWater
            case 3: return swampWater
        }
        case "keyField": switch(data["game"]["selected lv"]){
            case 1: return key
            case 2: return keyIce
            case 3: return swampKey
        }
        case "keyCount": switch(data["game"]["selected lv"]){
            case 1: return keyCount
            case 2: return keyCountIce
            case 3: return keyCountSwamp
        }
        case "torch": switch(data["game"]["selected lv"]){
            case 1: return torch
            case 2: return iceTorch
            case 3: return torch
        }
        case "shield" : switch(data["game"]["selected lv"]){
            case 1: return shield
            case 2: return iceShield
            case 3: return swampShield
        }
        case "path": switch(data["game"]["selected lv"]){
            case 1: return path
            case 2: return path
            case 3: return path
        }
        case "fightBg" : switch(data["game"]["selected lv"]){
            case 1: return fightBg
            case 2: return iceFight
            case 3: return swampFight
        }
        case "bag" : switch(data["game"]["selected lv"]){
            case 1: return bag
            case 2: return iceBag
            case 3: return swampBag
        }
        case "fightBg": switch(data["game"]["selected lv"]){
            case 1: return ""
            case 2: return snow
            case 3: return rain
        }
    }
}
/* 
|
|
|
|
| _______________________________10_______________________________ */
/* Potion Effect Functions */

export function takeAqua(){
    if(data["game"]["selected lv"] !== 1){
        if(data["player"]["inventory"]["aqua"]["count"] === 0){
            data["player"]["currentItemUse"] = data["player"]["currentItemUse"].filter(x => x !== 1);
            return false
        }
        if(data["player"]["currentItemUse"].includes(1) && data["player"]["inventory"]["aqua"]["count"] !== 0){
            data["player"]["inventory"]["aqua"]["count"] -= 1

            if(data["player"]["inventory"]["aqua"]["count"] === 0)
                data["player"]["currentItemUse"] = data["player"]["currentItemUse"].filter(x => x !== 1);
            return true
        }else{
            return false
        }
    }
}

export function AnimatedText(props){
    const [placeholder, setPlaceholder] = useState('');

    const
        string = props.text,
        index = React.useRef(0);

    useEffect(() => {
        function tick() {
            setPlaceholder(prev => prev + string[index.current]);
            index.current++;
        }
        if (index.current < string.length) {
            let addChar = setInterval(tick, 50);
            return () => clearInterval(addChar);
        }
    }, [placeholder]);

    return placeholder
}
/* 
|
|
|
|
| _______________________________11_______________________________ */
/* import images */

export function importAll(r) {
    let images = [];
    r.keys().map((item) => { images.push(r(item)) });
    return images;
  }
/* 
|
|
|
|
| _______________________________12_______________________________ */
/* Handle Game Difficulty */

/* Handle strength of the 3 Fight options */
export function difficulty_Fight_Procent(){
    switch(data["game"]["difficulty"]){
        case 1: return 0
        case 2: return 20
        case 3: return 50
        case 4: return 100
    }
}

export function difficulty_Curse(){
    switch(data["game"]["difficulty"]){
        case 1: return 0.1
        case 2: return 0.2
        case 3: return 0.3
        case 4: return 0.4
    }
}

export function difficultyPrice(){
    
}

export function difficultyGemAmount(){
    
}

export function difficultyCurseEffect(){
    
}

export function difficultyMagmaDamage(){
    
}