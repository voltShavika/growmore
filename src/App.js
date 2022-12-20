import { useState } from 'react';
import QuizContext from './Context';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);
  const [authToken, setAuthToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ExYzVkNGUyZmUwYTNlOGU4Yzc1NjEiLCJpYXQiOjE2NzE1NDY3MDB9.Dwmimq4mfcyTTSO9H39Vf5-0zf1kRb3E3ZB_veSAmAo");
  const [currentLevel, setCurrentLevel] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [question, setQuestion] = useState(null);
  const [levelWiseQuestions, setLevelWiseQuestions] = useState([]);

  const login = () => {

  }

  const logout = () => {

  }
  return (
    <QuizContext.Provider value={{
      user: user, 
      loginStatus: loginStatus,
      authToken: authToken,
      currentLevel: currentLevel,
      setCurrentLevel: setCurrentLevel,
      questionNumber: questionNumber,
      setQuestionNumber: setQuestionNumber,
      score: score,
      setScore: setScore,
      scoreHistory: scoreHistory,
      setScoreHistory: setScoreHistory,
      levelWiseQuestions: levelWiseQuestions,
      setLevelWiseQuestions: setLevelWiseQuestions,
      question: question,
      setQuestion: setQuestion
    }}>
      <Router>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard/>}></Route>
          <Route exact path="/quiz/:quizId" element={<Quiz/>}></Route>
          <Route exact path="/result/:quizId" element={<Result/>}></Route>
        </Routes>
      </Router>

    </QuizContext.Provider>
  );
}

export default App;
