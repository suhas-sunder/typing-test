// Library imports
import { useState, useEffect, useRef } from "react";

// Import components
import Result from "./Result";
import Button from "./Button";
import TextBox from "./TextBox";
import animalFacts from "../data/facts/animalFacts.js"

import styles from '../components/TypingDisplay.module.css'

const TypingDisplay = ( { testSettings, exitTest } ) => {
  //  const placeholderTxt = "Did you know that the human nose can detect over 1 trillion different scents? That's right, the human sense of smell is incredibly sophisticated and plays a vital role in our daily lives. Our ability to smell helps us to identify and distinguish between different odors, and it can even influence our mood and behavior. The sense of smell is controlled by a small patch of tissue located in the upper part of the nasal cavity, called the olfactory epithelium. This tissue contains millions of specialized cells called olfactory receptor neurons, which are responsible for detecting and identifying different odors. When we breathe in an odor, the molecules of the scent bind to these receptor cells, which sends a signal to the brain to interpret the scent. The human nose is highly sensitive and can detect a wide range of odors, from the pleasant and pleasing to the unpleasant and repellent. Our sense of smell is closely linked to our memories and emotions, and certain scents can trigger strong memories or feelings. For example, the scent of freshly baked cookies may bring back happy memories of childhood, while the scent of smoke may trigger feelings of fear or anxiety. The sense of smell is also important for our survival and well-being. It helps us to identify and avoid potential dangers, such as spoiled food or gas leaks, and it can even influence our appetite and food choices. In addition, certain scents, such as lavender and peppermint, have been shown to have calming and relaxing effects, which may explain why they are often used in aromatherapy and other relaxation techniques. Overall, the human sense of smell is a remarkable and essential part of our lives, and it is worth taking the time to appreciate and enjoy the various scents that we encounter in our daily lives."

  const [text, setText] = useState([]);
  const [seconds, setSeconds] = useState(0);  
  const [cursorPos, setCursorPos] = useState(0);
  const [results, setResults] = useState({wpm: 0, cps: 0, mistake: 0, accuracy: 0, charsTyped: 0});
  const [dispScore, setDispScore] = useState(false);
  const [placeholderTxt, setPlaceholderTxt] = useState(animalFacts.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 4).map(item => item.paragraph).join(" "));
  const [prevMistakes, setPrevMistakes] = useState(0);
  const [prevCharsTyped, setPrevCharsTyped] = useState(0);
  
 
  const timer = useRef(0);
  const lastSentenceReached = useRef(false)
  const displayTextIndex = useRef(0);
  const startClock = useRef(true);
  const settings = useRef(testSettings);
  
  
  let charArr = []
  let sentenceArr = []
  // const placeholderTxt = animalFacts.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 4).map(item => item.paragraph);  
  // const charArr = placeholderTxt[displayText.current].split("").map(char => char);

  const dispRemainingTxt = () => {
    const arrOfSentences = placeholderTxt.replaceAll(".", ".~").replaceAll("?", ".~").split("~");
    // Extract max 3 sentences from paragraph for display
    for(let i = 0; i < 3; i++){
      if(displayTextIndex.current <= arrOfSentences.length - 1) {
        console.log(displayTextIndex.current, arrOfSentences.length - 1)
        sentenceArr.push(arrOfSentences[displayTextIndex.current]);
        // Convert sentences to chars 
        charArr = sentenceArr.join("").split("").map(char => char);
        displayTextIndex.current++;

        if(displayTextIndex.current === arrOfSentences.length - 1) lastSentenceReached.current = true;
      } 
      
    }        
  }

   
  const assignTxt = (resetPos) => { 
    // Reset cursor position    
    setCursorPos(resetPos);

    // Reset text
    setText([]);
    
    // Store each char as object with properties 
    charArr.forEach((char, index) => 
      setText(prevState => 
        [...prevState, {char: (char === "~" ? " " : char), status: 'default', cursorId: index}]
    ));
  };

  const charState = (cursorLocation, charStatus) => {
    
    // Store right and wrong char input status
    setText(prevState => prevState.map(char => (
      char.cursorId === cursorLocation
        ? {...char, status: charStatus}
        : char
    )));   

  
        // Check if user started typing
        if(startClock.current) handleStart(true);
        startClock.current = false;
    }

    
    const scoreHandler = () => { 
      // Calculate stats
      const charsTyped = text.filter(char => char.status !== 'default').length + prevCharsTyped;
      const mistakes = text.filter(char => char.status === 'mistake').length + prevMistakes;
      const wpm = Math.round(((charsTyped)/5)/(seconds/60));
      const cps = Math.round(charsTyped/(seconds/60));
      const accuracy = Math.round(((charsTyped - mistakes)/charsTyped) * 100)
       
      // Update all stats
      setResults(prevState => ({...prevState, 
        mistake: mistakes, 
        wpm: isNaN(wpm) ? 0 : wpm,
        cps: isNaN(cps) ? 0 : cps,
        accuracy: isNaN(wpm) ? 0 : accuracy,
        charsTyped: charsTyped,
      }));   
       

    if(text.length === cursorPos && text.length !== 0) {
     // When all text is typed load next paragraph or end test
     if(lastSentenceReached.current) {
        stopTimer(false)
      } else {
        setPrevMistakes(mistakes);
        setPrevCharsTyped(charsTyped);
        dispRemainingTxt();
        assignTxt(1); 
      };
    }
  }

  const startTimer = () => {
    timer.current = setInterval(() => {
      setSeconds(prevState => prevState + 1);
    }, 1000)
  }

  const stopTimer = (restartBtn) => {
    scoreHandler();
    
    // Reset timer
    clearInterval(timer.current);
    timer.current = 0;

    // Reset text & score
    startClock.current = true;

    // Restart test or display score
    if(restartBtn) {
      // Generate new para and reset text index
      setPlaceholderTxt(animalFacts.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 4).map(item => item.paragraph).join(" "));
      displayTextIndex.current = 0;
      // Display a small portion of para
      dispRemainingTxt()
      assignTxt(0);
      // Reset timer and score
      setSeconds(0);
      setDispScore(false);
      setPrevMistakes(0);
      setPrevCharsTyped(0);
      lastSentenceReached.current = false;
    } else {      
      setDispScore(true);
    } 
  }

  const handleStart = (start) => {
    // Start/stop clock 
    start ? startTimer(start) : stopTimer(true);
  }

  useEffect(() => {
    scoreHandler();
  }, [text]);

  useEffect(() => {
    if(seconds === settings.current.seconds) stopTimer(false);
  }, [seconds])
 
  useEffect(() => {
    dispRemainingTxt();
    assignTxt(0);
  }, []);

  return (
    <div className={styles.disp}>      
      {!dispScore && <TextBox text={ text } charState={ charState } cursorPos={ cursorPos } setCursorPos={ setCursorPos } />}
      <Result settings={ settings.current } seconds={ seconds } results={ results } restartTest={handleStart} dispScore={ dispScore } exitTest={ exitTest }/>
      {/* <Button btnFunction={ exitTest } btnText={"Main Menu"} /> */}
    </div>
  )
}

export default TypingDisplay;