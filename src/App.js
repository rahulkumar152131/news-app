import Home from "./pages/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import NewsDetails from "./pages/news-details/NewsDetails";
import Signin from "./pages/sign-in/Signin";
import Signup from "./pages/sign-up/Signup";
import Favourite from "./pages/favourite/Favourite";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NavBar />
                  <Home />
                </>
              }
            />
            <Route
              path="/news/:id"
              element={
                <>
                  <NavBar />
                  < NewsDetails />
                </>
              }
            />
            <Route
              path="/favourite"
              element={
                <>
                  <NavBar />
                  < Favourite />
                </>
              }
            />
            <Route
              path="/user/sign-in"
              element={
                <>
                  <NavBar />
                  < Signin />
                </>
              }
            />
            <Route
              path="/user/sign-up"
              element={
                <>
                  <NavBar />
                  < Signup />
                </>
              }
            />

          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
