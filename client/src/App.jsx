
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import NavbarLR from "./components/Navbar_Login_Register";
import Footer from "./components/Footer";
import Logout from "./pages/Logout"
import Error from "./pages/Error";
import QuizPage from "./pages/QuizPage";
import QuestionCard from "./components/QuestionCard";
import ScoreCard from "./components/ScoreCard";
import MixedQuestionCard from "./components/MixedQuestionCard";
import Article from "./components/Article";
import News from "./pages/News";
import ReadQuestions from "./components/ReadQuestions";
import Icons from "./pages/Icons";

// Move your layout logic to a separate component
const AppLayout = () => {
  const location = useLocation();
  const showNavbarLR = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/" || location.pathname === "/icons";

  return (
    <div className="flex flex-col min-h-screen">
      {showNavbarLR ? <NavbarLR /> : <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path = "/" element = {<Login/>} />
          <Route path = "/home" element = {<Home/>} />
          <Route path = "/register" element = {<Register/>} />
          <Route path = "/login" element = {<Login/>} />
          <Route path = "/contact" element = {<Contact/>} />
          <Route path= "/logout" element = {<Logout/>} />
          <Route path = "/quizPage" element = {<QuizPage/>} />
          <Route path = "*" element = {<Error/>} />
          <Route path = "/questionCard" element = {<QuestionCard/>} />
          <Route path = "/readQuestions" element = {<ReadQuestions/>} />
          <Route path = "/mixedQuizPage" element = {<MixedQuestionCard/>} />
          <Route path = "/scoreCard" element = {<ScoreCard/>} />
          <Route path = "/article" element = {<Article/>} />
          <Route path = "/news" element = {<News/>} />
          <Route path = "/icons" element = {<Icons/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);

export default App;