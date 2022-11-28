import data from './data'
import { updateDb } from '../menu/register'
/* Handle Achievements */
export function handleAchievements(){
}

/* ~-- Add Achievemnts --~ */


/* Achievement for winning x Games */
export function addWinAchv(){
    if(data["game"]["achievements"]["win"]["access"]){
        data["game"]["achievements"]["win"]["access"] = false
        data["game"]["achievements"]["win"]["counter"] +=1
        switch(data["game"]["achievements"]["win"]["counter"]){
            case 1: data["game"]["achievements"]["win"]["win1"] = true
            break
            case 5: data["game"]["achievements"]["win"]["win2"] = true
            break
            case 10: data["game"]["achievements"]["win"]["win3"] = true
            break
            case 50: data["game"]["achievements"]["win"]["win4"] = true
            break
            case 100: data["game"]["achievements"]["win"]["win5"] = true
            break
            default: console.log()
            break
        }
        updateDb()
    }
}

/* Achievement for dying x times */
export function addDiedAchv(){
    if(data["game"]["achievements"]["died"]["access"]){
        data["game"]["achievements"]["died"]["access"] = false
        data["game"]["achievements"]["died"]["counter"] +=1
        switch(data["game"]["achievements"]["died"]["counter"]){
            case 1: data["game"]["achievements"]["died"]["died1"] = true
            break
            case 50: data["game"]["achievements"]["died"]["died2"] = true
            break
            case 100: data["game"]["achievements"]["died"]["died3"] = true
            break
            default: console.log()
            break
        }
        updateDb()
    }
}

/* Achievement for winning a game with a difficulty level*/
export function addDifficultyAchv(x){
    if(data["game"]["achievements"]["difficulty"]["access"]){
        data["game"]["achievements"]["difficulty"]["access"] = false
        switch(x){
            case 1: data["game"]["achievements"]["difficulty"]["easy"] = true
            break
            case 2: data["game"]["achievements"]["difficulty"]["normal"] = true
            break
            case 3: data["game"]["achievements"]["difficulty"]["hard"] = true
            break
            case 4: data["game"]["achievements"]["difficulty"]["deathmarch"] = true
            break
            default: console.log()
            break
        }
        updateDb()
    }
}

/* Achievement for winning x fights against the enemy */
export function addFightAchv(){
    if(data["game"]["achievements"]["fight"]["access"]){
        data["game"]["achievements"]["fight"]["access"] = false
        data["game"]["achievements"]["fight"]["counter"] +=1
        switch(data["game"]["achievements"]["fight"]["counter"]){
            case 1: data["game"]["achievements"]["fight"]["fight1"] = true
            break
            case 25: data["game"]["achievements"]["fight"]["fight2"] = true
            break
            case 50: data["game"]["achievements"]["fight"]["fight3"] = true
            break
            case 100: data["game"]["achievements"]["fight"]["fight4"] = true
            break
            case 200: data["game"]["achievements"]["fight"]["fight5"] = true
            break
            default: console.log()
            break
        }
        updateDb()
    }
}

/* Achievement for using x health potions*/
export function addHealthAchv(){
    data["game"]["achievements"]["health"]["counter"] +=1
    switch(data["game"]["achievements"]["health"]["counter"]){
        case 10: data["game"]["achievements"]["health"]["health1"] = true
        break
        case 30: data["game"]["achievements"]["health"]["health2"] = true
        break
        case 60: data["game"]["achievements"]["health"]["health3"] = true
        break
        case 100: data["game"]["achievements"]["health"]["health4"] = true
        break
        default: console.log()
        break
    }
    updateDb()
}

/* Achievement for clicking options x times */
export function addOptionAchv(){
    data["game"]["achievements"]["option"]["counter"] +=1
    switch(data["game"]["achievements"]["option"]["counter"]){
        case 10: data["game"]["achievements"]["option"]["option1"] = true
        break
        case 50: data["game"]["achievements"]["option"]["option2"] = true
        break
        case 100: data["game"]["achievements"]["option"]["option3"] = true
        break
        default: console.log()
        break
    }
    updateDb()
}

