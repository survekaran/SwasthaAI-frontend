import Auth from "./component/LoginSignup";
import ChatBot from "./component/ChatBot";
import "./theme.css";

export default function App() {
  return (
    <>
      <Auth />
      <ChatBot />
    </>
  );
}