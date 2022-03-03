import { For } from "solid-js";

import styles from './Prompt.module.css';


function Prompt(props) {
  return (
    <div class={styles.prompt}>
      <For each={props.words}>{(word, i) => {
        let index = i();
        return (
        <>
          {props.fillers[index]}
          <a class={styles.word} href="#" 
            onClick={(e) => props.onWordClick(e, word)}
            onFocus={() => props.onWordFocus(word)}
            onMouseOver={() => props.onWordFocus(word)}
          >{word}</a>
        </>
      )}}</For>
      {props.fillers[8]}
    </div>
  );
}

export default Prompt;
