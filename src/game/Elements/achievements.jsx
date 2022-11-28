import React, {useState} from "react"
import data from "../data"
import { importAll } from '../GameFunctions'

/* Achievements Pics */
{var died = importAll(require.context(`../../pics/achievements/died`, false, /\.(png|jpe?g|svg)$/))
var difficulty = importAll(require.context(`../../pics/achievements/difficulty`, false, /\.(png|jpe?g|svg)$/))
var fight = importAll(require.context(`../../pics/achievements/fight`, false, /\.(png|jpe?g|svg)$/))
var health = importAll(require.context(`../../pics/achievements/health`, false, /\.(png|jpe?g|svg)$/))
var option = importAll(require.context(`../../pics/achievements/option`, false, /\.(png|jpe?g|svg)$/))
var play = importAll(require.context(`../../pics/achievements/play`, false, /\.(png|jpe?g|svg)$/))
var potion = importAll(require.context(`../../pics/achievements/potion`, false, /\.(png|jpe?g|svg)$/))
var special = importAll(require.context(`../../pics/achievements/special`, false, /\.(png|jpe?g|svg)$/))
var swamp = importAll(require.context(`../../pics/achievements/swamp`, false, /\.(png|jpe?g|svg)$/))
var sword = importAll(require.context(`../../pics/achievements/sword`, false, /\.(png|jpe?g|svg)$/))
var time = importAll(require.context(`../../pics/achievements/time`, false, /\.(png|jpe?g|svg)$/))
var win = importAll(require.context(`../../pics/achievements/win`, false, /\.(png|jpe?g|svg)$/))
}

export const DisplayAchievements = () =>{

    const displayAchievementsLists = Object.keys(data["game"]["achievements"]).map(x=>{
        return <AchievementList name={x}/>
    })

    return(
        <div style={{float: 'left', padding: '1%',height: '100%', width: '100%'}}>
            {displayAchievementsLists}
        </div>
    )
}

const AchievementList = (props) => {
    var counter = 0
    const displaySingelAchievement = Object.keys(data["game"]["achievements"][props.name]).map(x=>{
        var v = data["game"]["achievements"][props.name][x]    
        counter+=1  
        if(typeof v === "boolean" && v === true && x !== "access"){
            return <Achievement name={props.name} value={x} c={counter-1} achvInfo={achievInfo[props.name]}/>
        }   
    })

    return(
        <div style={{float: 'left', padding: '1%', height: '20%', width: '100%'}}>
            {displaySingelAchievement}
        </div>
    )
}

const Achievement = (props) =>{
    const [description, setDescription] = useState(false)

    const DescriptionField = (props) =>{

        function descriptionAllign(x){
          switch(true){
            case x > 0 && x < 5: return 300
            case x === 5: return 700
            default: return 0
          }
        }

        return(
        <div className="descriptionField" style={{right: `${descriptionAllign(props.number)}%`}}>
            <h4>{props.info[props.number][0]}</h4>
            <p>{props.info[props.number][1]}</p>
        </div>
        )
    }

    return(
        <div style={{float: 'left', padding: '5%',margin:'0.5%', height: '15%', width: '5%', borderRadius: '5px',
        background: 'url('+ data["game"]["achievements"][props.name]["pics"][props.c] + ') no-repeat center', 
        backgroundSize: '100% 100%'}} onMouseOver={()=>{setDescription(true)}} onMouseOut={()=>{setDescription(false)}}>
            {description && <DescriptionField info={props.achvInfo} number={props.c}/>}
        </div>
    )
}



