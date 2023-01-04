// Import components
import Button from "./Button";

import styles from '../components/Result.module.css'

function Result ({ settings, seconds, results, restartTest, dispScore, exitTest }) {
    return(
        <div className={ dispScore ? `${ styles.scorearea } ${ styles["--scorearea"] }` : styles.scorearea }>    
            {dispScore && <h2 className={ styles.heading }>You Scored:</h2>}        
            <ul className={ styles.scorelist }>
                {!dispScore && 
                    (<li className={ styles.score } >Time Left: { settings.seconds - seconds }s</li>)
                }
                <li className={ styles.score }>WPM: { results.wpm }</li>
                <li className={ styles.score }>CPS: { results.cps}</li>
                <li className={ styles.score }>Mistakes: { results.mistake }</li>
                <li className={ `${ styles.score } ${ styles["--score"] }` }>Accuracy: { results.accuracy }%</li>
            </ul>
            {!dispScore && 
                <div>
                    <Button btnFunction={ restartTest } btnText = { "Try Again" } />
                    <Button btnFunction={ exitTest } btnText={"Main Menu"} />
                </div>
            }
            {dispScore && <h2 className={ styles.heading } >Best Score:</h2>}     
            {dispScore &&  
                (<ul className={ styles.scorelist }>
                    <li className={ styles.score }>WPM: { results.wpm }</li>
                    <li className={ styles.score }>CPS: { results.cps}</li>
                    <li className={ styles.score }>Mistakes: { results.mistake }</li>
                    <li className={ `${styles.score} ${styles["--score"]}` }>Accuracy: { results.accuracy }%</li>
                </ul>)
            }
            {dispScore && (
                <div className={styles.btncontainer}>
                    <div className={styles.testsettings}>
                        <h2>Time: {settings.seconds}s</h2>
                        <h2>Difficulty: {settings.text}</h2>
                    </div>
                    <div className={styles.btns}>                        
                        <Button btnFunction={ restartTest } btnText = { "Retake Test" } />
                        <Button btnFunction={ exitTest } btnText={"Main Menu"} />
                    </div>
                </div>
                
            )}
        </div>
    )
}

export default Result;