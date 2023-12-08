import { useState } from "react";

const questions = [
    {
        question: "Le réchauffement climatique est uniquement dû au soleil ?",
        answers: [
            { text: "Vrai", correct: false },
            { text: "Faux", correct: true },
        ],
        explication: "Il est clairement établi que le soleil n'est pas la seule cause du réchauffement climatique qui menace la planète. Le forçage radiatif, c'est-à-dire la différence entre la puissance radiative reçue et la puissance radiative émise par un système climatique donné, est ce qui permet de comprendre les causes réelles du réchauffement. Le forçage radiatif dû aux cycles solaires est estimé à 0,1 W/m². Celui dû aux émissions d'origine humaine est de 3 W/m². La cause principale est donc bien l'Homme"
    },

    {
        question: "Quelques degrés ou centimètres de plus ou de moins, ça ne change rien !" ,
        answers: [
            { text: "Vrai", correct: false },
            { text: "Faux", correct: true },
        ],
        explication: "De degrés en centimètres, d'hectares en centaines de mètres, le réchauffement climatique a des conséquences dramatiques sur la planète. En quasiment 100 ans, le Glacier d’Ossoue (France) a perdu 590 mètres et sa superficie s'est réduite de 64%, passant de 90 hectares en 1924 à 32 hectares en 20196. La date de migration de certains oiseaux transsahariens a été avancée de 6,5 jours ces 30 dernières années. Les vendanges en France ont lieu 15 jours plus tôt qu'il y a 40 ans. L'augmentation moyenne de la température en France métropolitaine est de +1,19°C sur la période 2000-2009 par rapport à la référence 1961-1990. Par ailleurs, selon les études du Giec, l'élévation du niveau de la mer au 21e siècle sera entre 0,29 à 0,59 m pour un scénario à faibles émissions de gaz à effet de serre et de 0,61 à 1,10 m pour un scénario à fortes émissions. Cependant, plusieurs études récentes basées sur des modèles, des évaluations d'experts et des évaluations nationales annoncent une montée des eaux bien supérieure, entre 1,5 et 2,5 m"
    },

];


const Game = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
  
    const handleAnswerClick = (correct) => {
      if (correct) {
        setScore((prevScore) => prevScore + 1);
      }
      setShowExplanation(true);
    };
  
    const handleNextClick = () => {
      setShowExplanation(false);
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    };
  
    return (
      <div className={currentQuestion >= 2 ? 'mouse-animation' : ''}>
        {currentQuestion > 10 || currentQuestion > questions.length ?
            <p>
                Tu as {score} / 10
            </p>
        : <>
            {currentQuestion === 0 ? (
            <>
                <p>A toi de jouer</p>
                <button onClick={() => setCurrentQuestion(1)}>Commencer</button>
            </>
            ) : (
            <>
                <p>Ton score : {score}</p>
                <p>{questions[currentQuestion - 1].question}</p>
                {questions[currentQuestion - 1].answers.map((answer, index) => (
                <button
                    className={`answer ${showExplanation && answer.correct ? 'correct' : showExplanation && !answer.correct ? 'incorrect' : ''}`}
                    key={index}
                    onClick={() => handleAnswerClick(answer.correct)}
                    disabled={showExplanation}
                >
                    {answer.text}
                </button>
                ))}
                    
                {showExplanation && (
                <div>
                    <p>Bonne réponse: {questions[currentQuestion - 1].answers.find((answer) => answer.correct).text}</p>
                    <p>{questions[currentQuestion - 1].explication}</p>
                    <button onClick={handleNextClick}>Suivant</button>
                </div>
                )}
            </>
            )}
        </>}
      </div>
    );
  };

export default Game;
