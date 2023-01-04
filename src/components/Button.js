
import { useRef } from 'react'

import styles from './Button.module.css'

function Button( { btnFunction, btnText } ) { 
    const ref = useRef(null);

    const handleFocus = () => {
        // Remove focus from button when test is active
        btnText === "Try Again" && ref.current.blur();

        // Call parent component's function if it exists
        btnFunction && btnFunction(false);
    }

    return (
        <button className={styles.btn} ref={ref} onClick={handleFocus}>{ btnText }</button>
    )
}


export default Button;