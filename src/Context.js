import { createContext } from "react";

const QuizContext = createContext({
    user: null,
    loginStatus: null,
    token: null,
    login: null,
    logout: null
})

export default QuizContext;