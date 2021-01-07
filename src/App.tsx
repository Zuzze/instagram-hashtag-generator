import React, { useState } from "react";
import logo from "./hashtag.png";
import "./App.css";

const NUMBER_OF_HASHTAGS = 30;

const FILTERS: Array<string> = [
  "design",
  "dev",
  "logo",
  "mobile",
  "tablet",
  "graphics",
  "flat",
  "3d"
];

const App: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);
  const [text, setText] = useState<string>("");
  const [numberOfTaggedUsers, setNumberOfTaggedUsers] = useState<number>(10);

  function generateHashtags(): void {
    let newText: string = "";
    setText(newText);
  }

  function updateFilters(filter: string): void {
    const updatedFilters: Array<string> = selectedFilters;
    if (selectedFilters.indexOf(filter) > -1) {
      updatedFilters.filter(f => f !== filter);
    } else {
      updatedFilters.push(filter);
    }
    setSelectedFilters(updatedFilters);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div>
          {FILTERS.map(filter => (
            <span key={filter} style={{ marginRight: "20px" }}>
              <input
                id={filter}
                name={filter}
                type="checkbox"
                onChange={() => updateFilters(filter)}
              />
              <label>{filter}</label>
            </span>
          ))}
        </div>
        <br />
        <div>
          <label>Number of tagged users</label>
          <br />
          <input
            name="users"
            type="number"
            value={numberOfTaggedUsers}
            onChange={e => setNumberOfTaggedUsers(Number(e.target.value))}
          />
        </div>
        <br />
        <button onClick={generateHashtags}>Generate hashtags</button>
        <textarea value={text} />
      </header>
      <main></main>
    </div>
  );
};

export default App;
