
// CSS modules
import styles from './TextBox.module.css'

// Import components
import InputHandler from './InputHandler';

const TextBox = ( {text, charState, setCursorPos, cursorPos } ) => {
  
 
  const inputHandler = (cursorLocation, charStatus, isDeleting) => {
    // Udpate cursor location
    setCursorPos(isDeleting ? cursorLocation : cursorLocation + 1);

    // Update user input status for each char
    charState(cursorLocation, charStatus) 
  };

  return (
    <div className={styles.textarea}>
      {text.map(char => <span key={char.cursorId} className={styles[char.cursorId === cursorPos ? 'activeCursor' : char.status]}>{char.char}</span>)}
      <InputHandler text={text} inputHandler={inputHandler} cursorLocation={ cursorPos }/>
    </div>
  )
}

export default TextBox;  