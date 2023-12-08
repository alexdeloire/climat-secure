import { useState } from "react";
import { Typography } from "@mui/material";

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

    {
        question: "Le dérèglement climatique est une réalité parfois difficile à accepter, pourtant rien ne sert de se bercer d'illusions. Au contraire, il faut être conscient des problématiques environnementales pour s'engager dans une démarche de contribution à la neutralité carbone efficace (Mesurer, Réduire, Compenser). Capitaine Carbone a recensé 10 idées reçues sur le climat réfutées par la science pour bien comprendre l'urgence.",
        answers: [
            { text: "Vrai", correct: false },
            { text: "Faux", correct: true },
        ],
        explication: "Le dérèglement climatique est une réalité difficile à accepter, et il est essentiel de comprendre les problématiques environnementales pour s'engager dans une démarche de contribution à la neutralité carbone efficace."
    },
    {
        question: "Les changements climatiques ont toujours existé et ce n’est pas si grave !",
        answers: [
            { text: "Vrai", correct: false },
            { text: "Faux", correct: true },
        ],
        explication: "La Terre a connu plusieurs périodes de refroidissement et de réchauffement, mais la vitesse actuelle du réchauffement est beaucoup plus rapide que les phénomènes observés au cours des 800 000 dernières années."
    },
    {
        question: "Le CO2 n’a guère d’effet sur l’atmosphère !",
        answers: [
            { text: "Vrai", correct: false },
            { text: "Faux", correct: true },
        ],
        explication: "Le CO2 a un effet significatif sur l'atmosphère en tant que gaz à effet de serre, contribuant au réchauffement climatique. Même en petite quantité, il a un impact important."
    },
    {
        question: "Un glacier qui disparaît au Groenland ne pourra jamais inquiéter la France !",
        answers: [
            { text: "Vrai", correct: false },
            { text: "Faux", correct: true },
        ],
        explication: "La disparition des glaciers a des répercussions mondiales, notamment sur la montée du niveau de la mer. Cela peut affecter des régions éloignées, y compris la France."
    },
    {
        question: "La compensation carbone obligatoire permettra de revenir à la normale !",
        answers: [
            { text: "Vrai", correct: false },
            { text: "Faux", correct: true },
        ],
        explication: "La compensation carbone seule ne suffira pas à revenir à la normale. C'est l'un des leviers, mais des actions individuelles et collectives sont nécessaires pour atteindre la neutralité carbone."
    },
    {
        question: "Les modèles climatiques sont trop sensibles au dioxyde de carbone et donc inexacts !",
        answers: [
            { text: "Vrai", correct: false },
            { text: "Faux", correct: true },
        ],
        explication: "Il existe de nombreux modèles climatiques, et bien que la complexité des phénomènes climatiques rende difficile une certitude à 100%, la cohérence des résultats sur plusieurs modèles est importante."
    },
    {
        question: "Pour absorber le CO2, il suffit de planter de nouveaux arbres partout !",
        answers: [
            { text: "Vrai", correct: false },
            { text: "Faux", correct: true },
        ],
        explication: "Bien que les arbres soient d'excellents puits de carbone, ils ne peuvent pas absorber tout le CO2 présent dans l'atmosphère à eux seuls. D'autres solutions alternatives existent."
    },
    {
        question: "Il est trop tard pour sensibiliser tout le monde aux économies d’énergies !",
        answers: [
            { text: "Vrai", correct: false },
            { text: "Faux", correct: true },
        ],
        explication: "Sensibiliser à l'économie d'énergie est toujours pertinent, même si une partie de la population n'a pas encore été éduquée. Des initiatives, telles que l'École des Hautes Études de la Transition Énergétique, contribuent à la sensibilisation."
    },
    {
        question: "Le réchauffement climatique est dû au soleil",
        answers: [
            { text: "Vrai", correct: false },
            { text: "Faux", correct: true },
        ],
        explication: "Le réchauffement climatique n'est pas uniquement dû au soleil. Le forçage radiatif dû aux émissions d'origine humaine est la cause principale du réchauffement."
    },
];


const Game = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [hasGoodAnswer, setHasGoodAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
  
    const handleAnswerClick = (correct) => {
      if (correct) {
        setHasGoodAnswer(true);
        setScore((prevScore) => prevScore + 1);
      }
      setShowExplanation(true);
    };
  
    const handleNextClick = () => {
      setShowExplanation(false);
      setHasGoodAnswer(false);
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    };
  
    return (
        <div className="Contenu">
        {currentQuestion > 10 || currentQuestion > questions.length ?
            <p>
                Tu as {score} / 10
            </p>
        : <>
            {currentQuestion === 0 ? (
            <>
                <p>A toi de jouer</p>
                <button className="answer" onClick={() => setCurrentQuestion(1)}>Commencer</button>
            </>
            ) : (
            <>
                <p>Ton score : {score}</p>
                <p>{questions[currentQuestion - 1].question}</p>
                {questions[currentQuestion - 1].answers.map((answer, index) => (
                <button
                    className={`answer ${showExplanation && answer.correct ? 'correct' : showExplanation && !hasGoodAnswer && !answer.correct ? 'incorrect' : ''}`}
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
                    <Typography align='justify'>{questions[currentQuestion - 1].explication}</Typography>
                    <button className="answer"  onClick={handleNextClick}>Suivant</button>
                </div>
                )}
            </>
            )}
        </>}
      </div>
    );
  };

export default Game;
