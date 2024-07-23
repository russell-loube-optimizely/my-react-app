import white from "./optimizely_logo_white.png";
import color from "./optimizely_logo_color.png";
import black from "./optimizely_logo_black.png";
import "./App.css";
import agent from "./services/agent";
import { useState } from "react";
import confetti from "canvas-confetti";

function App() {
  const [state, setState] = useState({
    userId: " ",
    lastName: " ",
  });
  const [text, setText] = useState();
  const [cta, setCta] = useState();
  const [logo, setLogo] = useState(color);
  const [buttonText, setButtonText] = useState();

  const fallbackText = "Optimizely";
  const fallbackCta = "Learn More";
  const fallbackButtonText = "Submit";
  const logoVariations = {
    white: white,
    color: color,
    black: black,
  };

  function handleChange(event) {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const decision = agent
      .decideAll(state.userId, state.country)
      .then((decision) => {
        const flag1Variables = decision.decisions[0].variables;
        setText(flag1Variables.text);
        setCta(flag1Variables.cta);
        setLogo(logoVariations[flag1Variables.logoVariation]);
        console.log("logo", logo);
        setButtonText(flag1Variables.cta);
      });
  };

  const handleCtaClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
    });
    if (state.userId != " ") {
      agent.track(state.userId);
    }
  };

  return (
    <div className="App">
      <form
        style={{
          padding: "10px",
          margin: "0", // Add this to reset any default margins
          display: "flex",
          justifyContent: "flex-end",
        }}
        onSubmit={handleSubmit}
      >
        <label>
          User ID
          <input
            type="text"
            name="userId"
            value={state.userId}
            onChange={handleChange}
          />
        </label>
        <label>
          Country
          <input
            type="text"
            name="country"
            value={state.country}
            onChange={handleChange}
          />
        </label>
        <button type="submit">{buttonText || fallbackButtonText}</button>
      </form>
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          style={{
            height: 300,
            width: 300,
            padding: "100px 100px 100px 100px",
          }}
        />
        <p>{text || fallbackText}</p>
        <button
          style={{
            fontSize: "25px", // Makes the button text larger
            color: "white", // Sets the text color to white
            backgroundColor: "#0037ff", // Sets the background color
            padding: "10px 20px", // Adds some padding for extra size
            border: "none", // Removes the border
            cursor: "pointer", // Changes the cursor on hover
          }}
          onClick={handleCtaClick}
        >
          {cta || fallbackCta}
        </button>
      </header>
    </div>
  );
}

export default App;
