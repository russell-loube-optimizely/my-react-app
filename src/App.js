import white from "./optimizely_logo_white.png";
import color from "./optimizely_logo_color.png";
import "./App.css";
import agent from "./services/agent";
import { useState } from "react";

function App() {
  const [state, setState] = useState({
    userId: " ",
    lastName: " ",
  });

  const [text, setText] = useState();
  const [cta, setCta] = useState();
  const [buttonText, setButtonText] = useState();
  const fallbackText = "Optimizely";
  const fallbackCta = "Learn More";
  const fallbackButtonText = "Submit";

  function handleChange(event) {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  }

  const addUser = (event) => {
    event.preventDefault();
    const decision = agent
      .decideAll(state.userId, state.country)
      .then((decision) => {
        console.log(decision);
        const flag1Variables = decision.decisions[0].variables;
        const flag2Variables = decision.decisions[1].variables;
        console.log(flag1Variables);
        setText(flag1Variables.text);
        setCta(flag1Variables.cta);
        setButtonText(flag2Variables.buttonText);
      });
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
        onSubmit={addUser}
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
          src={color}
          className="App-logo"
          alt="logo"
          style={{
            height: 300,
            width: 300,
            padding: "100px 100px 100px 100px",
          }}
        />
        <p>{text || fallbackText}</p>
        <a
          className="App-link"
          href="https://youtu.be/dQw4w9WgXcQ?feature=shared"
          target="_blank"
          rel="noopener noreferrer"
        >
          {cta || fallbackCta}
        </a>
      </header>
    </div>
  );
}

export default App;
