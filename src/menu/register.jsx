import React, {useState} from 'react'
import data from '../game/data'
import db from '../db.json'
import { achievementsData } from '../game/Elements/achievements'

export const Login = () => {

    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        password: "",
        difficulty: "easy",
        achievements: []
      })
    
    const check = checkUser(formData.name, formData.password)

    function handleSubmit(e){
        e.preventDefault()

        if(check){
            alert("Logged in! :))))))))")
            data["player"]["logged"]["status"] = true
            data["player"]["logged"]["name"] = formData.name
            data["player"]["logged"]["id"] = getDbData(formData.name, "id")
            data["game"]["achievements"] = getDbData(formData.name, "achievements")
            
            console.log(data["player"]["logged"])
        }else{
            alert("Wrong name pr password! :((((((((")
        }
    }

  return (
    <div>
        <form style={{position: "absolute", left: '20%', top: '30%'}} onSubmit={handleSubmit}>
            <h3> Log In </h3>

            <label htmlFor="title">Name</label>
            <input onChange={(e)=> setFormData({...formData, name: e.target.value})} 
            type="text" name="title" id="title" value={formData.name}/>
            <br/>

            <label htmlFor="body">Password</label>
            <input onChange={(e)=> setFormData({...formData, password: e.target.value})} 
            type="password" name="title" id="title" value={formData.password} />
            <br/>

            <input style={{fontFamily: "'Wonder Boy In Monster World', sans-serif"}} type="submit" value="Submit" />
        </form>
    </div>
  )
}

export const Signup = () =>{
    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        password: "",
        difficulty: "easy",
        achievements: achievementsData
      })
    
    const check = checkSignIn(formData.name, formData.password)

    function handleSubmit(e){
        e.preventDefault()
        if(check && formData.name !== "" && formData.password.length >= 4){
            setFormData({...formData, id: db.users.length +1}) 

            data["player"]["logged"]["status"] = true
            data["player"]["logged"]["name"] = formData.name
            data["player"]["logged"]["id"] = getDbData(formData.name, "id")
            console.log("Logged in, logged data: ", data["player"]["logged"])
            
            sendData('POST',formData)
        }else{
            alert("Wrong input!")
        }
    }

  return (
    <div>
        <form style={{position: "absolute", left: '20%', top: '30%'}} onSubmit={handleSubmit}>
            <h3> Sign Up </h3>
            <label htmlFor="title">Name</label>
            <input onChange={(e)=> setFormData({...formData, name: e.target.value})} 
            type="text" name="title" id="title" value={formData.name}/>
            <br/>

            <label htmlFor="body">Password</label>
            <input onChange={(e)=> setFormData({...formData, password: e.target.value})} 
            type="password" name="title" id="title" value={formData.password} />
            <br/>

            <input style={{fontFamily: "'Wonder Boy In Monster World', sans-serif"}} type="submit" value="Submit" />
        </form>
    </div>
  )
}

async function sendData(methd, content){
    await fetch('http://localhost:3000/users/', {
        method: methd,
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(content),
      })
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
         })
         .catch((err) => {
            console.log(err.message, content);
    });
}

function checkUser(name, password){
    var result=false
    db.users.forEach((x)=>{
        if(x.name === name && x.password === password){
            result = true
        }
    })
    return result
}

function checkSignIn(name, password){
    var result=true
    db.users.forEach((x)=>{
        if(x.name === name || password.length < 4){
            result = false
        }
    })
    return result
}

function getDbData(name,value){
    var result = 0
    db.users.forEach((x)=>{
        if(x.name === name){
            result = x[value]
        }
    })
    return result
}

export async function updateDb(){
    if(data["player"]["logged"]["status"]){
        const content = {
            "id": data["player"]["logged"]["id"],
            "name": data["player"]["logged"]["name"],
            "password": getDbData(data["player"]["logged"]["name"], "password"),
            "difficulty": data["game"]["difficulty"],
            "achievements": data["game"]["achievements"]}
            
        console.log("sending data for update...")
        await fetch('http://localhost:3000/users/'+getDbData(data["player"]["logged"]["name"],"id"), {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(content),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message, content);
        });
    }
}