/* Achievement for playing the game x times */
export function addPlayAchv(){
    if(data["game"]["achievements"]["play"]["access"]){
        data["game"]["achievements"]["play"]["access"] = false
        data["game"]["achievements"]["play"]["counter"] +=1
        switch(data["game"]["achievements"]["play"]["counter"]){
            case 1: data["game"]["achievements"]["play"]["played1"] = true
            break
            case 2: data["game"]["achievements"]["play"]["played2"] = true
            break
            case 5: data["game"]["achievements"]["play"]["played3"] = true
            break
            case 10: data["game"]["achievements"]["play"]["played4"] = true
            break
            case 50: data["game"]["achievements"]["play"]["played5"] = true
            break
            case 100: data["game"]["achievements"]["play"]["played6"] = true
            break
            default: console.log()
            break
        }
        updateDb()
    }
}

/* Achievement for using x potions */
export function addPotionAchv(){
    data["game"]["achievements"]["potion"]["counter"] +=1
    switch(data["game"]["achievements"]["potion"]["counter"]){
        case 5: data["game"]["achievements"]["potion"]["potion1"] = true
        break
        case 50: data["game"]["achievements"]["potion"]["potion2"] = true
        break
        case 100: data["game"]["achievements"]["potion"]["potion3"] = true
        break
        default: console.log()
        break
    }
    updateDb()
}

/* Achievement for getting poisend x times */
export function addSwampAchv(){
    data["game"]["achievements"]["swamp"]["counter"] += 1
    if(data["game"]["achievements"]["swamp"]["counter"] === 10){
        data["game"]["achievements"]["swamp"]["poison"] = true
    }
    updateDb()
}

/* Achievement for winning x fights with a sword */
export function addSwordAchv(){
    data["game"]["achievements"]["sword"]["counter"] +=1
    switch(data["game"]["achievements"]["sword"]["counter"]){
        case 20: data["game"]["achievements"]["sword"]["sword1"] = true
        break
        case 50: data["game"]["achievements"]["sword"]["sword2"] = true
        break
        default: console.log()
        break
    }
    updateDb()
}

/* Not done yet */
/* Achievement for winning the gime in x sec/min */
export function addTimeAchv(){
    data["game"]["achievements"]["time"]["counter"] +=1
    switch(data["game"]["achievements"]["time"]["counter"]){
        case 1: data["game"]["achievements"]["time"]["time1"] = true
        break
        case 2: data["game"]["achievements"]["time"]["time2"] = true
        break
        default: console.log()
        break
    }
    updateDb()
}

/* Not done yet */
/* Achievement for special cases */
export function addSpecialAchv(x){
    if(data["game"]["achievements"]["special"]["access"]){
        data["game"]["achievements"]["special"]["access"] = false

        switch(x){
            /* Achievement for fooling the minotaur */
            case 1: data["game"]["achievements"]["special"]["bait"] = true
            break
            /* Achievement for ...*/
            case 2: data["game"]["achievements"]["special"]["cup"] = true
            break
            /* Achievement for collecting all gems*/
            case 3: data["game"]["achievements"]["special"]["gem"] = true
            break
            /* Achievement for getting no damage*/
            case 4: data["game"]["achievements"]["special"]["heart"] = true
            break
            /* Achievement for ...*/
            case 5: data["game"]["achievements"]["special"]["question"] = true
            break
            /* Achievement for ...*/
            case 6: data["game"]["achievements"]["special"]["star"] = true
            break
            /* Achievement for colliding 5 times with the minotaur in one game*/
            case 7: data["game"]["achievements"]["special"]["target"] = true
            break
            default: console.log()
            break
        }
        updateDb()
    }
}