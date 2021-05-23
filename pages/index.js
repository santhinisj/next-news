import { Toolbar } from '../components/Toolbar'
import styles from '../styles/Home.module.css'

export  default function Home(){
  return (
    <div className="page-container">
    <Toolbar/>
      <div className={styles.main}>
        <h1>NEXT JS</h1>
        <h3>Here lets study together!</h3>
      </div>
    </div>
  )
}