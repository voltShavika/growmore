import { useState } from 'react';
import QuizContext from './Context';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Quiz from './pages/Quiz';
import Result from './pages/Result';

function App() {
  const [user, setUser] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(5);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [question, setQuestion] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);
  const [token, setToken] = useState("");

  const login = () => {

  }

  const logout = () => {

  }
  return (
    <QuizContext.Provider value={{
      user: user,  
      currentLevel: currentLevel,
      setCurrentLevel: setCurrentLevel,
      questionNumber: questionNumber,
      setQuestionNumber: setQuestionNumber,
      score: score,
      setScore: setScore,
      scoreHistory: scoreHistory,
      setScoreHistory: setScoreHistory,
      question: question,
      setQuestion: setQuestion
    }}>
      <Router>
        <Routes>
          <Route exact path="/quiz" element={<Quiz/>}></Route>
          <Route exact path="/result" element={<Result/>}></Route>
        </Routes>
      </Router>

    </QuizContext.Provider>
  );
}

export default App;
