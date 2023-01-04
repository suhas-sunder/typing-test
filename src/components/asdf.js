import { useEffect } from "react";

function InputHandler( { text, inputHandler, cursorLocation } ) {

  const keydownDetected = (e) => {
    // Prevent default keys that would interfer with typing test (eg. Tab)
    e.preventDefault()

    if(e.key === "Backspace" || e.key==="CapsLock") return

    if (text[cursorLocation].char === e.key) {   
      // Handle correct user input
      cursorLocation = cursorLocation + 1;
      inputHandler(cursorLocation - 1, 'correct', false);
    } else if (e.key !== 'Shift') {    
      // Handle mistakes
      cursorLocation = cursorLocation + 1;
      inputHandler(cursorLocation - 1, 'mistake', false);
    }
  }

  const handleDelete = (e) => {
    e.preventDefault()

    if(e.key === "Backspace" && cursorLocation > 0) {
      cursorLocation = cursorLocation - 1;  
      inputHandler(cursorLocation, 'default', true);
    }
  }

  // Listen for user input
  useEffect(() => {
    document.addEventListener('keyup', keydownDetected);
    return () => document.removeEventListener("keyup", keydownDetected);
  })

  useEffect(() => {
    document.addEventListener('keydown', handleDelete);
    return () => document.removeEventListener("keydown", handleDelete);
  })

  return (
    <></>
  )
}

export default InputHandler;