
import styles from '../components/MainMenu.module.css'

import Button from '../components/Button'

function MainMenu( { testSelecttion }) {
  let Time = "5"
  let Text = "Easy Text"

  return (
    <div className={styles.menu}>
        <h1 className={styles.heading}>Typing Test - Improve your typing skills!</h1>
        <div>
          <label className={styles.label}>Time: </label>
          <select className={styles.list} onChange={(e) => Time=e.target.value} name="Time" >
              <option value="5">5 Second Test</option>
              <option value="60">1 Minute Test</option>
              <option value="120">2 Minute Test</option>
              <option value="180">3 Minute Test</option>
              <option value="240">4 Minute Test</option>
              <option value="300">5 Minute Test</option>
          </select>
        </div>
        <div>
          <label className={styles.label}>Difficulty: </label>
          <select className={`${styles.list} ${styles["--list"]}`} onChange={(e) => Text=e.target.value} name="Difficulty" >
              <option value="Easy">Easy Text</option>
              <option value="Medium">Medium Text</option>
              <option value="Hard">Hard Text</option>
          </select>
        </div>        
        <Button btnFunction={ () => testSelecttion(Time, Text) } btnText={"Start Test"} />

    </div>
  )
}

export default MainMenu