import { useState } from 'react';
import QuizContext from './Context';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

function App() {
  const [user, setUser] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [currentLevel, setCurrentLevel] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [question, setQuestion] = useState(null);
  const [levelWiseQuestions, setLevelWiseQuestions] = useState([]);

  const login = (token, user, navigate) => {
    setLoginStatus(true);
    setUser(user);
    setAuthToken(token);
    navigate("/dashboard");
  }

  const logout = (navigate) => {
    setLoginStatus(false);
    setUser(null);
    setAuthToken("token");
    navigate("/");
  }
  return (
    <QuizContext.Provider value={{
      user: user, 
      loginStatus: loginStatus,
      authToken: authToken,
      login: login,
      logout: logout,
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
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/dashboard" element={<Dashboard/>}></Route>
          <Route exact path="/quiz/:quizId" element={<Quiz/>}></Route>
          <Route exact path="/result/:quizId" element={<Result/>}></Route>
          <Route exact path="*" element={<Navigate to="/"/>}></Route>
        </Routes>
      </Router>

    </QuizContext.Provider>
  );
}

export default App;
