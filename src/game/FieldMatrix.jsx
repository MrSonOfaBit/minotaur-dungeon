import React, {useState, useEffect} from 'react'
import { Sword,Shield,Potion,Player,Minotaur,Gem,BigGem } from './Elements'
import { addGems,addKeys,takeLife,addItem, selectDesign, addPoison} from './GameFunctions'
import { Torch } from './Elements'

import gateBg from '../pics/gamePics/gate.png'
import gem from '../pics/gamePics/gem.gif'
import bigGem from '../pics/gamePics/bigGem.gif'
import potion from '../pics/gamePics/potion.png'

import data from './data'


const Fields = (props) =>{
    const [test,setTest] = useState(1)
    useEffect(() => {
        const interval = setInterval(() =>setTest(x=>x+1),10);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return(
        <div style={{
            background: "url(" + props.bg + ") no-repeat",
            backgroundSize: '100% 100%',
            width: '3%', height: '5.2%',
            left: `${props.pos*2.8}%`,
            top: `${props.top*5}%`,
            position: 'absolute',
            opacity: `${!data["player"]["collected keys"].includes(props.fieldId) ? 100 : 70}%`,
        }}>
            {/* {data["game"]["huntPath"].includes(props.fieldId) && props.fieldId} */}
            
            {props.value === "Sword" && <Sword opacity={data["player"]["item"] === "Sword" ? 50 : 100}/>}
            {props.value === "Shield" && <Shield opacity={data["player"]["item"] === "Shield" ? 50 : 100}/>}
            {props.value === "Potion" && <Potion opacity={!data["player"]["potion"] ? 50 : 100}/>}
            {[0,7,15,23,30,496,502,511,519,526].includes(props.fieldId) && <Torch/>}
            {props.fieldId === data["player"]["playerPosition"] && <Player/>}
            {props.fieldId === data["minotaur"]["minotaurposition"] && <Minotaur/>}

            {/* Handle Key and Gem input */}
            {props.value === "Gem" && !data["player"]["collected gems"].includes(props.fieldId) && <Gem/>}
            {props.value === "BigGem" && !data["player"]["collected gems"].includes(props.fieldId) && <BigGem/>}
            {props.fieldId === data["player"]["playerPosition"] && props.value === "Gem" && addGems(props.fieldId,1)}
            {props.fieldId === data["player"]["playerPosition"] && props.value === "BigGem" && addGems(props.fieldId,2)}

            {props.fieldId === data["player"]["playerPosition"] && props.id === "Key" && addKeys(props.fieldId)}

            {/* Handle magma damage */}
            {props.fieldId === data["player"]["playerPosition"] && props.id === "Magma" && takeLife(props.fieldId)}
            {props.fieldId === data["player"]["playerPosition"] && props.id === "Path" && onPath(props.fieldId)}

            {/* Add items */}
            {props.fieldId === data["player"]["playerPosition"] &&
            (props.value === "Sword"|| props.value === "Shield" || props.value === "Potion")&& 
            addItem(props.value,props.valuePic)}

        </div>
    )
}


const FieldMatrix = () => {
    const fieldelements = data["game"]["maze"].map(x=>{
        return x.map(y=>{
            return y
        })
    })
    return (
        <div>
            {fieldelements}
        </div>
    )
}

export default FieldMatrix


/* ~ Create Maze Functions ~ */

export function mazeGen(){
    var matrix = []
    var layout = []

    var generateMaze = require('generate-maze-by-clustering');
    var maze = generateMaze([15,8]);
    var mazeString = maze.toText()

    var k=0
    layout[k]=[]
    for (let i = 0; i < mazeString.length; i++) {
        if(mazeString[i] !== "\n")
            layout[k].push(mazeString[i])

        if(mazeString[i] === "\n"){
            k = k+1
            layout[k] = []
        }
    }
    
    var c=0
    var counter = 0
    for(let i=0; i<layout.length;i++){
        counter+=1
        matrix[i] = []

        for(let k=0; k < 31;k++){
            if(layout[i][k] === "#") {
                matrix[i].push(<Fields nr={k} id="Wall" bg={selectDesign("wall")} pos={k+0.3} top={counter} playerPos={false} fieldId={c}/>)
            }else{
                matrix[i].push(<Fields nr={k} id="Path" bg={selectDesign("path")} pos={k+0.3} top={counter} playerPos={false} fieldId={c}/>)
            }
            c+=1
        }
    }

    // playerposition
    setStartEndPosition(matrix)
    setKeys(matrix)
    setBigGem(matrix)
    setMagmaAndPath(matrix)
    setGems(matrix)
    setItems(matrix)
    /* console.log(data["player"]["health"]) */
    console.log(matrix)
    return matrix
}

function setStartEndPosition(matrix){
    var loop = true
    while(loop){
        var choice = Math.floor(Math.random() * matrix.length -1) +1
        for (let i = 0; i < matrix.length; i++) {
            if(i === choice && matrix[i][matrix[i].length - 2]["props"]["id"] === "Path"){
                var nr_ = matrix[i][matrix[i].length - 1]["props"]["nr"]
                var fieldId = matrix[i][matrix[i].length - 1]["props"]["fieldId"]

                data["player"]["playerPosition"] = matrix[i][ matrix[i].length - 1]["props"]["fieldId"]
                data["player"]["playerCor"] = [i, matrix[i].length - 1]

                matrix[i][matrix[i].length - 1] = <Fields 
                nr={nr_} 
                id="Path start" 
                bg={selectDesign("path")} 
                pos={nr_+0.3} 
                top={i+1} 
                playerPos={true}
                fieldId={fieldId}
                />

                loop = false
            }
        }
    }

    loop = true
    while(loop){
        var choice = Math.floor(Math.random() * matrix.length -1) +1
        for (let i = 0; i < matrix.length; i++) {
            if(i === choice && matrix[i][1]["props"]["id"] === "Path"){
                var nr_ = matrix[i][0]["props"]["nr"]
                var fieldId = matrix[i][0]["props"]["fieldId"]

                data["minotaur"]["minotaurposition"] = fieldId
                data["minotaur"]["minotaurCor"] = [i,0]
                data["game"]["gatePosition"] = fieldId
                matrix[i][0] = <Fields 
                nr={nr_} 
                id="Gate" 
                bg={gateBg} 
                pos={nr_+0.3} 
                top={i+1} 
                playerPos={false}
                fieldId={fieldId}
                />     

                loop = false
            }
        }
    }
}

export function checkSurrounding(matrix,i,k){
    var checkAround = 0
    if(matrix[i-1][k]["props"]["id"] === "Wall") checkAround+=1   
    if(matrix[i][k+1]["props"]["id"] === "Wall") checkAround+=1
    if(matrix[i][k-1]["props"]["id"] === "Wall") checkAround+=1 
    if(matrix[i+1][k]["props"]["id"] === "Wall") checkAround+=1
    return checkAround
}

function loopItMan(keyIndex, len){
    var loopIt=true
    var options=[]
    while(loopIt){
        var x = Math.floor(Math.random() * Object.keys(keyIndex).length -1) + 1
        if(x !== 0){
            if(! options.includes(x)) options.push(x)
        }
        if(options.length === len) loopIt=false 
    }
    return options
}

function getPathIndex(matrix){
    var keyIndex = {}
    var counter=0
    for (let i = 0; i < matrix.length; i++) {
        for (let k =0; k < 31; k++){
            if(i !== 0 && i !== 16 && k !== 0 && k !== 30){
                if(matrix[i][k]["props"]["id"] === "Path" && ! matrix[i][k]["props"]["value"]){
                        keyIndex[counter] = [i,k]
                        counter+=1
                }
            } 
        }
    }
    return keyIndex
}

function replaceMatrixFields(matrix,options,keyIndex, fieldName, fieldPic,valueName,valuePic,playerPos){
    var fieldId = 0
    for (let i = 0; i < options.length; i++) {
        try{
            fieldId = matrix[ keyIndex[ options[i] ][0] ][ keyIndex[ options[i] ][1] ]["props"]["fieldId"]
            matrix[ keyIndex[ options[i] ][0] ][ keyIndex[ options[i] ][1] ] =  <Fields 
            nr={keyIndex[options[i]][1]} 
            id={fieldName} 
            bg={fieldPic} 
            pos={keyIndex[options[i]][1]+0.3} 
            top={keyIndex[options[i]][0]+1}
            value={valueName}
            valuePic={valuePic}
            playerPos={playerPos}
            fieldId={fieldId}
            /> 
        }catch(e){
            console.log(`Error: ${e}`,i, options,keyIndex, matrix)
        } 
    }
}

function setKeys(matrix){
    var keyIndex={}
    var counter=0
    for (let i = 0; i < matrix.length; i++) {
            for (let k =0; k < 31; k++){ 
                if(matrix[i][k]["props"]["id"] === "Path" && ! matrix[i][k]["props"]["value"]){
                    var checkAround = checkSurrounding(matrix,i,k)
                if(checkAround === 3){
                    counter+=1
                    keyIndex[counter] = [i,k]      
                }
            }
        }
    }
    
    var options= loopItMan(keyIndex,8)
    
    replaceMatrixFields(matrix,options,keyIndex,"Key",selectDesign("keyField"),"","",false)
}

function setBigGem(matrix){
    var keyIndex={}
    var counter=0
    for (let i = 0; i < matrix.length; i++) {
            for (let k =0; k < 31; k++){ 
                if(matrix[i][k]["props"]["id"] === "Path" && ! matrix[i][k]["props"]["value"]){
                    var checkAround = checkSurrounding(matrix,i,k)
                if(checkAround === 3){
                    counter+=1
                    keyIndex[counter] = [i,k]      
                }
            }
        }
    }
    var options= loopItMan(keyIndex,1)
    replaceMatrixFields(matrix,options,keyIndex,"Path",selectDesign("path"),"BigGem",bigGem,false)
}

function setMagmaAndPath(matrix){
    var keyIndex = {}
    var counter=0
    for (let i = 0; i < matrix.length; i++) {
        for (let k =0; k < 31; k++){
            if(i !== 0 && i !== 16 && k !== 0 && k !== 30){
                var checkAround = checkSurrounding(matrix,i,k)
                if(checkAround < 3){
                    if(matrix[i][k]["props"]["id"] === "Wall"){
                        keyIndex[counter] = [i,k]
                        counter+=1
                    }
                }
            } 
        }
    }

    var number = data["game"]["selected lv"] !== 1 ? 40 : 20
    var options = loopItMan(keyIndex, number)
    replaceMatrixFields(matrix,options,keyIndex,"Magma",selectDesign("magma"),"","",false)
}

function onPath(x){
    data["player"]["magmaFields"] = []
}

function setGems(matrix){
    var keyIndex = getPathIndex(matrix)
    var options = loopItMan(keyIndex, 30)
    replaceMatrixFields(matrix,options,keyIndex,"Path",selectDesign("path"),"Gem",gem,false)
}

function setItems(matrix){
    var keyIndex = getPathIndex(matrix)
    var arr = [["Sword",selectDesign("sword")],["Shield",selectDesign("shield")],["Potion",potion]]

    for (let i = 0; i < 3; i++) {
        var options = loopItMan(keyIndex, 1)
        replaceMatrixFields(matrix,options,keyIndex,"Path",selectDesign("path"),arr[i][0],arr[i][1],false)
    }
}