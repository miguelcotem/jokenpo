import React, { useState } from 'react';
import styles from './body.module.css';

import pedraImg from '../../assets/pedra.png';  
import papelImg from '../../assets/papel.png';  
import tesouraImg from '../../assets/tesoura.png';  

const choices = [
    { name: 'pedra', img: pedraImg },
    { name: 'papel', img: papelImg },
    { name: 'tesoura', img: tesouraImg }
];

function Body() {
    const [playerChoice, setPlayerChoice] = useState(null);
    const [opponentChoice, setOpponentChoice] = useState(null);
    const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });

    const getOpponentChoice = () => {
        return choices[Math.floor(Math.random() * choices.length)];
    };

    const handleChoice = (choice) => {
        const opponentChoice = getOpponentChoice();
        setPlayerChoice(choice);
        setOpponentChoice(opponentChoice);

        if (
            (choice.name === 'pedra' && opponentChoice.name === 'tesoura') ||
            (choice.name === 'papel' && opponentChoice.name === 'pedra') ||
            (choice.name === 'tesoura' && opponentChoice.name === 'papel')
        ) {
            setScore(prevScore => ({ ...prevScore, wins: prevScore.wins + 1 }));
        } else if (choice.name !== opponentChoice.name) {
            setScore(prevScore => ({ ...prevScore, losses: prevScore.losses + 1 }));
        } else {
            setScore(prevScore => ({ ...prevScore, draws: prevScore.draws + 1 }));
        }
    };

    const resetScore = () => {
        setScore({ wins: 0, losses: 0, draws: 0 });
    };

    return (
        <div className={styles.body}>
            <div className="centralizar">
                <div className="alinhamento">
                    <div className="alinhamentoplacar">
                        <div className="centralizarT"><span>Placar</span></div>
                        <div className="alinhamentoH">
                            <div>
                                <div><span>Vencidas</span></div>
                                <div><span>{score.wins}</span></div>
                            </div>
                            <div>
                                <div><span>Derrotas</span></div>
                                <div><span>{score.losses}</span></div>
                            </div>
                            <div>
                                <div><span>Empates</span></div>
                                <div><span>{score.draws}</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="escolha">
                        <div>
                            <div className="bloco2">
                                <img src={playerChoice ? playerChoice.img : null} alt="Sua escolha" />
                            </div>
                        </div>
                        <div>
                            <div className="bloco2">
                                <img src={opponentChoice ? opponentChoice.img : null} alt="Escolha do oponente" />
                            </div>
                        </div>
                    </div>

                    <div className="escolha">
                        {choices.map(choice => (
                            <div className="bloco" key={choice.name}>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleChoice(choice); }}>
                                    <img src={choice.img} alt={choice.name} />
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className="botao">
                    <a href="#" onClick={(e) => { e.preventDefault(); resetScore(); }}>Tente Novamente</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Body;