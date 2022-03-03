import logo from './logo.svg';
import styles from './App.module.css';
import Console from './Console';


function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}> 
          Fallout Hacking Game
      </header>
      <Console />
    </div>
  );
}

export default App;
