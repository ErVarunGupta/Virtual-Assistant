import React, { createContext, useState } from 'react'
import run from '../gemini';
export const datacontext = createContext()

function UserContext({children}){
    let [speaking ,setSpeaking] = useState(false)
    let [prompt, setPrompt]=useState("listening...")
    let [response, setResponse]=useState(false)

    function speak(text){
        let text_speak=new SpeechSynthesisUtterance(text);
        text_speak.volume=1;
        text_speak.rate=1;
        text_speak.pitch=1;
        text_speak.lang="hi-GB"
        window.speechSynthesis.speak(text_speak)
    }

    async function aiResponse(promt){
        let text = await run(promt);
        let newText = text.replace("**","") && text.replace("*","") && text.replace("google","Varun Kumar")&&text.replace("Google","Varun Kumar");
        // console.log(text);
        setPrompt(newText)
        speak(newText);
        setResponse(true)
        setTimeout(()=>{
            setSpeaking(false)
        },5000)
        
    }
    let speechRecognition=window.speechRecognition || window.webkitSpeechRecognition;
    let recognition=new speechRecognition();
    recognition.onresult=(e)=>{
        let currentIndex = e.resultIndex;
        let transcript = e.results[currentIndex][0].transcript
        // console.log(transcript);
        setPrompt(transcript)
        // aiResponse(transcript)
        takeCommand(transcript.toLowerCase())
    }

    function takeCommand(command){
        if(command.includes("open") && command.includes("youtube")){
            window.open("https://www.youtube.com/","_blank")
            speak("Openning Youtube")
            setResponse(true)
            setPrompt("Openning YouTube...")
            setTimeout(()=>{
                setSpeaking(false)
            },5000)
        }
        else if(command.includes("open") && command.includes("google")){
            window.open("https://www.google.com/","_blank")
            speak("Openning Google")
            setResponse(true)
            setPrompt("Openning Google...")
            setTimeout(()=>{
                setSpeaking(false)
            },5000)
        }
        else if(command.includes("open") && command.includes("linkedin")){
            window.open("https://www.linkedin.com/feed/","_blank")
            speak("Openning LinkedIn")
            setResponse(true)
            setPrompt("Openning LinkedIn...")
            setTimeout(()=>{
                setSpeaking(false)
            },5000)
        }
        else if(command.includes("time")) {
            let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
            speak(time);
            setResponse(true);
            setPrompt(time);
        
            setTimeout(() => {
                setSpeaking(false);
            }, 5000);
        }        
        else if(command.includes("date")){
            let date = new Date().toLocaleDateString(undefined,{day:"numeric", month:"short"})
            speak(date)
            setResponse(true)
            setPrompt(date)
            setTimeout(()=>{
                setSpeaking(false)
            },5000)
        }
        else{
            aiResponse(command);
        }
    }

    let value = {
        recognition,
        speaking,
        setSpeaking,
        prompt,
        setPrompt,
        response,
        setResponse
    }
    return (
        <div>
            <datacontext.Provider value={value}>
            {children}
            </datacontext.Provider>
        </div>
    )
}

export default UserContext;