/* export const achievementsData = {
    "win": {
        "win1": false,
        "win2": false,
        "win3": false,
        "win4": false,
        "win5": false,
        "counter": 0,
        "access": true,
        "pics": win,
    },
    "died": {
        "died1": false,
        "died2": false,
        "died3": false,
        "counter": 0,
        "access": true,
        "pics": died,
    },
    "fight": {
        "fight1": false,
        "fight2": false,
        "fight3": false,
        "fight4": false,
        "fight5": false,
        "counter": 0,
        "access": true,
        "pics": fight,
    },
    "difficulty": {
        "easy": false,
        "normal": false,
        "hard": false,
        "deathmarch": false,
        "counter": 0,
        "access": true,
        "pics": difficulty,
    },
    "health": {
        "health1": false,
        "health2": false,
        "health3": false,
        "health4": false,
        "counter": 0,
        "access": true,
        "pics": health,
    },
    "play": {
        "played1": false,
        "played2": false,
        "played3": false,
        "played4": false,
        "played5": false,
        "played6": false,
        "counter": 0,
        "access": true,
        "pics": play,
    },
    "option": {
        "option1":false,
        "option2":false,
        "option3":false,
        "counter": 0,
        "access": true,
        "pics": option,
    },
    "swamp": {
        "poison": false,
        "counter": 0,
        "access": true,
        "pics": swamp,
    },
    "sword": {
        "sword1":false,
        "sword2": false,
        "counter": 0,
        "access": true,
        "pics": sword,
    },
    "time": {
        "time1": false,
        "time2": false,
        "counter": 0,
        "access": true,
        "pics": time,
    },
    "potion": {
        "potion1": false,
        "potion2": false,
        "potion3": false,
        "counter": 0,
        "access":  true,
        "pics": potion,
    },
    "special": {
        "bait":     false,
        "cup":      false,
        "gem":      false,
        "heart":    false,
        "question": false,
        "star":     false,
        "target":   false,
        "counter": 0,
        "access": true,
        "pics": special,
    },
} */

export const achievementsData = {
    "win": {
      "win1": false,
      "win2": false,
      "win3": false,
      "win4": false,
      "win5": false,
      "counter": 0,
      "access": true,
      "pics": [
        "/static/media/win1.88c715abe2db00c98ae3.png",
        "/static/media/win2.90357d18d2ad9d07d5b7.png",
        "/static/media/win3.612c147ae7a45346acac.png",
        "/static/media/win4.9a7858d3552d42eabb7a.png",
        "/static/media/win5.f934f7ee7f15ebe6bf37.png"
      ]
    },
    "died": {
      "died1": false,
      "died2": false,
      "died3": false,
      "counter": 0,
      "access": true,
      "pics": [
        "/static/media/died1.85690ca7ef96c15c8e2a.png",
        "/static/media/died2.2b6d8f0c67d9195ccc90.png",
        "/static/media/died3.66803641833146f0637e.png"
      ]
    },
    "fight": {
      "fight1": false,
      "fight2": false,
      "fight3": false,
      "fight4": false,
      "fight5": false,
      "counter": 0,
      "access": true,
      "pics": [
        "/static/media/fight1.4773551dddb4d47eb773.png",
        "/static/media/fight2.382d75350901192cd3ce.png",
        "/static/media/fight3.1424aa5af8dcdea50508.png",
        "/static/media/fight4.b4a673de3d55ea683310.png",
        "/static/media/fight5.8be5a5cc26323586da56.png"
      ]
    },
    "difficulty": {
      "easy": false,
      "normal": false,
      "hard": false,
      "deathmarch": false,
      "counter": 0,
      "access": true,
      "pics": [
        "/static/media/1easy.c17184aaee87d89444e0.png",
        "/static/media/2normal.a5fb67a20989bb3ee647.png",
        "/static/media/3hard.74dd14c71fbf17e06c5c.png",
        "/static/media/4deathmarch.6257c2de53f65860b8f1.png"
      ]
    },
    "health": {
      "health1": false,
      "health2": false,
      "health3": false,
      "health4": false,
      "counter": 0,
      "access": true,
      "pics": [
        "/static/media/health1.f991d3bb4fc10e63284f.png",
        "/static/media/health2.b09d030aab370bba0ba3.png",
        "/static/media/health3.8e23640b89ba04383b24.png",
        "/static/media/health4.717e1fe81fb921a07bc7.png"
      ]
    },
    "play": {
      "played1": false,
      "played2": false,
      "played3": false,
      "played4": false,
      "played5": false,
      "played6": false,
      "counter": 0,
      "access": true,
      "pics": [
        "/static/media/played1.2aaca635874b235f6ce4.png",
        "/static/media/played2.3090bcb96a92fa6ba115.png",
        "/static/media/played3.0d556e7cb9a63a101f0e.png",
        "/static/media/played4.bd4ba01632c9e1ee2350.png",
        "/static/media/played5.7f8ce97f27432779e4fc.png",
        "/static/media/played6.6774575856e106770362.png"
      ]
    },
    "option": {
      "option1": false,
      "option2": false,
      "option3": false,
      "counter": 0,
      "access": true,
      "pics": [
        "/static/media/option1.40d60a7f41e567f5b85b.png",
        "/static/media/option2.8ee4913e49e22664e1df.png",
        "/static/media/option3.8794d67461ef3f4181dd.png"
      ]
    },
    "swamp": {
      "poison": false,
      "counter": 0,
      "access": true,
      "pics": [
        "/static/media/poison.ad31b00d2688a468833d.png"
      ]
    },
    "sword": {
      "sword1": false,
      "sword2": false,
      "counter": 0,
      "access": true,
      "pics": [
        "/static/media/sword1.e3d1240c13029aecb145.png",
        "/static/media/sword2.72cd33491b1b65dad095.png"
      ]
    },
    "time": {
      "time1": false,
      "time2": false,
      "counter": 0,
      "access": true,
      "pics": [
        "/static/media/time1.c1b1ee6d0acc9a6fa5ad.png",
        "/static/media/time2.5e06ae80dcd4aba5b7bd.png"
      ]
    },
    "potion": {
      "potion1": false,
      "potion2": false,
      "potion3": false,
      "counter": 0,
      "access": true,
      "pics": [
        "/static/media/potion1.30e5aad0e0c3ef917a06.png",
        "/static/media/potion2.2b0fe43b59541ac2ca96.png",
        "/static/media/potion3.9c597d8fd8c31bad45c9.png"
      ]
    },
    "special": {
      "bait": false,
      "cup": false,
      "gem": false,
      "heart": false,
      "question": false,
      "star": false,
      "target": false,
      "counter": 0,
      "access": true,
      "pics": [
        "/static/media/bait.48b6a7fc4915867bfcfd.png",
        "/static/media/cup.d577e7f02c23e46badef.png",
        "/static/media/gem.314d34e2f80af885f21f.png",
        "/static/media/heart.250617ef75091e7970d1.png",
        "/static/media/question.d0de17ef9d275662ef2d.png",
        "/static/media/star.bbf483ce5227e777f0d7.png",
        "/static/media/target.14d022ce5ba2bcabd60a.png"
      ]
    }
  }

