import { createSignal, createEffect, For, Show } from "solid-js";

import Prompt from "./Prompt";

import {getRandomItems, calculateLikeness, getArrayOfFillers} from './utils/string';
import words from './words';
import styles from './Console.module.css';

const [gameWords, setGameWords] = createSignal([]);
const [fillers, setFillers] = createSignal([]);
const [password, setPassword] = createSignal("");
const [activePassword, setActivePassword] = createSignal("");
const [output, setOutput] = createSignal([]);
const [attempts, setAttempts] = createSignal(0);
const [gameActive, setGameActive] = createSignal(true);

createEffect(() => {
  if (attempts() >= 4) {
    setGameActive(false);
  }
});


const onWordClick = (e, word) => {
  e.preventDefault();
  tryPassword(word)
}
const tryPassword = (attempt) => {
  const newOutput = [...output()];
  if (attempt == password()) {
    newOutput.push("ENTRY GRANTED")
    setAttempts(0);
  } else {
    newOutput.push("ENTRY DENIED")
    newOutput.push("LIKENESS=" + calculateLikeness(password(), attempt))
    setAttempts(attempts() + 1);
  }
  setOutput(newOutput)
}


const wordLen = 9;
const filler = 478 - ( (wordLen-4) * 8)

const initialWords = getRandomItems(words.filter(word => word.length == wordLen), 16);
setGameWords(initialWords)
setPassword(initialWords[Math.floor(Math.random()*initialWords.length)])
setFillers([...getArrayOfFillers(filler, 9), ...getArrayOfFillers(filler, 9)])

var hexnum = 5300;

function generateHex() {
  hexnum++;
  return "0x" + hexnum.toString(16);
}



function Console() {
  return (
    <div class={styles.wrapper}>
      <div class={styles.screen}>
      <div class={styles.terminal}>
        <div>
          <For each={new Array(17)}>{(line) =>
            <div>{generateHex()}</div>
          }</For>
        </div>
        <Prompt words={gameWords().slice(0,8)} fillers={fillers().slice(0,9)} onWordClick={onWordClick} onWordFocus={setActivePassword} />
        <div>
          <For each={new Array(17)}>{(line) =>
            <div>{generateHex()}</div>
          }</For>
        </div>
        <Prompt words={gameWords().slice(8)} fillers={fillers().slice(9)} onWordClick={onWordClick} onWordFocus={setActivePassword} />
        <div class={styles.output}> 
          <For each={output()}>{(line) =>
            <div>
              &gt; {line}
            </div>
          }</For>
          <div>
            &gt; {activePassword}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Console;
