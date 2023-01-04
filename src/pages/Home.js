// Library imports
import { useState } from "react";
import '../pages/page.css'

// Component imports
// import NavBar from '../components/NavBar';
import KeyboardGraphic from '../components/KeyboardGraphic';
import MainMenu from "../components/MainMenu";
import TypingDisplay from '../components/TypingDisplay';

function Home() {

  const [startTest, setStartTest] = useState({start: false, seconds: 60, text: "Easy"})

  const handleSelecttion = (time, text) => {
    setStartTest({
      start: true,
      seconds: Number(time),
      text: text,
    });
  }

  const exitTest = () => {
    setStartTest({
      start: false,
    });
  }

  return (
    <div className={"main-menu"}>
      {startTest.start && <TypingDisplay testSettings={ startTest } exitTest={ exitTest }/>}
      {!startTest.start && <MainMenu testSelecttion={ handleSelecttion } />}
      <KeyboardGraphic />
    </div>
  )
};

export default Home