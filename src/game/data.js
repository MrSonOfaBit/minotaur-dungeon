import dungeonBg from '../pics/gamePics/dungeonBg.gif'
import snowCastle from '../pics/gamePics/gameBg.gif'
import death from '../pics/gamePics/Ice Lv/death.gif'
import minotaur from '../pics/gamePics/minotaur2.gif'
import dungeonFight from '../pics/fightPics/fightBg.png'
import iceFight from '../pics/fightPics/iceFight.png'
import snowFall from '../pics/gamePics/Ice Lv/schnee.gif'
import swampBg from '../pics/gamePics/Swamp Lv/swampBg.gif'
import swampFight from '../pics/fightPics/swampFightBg.jpg'
import ghoul from '../pics/gamePics/Swamp Lv/swampMonster.gif'
import rain from '../pics/gamePics/Swamp Lv/rain.gif'
import { achievementsData } from './Elements/achievements'

export default {
    "game":{
        "start": false,
        "newLevel": false,
        "difficulty": 1,
        "end": "none",
        "level":{
            1: {
                "background": dungeonBg,
                "fightBackground": dungeonFight,
                "falling": "",
                "fightStyle":{
                    "enemy": "fight-enemy",
                    "player": "fight-player",
                },
            },
            2: {
                "background": snowCastle,
                "fightBackground": iceFight,
                "falling": snowFall,
                "fightStyle":{
                    "enemy": "fight-enemy",
                    "player": "fight-player",
                },
            },
            3:{
                "background": swampBg,
                "fightBackground": swampFight,
                "falling": rain,
                "fightStyle":{
                    "enemy": "fight-enemySwamp",
                    "player": "fight-playerSwamp",
                },
            },
        },
        "selected lv": 1,
        "achievements": achievementsData,
        "fight": false,
        "fightEnd": false,
        "gamePause": false,
        "recentFight": false,
        "fightNote": "",

        "maze": [],
        "huntPath":[],
        "steps": 0,
        "gatePosition": 0,
    },
    "player":{
        "logged": {
            status: false,
            name: "",
            id: 0,
        },
        "playerPosition": 0,
        "playerCor": [],
        "item" : "none",
        "itemPic": "none",

        "poison": false,
        "burned": false,
        "frozen": false,

        "potion": true,
        "inventory": {
            "aqua": {
               "list":[],
               "count": 0,
            },
            "potentia":[],
            "antidotum":[],
            "ventus":[],
            "armis":[],
            "vita":[],
        },

        "itemMessage": 0,
        "currentItemUse":[],

        "keys" : 8,
        "collected keys": [],

        "gems": 0,
        "collected gems": [],

        "magmaFields": [],

        "health": 120,
        "attack state": "none",
        "aim": "none",
    },
    "minotaur":{
        "minotaurposition": 135,
        "minotaurCor": [],
        "minotaurOldPos": 0,
        "rest": 0,

        "phase": "search",
        "mode": "easy",

        "health": 100,
        "attack state": "none",
        "type": {
            1: minotaur,
            2: death,
            3: ghoul,
        },
        "name":{
            1: "Minotaur",
            2: "Death",
            3: "Ghoul",
        }
    },
}