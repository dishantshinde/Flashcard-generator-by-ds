import "./styles.css";
import Navbar from "./components/Navbar/Navbar";
import Flashcardhome from "./components/FlashcardHome/Flashcardhome";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Flashcardhome />
    </div>
  );
}
