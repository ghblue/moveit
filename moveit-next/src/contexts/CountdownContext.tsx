import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData{
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: ()=>void;
    resetCountdown: ()=>void;
}

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

//variável pra garantir a parada instantanea do countdown (javascript puro)
let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }) {
    const { startNewChallenge } = useContext(ChallengesContext);
    
    //useState
    const [time, setTime] = useState(0.1*60);

    //esse estado armazena se o countdown está ativo ou não
    const [isActive, setIsActive] = useState(false);

    const [hasFinished, setHasFinished] = useState(false);

    //Math.floor() arredonda pra baixo
    const minutes = Math.floor(time / 60)
    const seconds = time % 60;

    function startCountdown(){
        setIsActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false)
        setTime(0.1 * 60);
    }

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
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}