import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import {Navigate} from 'react-router-dom';
import { API_GET_STUDENT_QUIZES } from '../api';

import Admin from '../components/Admin'
import Container from '../components/Container'
import Student from '../components/Student';
import QuizContext from '../Context'

export default function Dashboard() {
  const {loginStatus, user} = useContext(QuizContext);
  return (
    <Container>
        {
          !loginStatus && <Navigate to="/" />
        }
        {
          user && user.userType == 'Admin' && <Admin/>
        }
        {
          user && user.userType == 'Student' && <Student/>
        }
    </Container>
  )
}
