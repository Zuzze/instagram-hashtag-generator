import React, { useState, useEffect } from "react";
import logo from "./hashtag.png";
import "./App.css";
import ThreeScene from "./components/ThreeScene.jsx";
import { HASHTAGS, USERS } from "./hashtags";

const NUMBER_OF_HASHTAGS = 30;

const FILTERS: Array<string> = [
  "design",
  "web",
  "app",
  "illustration",
  "logo",
  "flat",
  "3d",
  "tips"
];

const App: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);
  const [text, setText] = useState<string>("");
  const [tagPool, setTagPool] = useState<Array<string>>([]);
  const [userPool, setUserPool] = useState<Array<string>>([]);
  const [numberOfTaggedUsers, setNumberOfTaggedUsers] = useState<number>(10);

  function generateHashtags(filters: Array<string>): void {
    console.log("generating", filters);
    let newText: string = "";
    let tags: Array<string> = [];
    let users: Array<string> = [];

    for (let filter of filters) {
      tags = tags.concat(HASHTAGS[filter]);
      users = users.concat(USERS[filter]);
    }
    console.log("all", tags);
    console.log("user", users);
    setText(newText);
    setTagPool(tags);
    setUserPool(users);
    generateRandom(tags, users);
  }

  function generateRandom(hashtags: Array<string>, users: Array<string>) {
    const generatedTags: Array<string> = [];
    console.log("raw users", users);
    // hashtags
    while (
      generatedTags.length < NUMBER_OF_HASHTAGS &&
      generatedTags.length < hashtags.length
    ) {
      const randomIndex = Math.floor(Math.random() * hashtags.length) + 1;
      if (generatedTags.indexOf(hashtags[randomIndex]) === -1) {
        generatedTags.push(hashtags[randomIndex]);
      }
    }

    const generatedUsers: Array<string> = [];
    // users
    while (
      generatedUsers.length < numberOfTaggedUsers &&
      generatedUsers.length < users.length
    ) {
      const randomIndex = Math.floor(Math.random() * users.length) + 1;
      if (generatedUsers.indexOf(users[randomIndex]) === -1) {
        generatedUsers.push(users[randomIndex]);
      }
    }
    console.log("USERS", generatedUsers);
    setText(generatedTags.join(" ") + " " + generatedUsers.join(" "));
  }

  function updateFilters(filter: string): void {
    let updatedFilters: Array<string> = selectedFilters;
    if (selectedFilters.indexOf(filter) > -1) {
      updatedFilters = updatedFilters.filter(f => f !== filter);
    } else {
      updatedFilters.push(filter);
    }
    setSelectedFilters(updatedFilters);
    generateHashtags(updatedFilters);
    console.log("filters", updatedFilters);
  }

  function handleTaggedUserChange(count: string) {
    setNumberOfTaggedUsers(Number(count))
    generateHashtags(selectedFilters);
  }

  return (
    <div className="App">
      <ThreeScene />
      <header className="App-header">
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
            type="range"
            value={numberOfTaggedUsers}
            min="0"
            max="30"
            step="5"
            list="steplist"
            onChange={(e) => handleTaggedUserChange(e.target.value)}
          />
          <datalist id="steplist">
            <option>0</option>
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
            <option>25</option>
            <option>30</option>
          </datalist>
        </div>
        <p>{numberOfTaggedUsers}</p>
        <br />
        <div>
          <p>
            Your random generator pool has {tagPool.length} hashtags and{" "}
            {userPool.length} accounts to tag
          </p>
        </div>
        <p>Your description</p>
        <textarea value={text} className="result" />
      </header>
      <main></main>
    </div>
  );
};

export default App;
