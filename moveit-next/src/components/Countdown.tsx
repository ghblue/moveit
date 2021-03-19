import { useState, useEffect } from 'react';
//useEffect função para disparar efeitos colaterais quando algo acontecer
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
    //useState
    const [time, setTime] = useState(25*60);

    //esse estado armazena se o countdown está ativo ou não
    const [active, setActive] = useState(false);

    //Math.floor() arredonda pra baixo
    const minutes = Math.floor(time / 60)
    const seconds = time % 60;
    
    /*o minuteLeftRight verifica se nossa string tem 2 caracteres, e se tiver só 1, completa a parte esquerda com zero */ 
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    function startCountdown(){
        setActive(true);
    }
    //useEffect (function, quando executar)
    //javascript puro
    useEffect(() =>{
        if(active && time > 0){
            setTimeout(() => {
                //recursão para a contagem não parar
                setTime(time - 1)
            }, 1000)
        }
    }, [active, time] )

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

            <button type="button"
             className={styles.countdownButton}
             onClick ={startCountdown}>
                Iniciar um ciclo
            </button>
        </div>
    );
}