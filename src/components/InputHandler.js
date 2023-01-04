import { useEffect } from "react";

function InputHandler( { text, inputHandler, cursorLocation } ) {

  const keydownDetected = (e) => {
    // Prevent default keys that would interfer with typing test (eg. Tab)
    e.preventDefault()

    if(e.key==="CapsLock") return

    if(e.key === "Backspace" && cursorLocation > 0) {
      cursorLocation = cursorLocation - 1;  
      inputHandler(cursorLocation, 'default', true);
    } else if (text[cursorLocation].char === e.key) {
      // Handle correct user input
      cursorLocation = cursorLocation + 1;
      inputHandler(cursorLocation - 1, 'correct', false);
      return;
    } else if (e.key !== 'Shift' && e.key !== 'Backspace') {  
      // Handle mistakes
      cursorLocation = cursorLocation + 1;
      inputHandler(cursorLocation - 1, 'mistake', false);
      return;
    }
  }


  // Listen for user input
  useEffect(() => {
    document.addEventListener('keydown', keydownDetected);
    return () => document.removeEventListener("keydown", keydownDetected);
  }, [keydownDetected]);

  return (
    <></>
  )
}

export default InputHandler;