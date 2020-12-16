import React from "react";
import MultiSelect from "./components/MultiSelect";

const options = [
  { name: "Walter White", value: "walterwhite" },
  { name: "Skyler White", value: "skylerwhite" },
  { name: "Jesse Pinkman	", value: "jessepinkman" },
  { name: "Hank Schrader", value: "hankschrader" },
  { name: "Saul Goodman", value: "saulgoodman" },
  { name: "Gus Fring	", value: "gusfring" },
  { name: "Mike Ehrmantraut", value: "mikeehrmantraut" },
  { name: "Marie Schrader", value: "marieschrader" }
];

class App extends React.Component {
  state = {
    selectedOptions: []
  };
  handleChange = (options) => {
    this.setState(() => {
      return {
        selectedOptions: options
      };
    });
  };

  render() {
    return (
      <div className="wrapper">
        <h1>React Assignment: Multi-select Dropdown Component</h1>
        <div className="container">
          <MultiSelect
            options={options}
            selectedValues={this.state.selectedOptions}
            name="users"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