export function resetAccessAchv(){
   Object.entries(data["game"]["achievements"]).forEach(x=>{
    x[1]["access"] = true

   })
}

const achievInfo = {
    "win": [["Escaped!","Win your first Game"],["Dungeon Explorer","Win 5 Games"],["Routine","Win 10 Games"],["Floor Veteran","Win 50 Games"],["Dungeon Master","Win 100 Games"]],
    "died": [["First Time?","Die one Time"],["Pain", "Die 50 Times"], ["Master Of Disaster","Die 100 Times"]],
    "fight": [["Resistance","Win one Fight",],["Tough One","Win 25 Fights"],["Warrior","Win 50 Fights"], ["Monster Hunter","Win 100 Fights"],["Killing Machine","Win 200 Fights"]],
    "difficulty": [["Novice","Win a Game with Difficulty 1"],["Adept","Win a Game with Difficulty 2"],["Profi","Win a Game with Difficulty 3"],["Specialist","Win a Game with Difficulty 4"]],
    "health": [["Vita Vita","Use 10 Vita Potions"], ["My Daily Bread","Use 30 Vita Potions"],["Call Me Doctor","Use 60 Vita Potions"],["Sick Dude!","Use 100 Vita Potions"]],
    "option": [["Option Student","Go to Options 10 Times"], ["Option Expert","Go to Options 50 Times"],["Option Master","Go to Options 100 Times"]],
    "swamp": [["Weird Feeling?","Get poisoned 10 Times"]],
    "play": [["Welcome To The Dungeon","Play your first Game"], ["Another One","Play 2 Games"], ["Step By Step","Play 5 Games"], ["No Way Out","Play 10 Games"],["Never Ending Story","Play 50 Games"],["Depths Of The Dungeon","Play 100 Games"]],
    "sword": [["Squire","Win 20 Fights with the Sword"],["Path Of The Knight","Win 50 Fighs with the Sword"]],
    "time": [["Didn't Skip Leg Day","Complete a Game within 2 min"], ["Speedrunner","Complete a Game within 1 min"]],
    "potion": [["Drinker","Use 5 Potions"],["Alchemist","Use 50 Potions"],["Can Stop Everytime","Use 100 Potions"]],
    "special":[["Sike!","Fool the Minotaur"],["?","?"],["Rich Man","Collect all Gems"],["Not Even A Scratch","Win a Game without getting Damage"],["What Just Happend?","?"],["?","?"],["Not Again","Collide 5 Times with the Enemy"]]
}