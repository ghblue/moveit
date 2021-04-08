import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
//useEffect função para disparar efeitos colaterais quando algo acontecer
import styles from '../styles/components/Countdown.module.css'

//variável pra garantir a parada instantanea do countdown (javascript puro)
let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    
    const { startNewChallenge } = useContext(ChallengesContext);
    
    //useState
    const [time, setTime] = useState(0.05*60);

    //esse estado armazena se o countdown está ativo ou não
    const [isActive, setIsActive] = useState(false);

    const [hasFinished, setHasFinished] = useState(false);

    //Math.floor() arredonda pra baixo
    const minutes = Math.floor(time / 60)
    const seconds = time % 60;
    
    /*o minuteLeftRight verifica se nossa string tem 2 caracteres, e se tiver só 1, completa a parte esquerda com zero */ 
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    function startCountdown(){
        setIsActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.5 * 60);
    }


    //useEffect (function, quando executar)
    //javascript puro
    useEffect(() =>{
        if(isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                //recursão para a contagem não parar
                setTime(time - 1)
            }, 1000)
        } else if(isActive && time == 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time] )

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>


        { hasFinished ? (
            
            <button 
            disabled
            className={styles.countdownButton} >
                Ciclo encerrado
           </button>
        ) : (
            <>
                {isActive ? (
                <button type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick ={resetCountdown}>
                    Abandonar ciclo
            </button>
                ) : (
                <button type="button"
                className={styles.countdownButton}
                onClick ={startCountdown}>
                    Iniciar um ciclo
                </button>
                )}
            </>
        )}    
        </div>
    );
}