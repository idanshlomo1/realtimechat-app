import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignInPage from "./pages/sign-in/SignInPage";
import SignUpPage from "./pages/sign-up/SignUpPage";
import { useAuthContext } from "./context/AuthContext"; // Import the custom hook

function App() {
  const { authUser } = useAuthContext(); // Now use the context inside your component

  return (
    <>
      <main className="p-4 h-screen flex items-center justify-center bg-[url('/bg.png')] bg-cover bg-center bg-fixed bg-no-repeat">
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="sign-in" />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={authUser ? <Navigate to="/" /> : <SignUpPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
