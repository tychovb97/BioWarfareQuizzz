import React, { useState, useEffect } from "react";

// ---------------------------
// Vraagdata (15 stuks)
// ---------------------------
const QUESTIONS = [
  {
    id: 1,
    type: "mc",
    text: "Wat is een biologisch strijdmiddel?",
    options: [
      "Een bacterie, virus of gif dat expres gebruikt wordt om mensen ziek te maken",
      "Een soort vuurwapen",
      "Een medicijn tegen ziektes",
      "Een verdedigingsmiddel tegen bacteriën",
    ],
    answer: 0,
    points: 7,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6e/Anthraxspores.png",
  },
  {
    id: 2,
    type: "fill",
    text: "Een voorbeeld van een biologisch strijdmiddel is het _______virus.",
    answer: "pokken",
    points: 7,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/42/Smallpox_Evir.gif",
  },
  {
    id: 3,
    type: "mc",
    text: "Waarom worden biologische strijdmiddelen weinig gebruikt?",
    options: [
      "Ze zijn makkelijk te controleren",
      "Ze zijn onvoorspelbaar en gevaarlijk, ook voor je eigen mensen",
      "Ze zijn goedkoop",
      "Ze werken alleen bij dieren",
    ],
    answer: 1,
    points: 7,
  },
  {
    id: 4,
    type: "fill",
    text: "Biologische strijdmiddelen kunnen zich via de _______ verspreiden.",
    answer: "lucht",
    points: 7,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/65/Sneeze.JPG",
  },
  {
    id: 5,
    type: "mc",
    text: "Welk symptoom hoort NIET bij een mogelijke besmetting?",
    options: ["Koorts", "Overgeven", "Spierpijn", "Verhoogde intelligentie"],
    answer: 3,
    points: 7,
  },
  {
    id: 6,
    type: "fill",
    text: "Een van de gevaarlijkste gifstoffen is het _______-toxine.",
    answer: "botulisme",
    points: 7,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f6/Botulinum.jpg",
  },
  {
    id: 7,
    type: "mc",
    text: "Via welke dieren of insecten kunnen ziektes verspreid worden?",
    options: ["Muggen en ratten", "Katten en honden", "Schildpadden", "Vogels alleen"],
    answer: 0,
    points: 7,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/Mosquito_close-up.jpg",
  },
  {
    id: 8,
    type: "fill",
    text: "Een belangrijke maatregel bij een uitbraak is het _______ van patiënten.",
    answer: "isoleren",
    points: 7,
  },
  {
    id: 9,
    type: "mc",
    text: "Wat betekent PBM?",
    options: [
      "Persoonlijke Beschermingsmiddelen",
      "Publieke Beschermingsmethodes",
      "Permanente BesmettingsMaatregelen",
      "Preventieve BeschermingsModules",
    ],
    answer: 0,
    points: 7,
  },
  {
    id: 10,
    type: "fill",
    text: "Hulpverleners dragen vaak beschermende _______ om besmetting te voorkomen.",
    answer: "kleding",
    points: 7,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/14/CDC_Ebola_response.jpg",
  },
  {
    id: 11,
    type: "mc",
    text: "Wat moet je doen om verspreiding te beperken?",
    options: [
      "Handen wassen en desinfecteren",
      "Veel knuffelen",
      "Nooit meer ademen",
      "Je besmette kleding aanhouden",
    ],
    answer: 0,
    points: 7,
  },
  {
    id: 12,
    type: "fill",
    text: "Het inlichten van de _______ dienst is belangrijk bij een uitbraak.",
    answer: "geneeskundige",
    points: 7,
  },
  {
    id: 13,
    type: "mc",
    text: "Welk virus wordt gezien als biologisch strijdmiddel?",
    options: ["Ebola", "Griep", "Waterpokken", "Mazelen"],
    answer: 0,
    points: 7,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1c/Ebola_virus_particles.jpg",
  },
  {
    id: 14,
    type: "fill",
    text: "Het dragen van een _______ helpt om besmette lucht niet in te ademen.",
    answer: "masker",
    points: 7,
  },
  {
    id: 15,
    type: "mc",
    text: "Wat kan paniek veroorzaken bij een biologische aanval?",
    options: [
      "Dat mensen niet weten wie besmet is",
      "Dat er een film wordt gedraaid",
      "Dat iedereen geneest",
      "Dat er regen valt",
    ],
    answer: 0,
    points: 7,
  },
];

// ---------------------------
// Hoofdcomponent
// ---------------------------
export default function BioQuizApp() {
  const [view, setView] = useState("home"); // home, quiz, result
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState("");
  const [scores, setScores] = useState([]);

  const MAX_POINTS = QUESTIONS.reduce((sum, q) => sum + q.points, 0);

  useEffect(() => {
    const saved = localStorage.getItem("quizScores");
    if (saved) {
      setScores(JSON.parse(saved));
    }
  }, []);

  function handleAnswer(q, value) {
    let isCorrect = false;
    if (q.type === "mc" && parseInt(value) === q.answer) {
      isCorrect = true;
    }
    if (
      q.type === "fill" &&
      value.toLowerCase().trim() === q.answer.toLowerCase()
    ) {
      isCorrect = true;
    }

    if (isCorrect) {
      setScore((prev) => prev + q.points);
    }
    setAnswers({ ...answers, [q.id]: value });
    setCurrent((prev) => prev + 1);
  }

  function saveScore() {
    if (!name) return;
    const newScores = [...scores, { name, score }];
    newScores.sort((a, b) => b.score - a.score);
    const top = newScores.slice(0, 10);
    setScores(top);
    localStorage.setItem("quizScores", JSON.stringify(top));
    setView("home");
    setCurrent(0);
    setScore(0);
    setAnswers({});
    setName("");
  }

  if (view === "home") {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">
          Biologische Strijdmiddelen Quiz
        </h1>
        <p className="mb-4">
          Leer op een interactieve manier meer over biologische strijdmiddelen
          en test je kennis!
        </p>
        <button
          onClick={() => setView("quiz")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Start de quiz
        </button>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Top 3 scores</h2>
        <ol className="text-left">
          {scores.slice(0, 3).map((s, i) => (
            <li key={i} className="mb-2">
              🏆 {i + 1}. {s.name} – {s.score} punten
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (view === "quiz") {
    const q = QUESTIONS[current];
    if (!q) {
      setView("result");
      return null;
    }

    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          Vraag {current + 1} / {QUESTIONS.length}
        </h2>
        <p className="mb-4">{q.text}</p>
        {q.image && (
          <img
            src={q.image}
            alt="illustratie"
            className="w-64 mx-auto mb-4 rounded-lg shadow"
          />
        )}

        {q.type === "mc" ? (
          <div className="space-y-2">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(q, idx)}
                className="block w-full text-left border p-2 rounded-lg hover:bg-blue-50"
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <FillQuestion q={q} onSubmit={handleAnswer} />
        )}
      </div>
    );
  }

  if (view === "result") {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Resultaat</h2>
        <p className="mb-4">
          Je score: <strong>{score}</strong> van {MAX_POINTS} punten
        </p>
        <input
          type="text"
          placeholder="Vul je naam in"
          className="border p-2 rounded mb-4 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={saveScore}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Score opslaan
        </button>
      </div>
    );
  }
}

// ---------------------------
// Hulpcomponent invulvraag
// ---------------------------
function FillQuestion({ q, onSubmit }) {
  const [input, setInput] = useState("");

  function handleClick() {
    if (!input) return;
    onSubmit(q, input);
    setInput("");
  }

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
        placeholder="Jouw antwoord..."
      />
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Volgende
      </button>
    </div>
  );
}
