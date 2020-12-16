import React from "react";
import "./MultiSelect.scss";

class MultiSelect extends React.Component {
  state = {
    options: this.props.options || [],
    selectedOptions: this.props.selectedValues ? this.props.selectedValues : [],
    dropdownActive: false,
    cursor: 0
  };
  multiSelectRef = React.createRef();

  handleDropdownClick = () => {
    this.setState((state) => {
      return {
        cursor: 0,
        dropdownActive: !state.dropdownActive
      };
    });
  };

  handleOptionRemoveClick = (value, e) => {
    e.stopPropagation();
    this.setState(
      (state) => {
        return {
          selectedOptions: state.selectedOptions.filter(
            (item) => item.value !== value
          )
        };
      },
      () => this.props.onChange(this.state.selectedOptions)
    );
  };

  handleOptionChange = (e) => {
    e.persist();
    let newSelectedOptions;
    if (e.target.checked) {
      const selectedItem = this.state.options.find(
        (opt) => opt.value === e.target.value
      );
      newSelectedOptions = [...this.state.selectedOptions, selectedItem];
    } else {
      newSelectedOptions = this.state.selectedOptions.filter(
        (opt) => opt.value !== e.target.value
      );
    }
    this.setState(
      () => {
        return {
          selectedOptions: newSelectedOptions
        };
      },
      () => {
        this.props.onChange(this.state.selectedOptions);
      }
    );
  };

  handleMousedown = (e) => {
    e.stopPropagation();
    if (
      this.multiSelectRef.current &&
      !this.multiSelectRef.current.contains(e.target)
    ) {
      if (this.state.dropdownActive) {
        this.setState((state) => {
          return {
            dropdownActive: !state.dropdownActive
          };
        });
      }
    }
  };

  isChecked = (value) => {
    return this.state.selectedOptions.find((item) => item.value === value)
      ? true
      : false;
  };
  componentDidMount() {
    this.props.onChange(this.state.selectedOptions);
    document.addEventListener("mousedown", this.handleMousedown);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleMousedown);
  }
  render() {
    return (
      <div className="container">
        <div
          className={`multiselect-wrapper ${
            this.state.dropdownActive ? "is-active" : ""
          }`}
          ref={this.multiSelectRef}
        >
          <div
            className="multiselect__control"
            onClick={this.handleDropdownClick}
          >
            <span>Select User</span>
            <span
              className={`multiselect__arrow-icon fa ${
                this.state.dropdownActive ? "fa-chevron-up" : "fa-chevron-down"
              }`}
            ></span>
          </div>
          <div
            className={`multiselect__result-area ${
              this.state.dropdownActive ? "is-active" : ""
            }`}
          >
            <ul className="multiselect-results">
              {this.state.options.map((option, index) => (
                <li
                  key={option.value}
                  className={`multiselect-results__item ${
                    this.isChecked(option.value) ? "is-active" : ""
                  } ${index === this.state.cursor ? "is-highlighted" : ""}`}
                >
                  <input
                    type="checkbox"
                    onChange={this.handleOptionChange}
                    className="custom-checkbox"
                    id={`opt-${option.value}`}
                    value={option.value}
                    checked={this.isChecked(option.value)}
                  />
                  <label
                    htmlFor={`opt-${option.value}`}
                    className="custom-checkbox-label"
                  >
                    {option.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="info">
          <section>
            <div className="info__title">Selected options:</div>
            <ul className="multiselect-choices">
              {this.state.selectedOptions.map((option) => (
                <li key={option.value} className="multiselect-choices__item">
                  {option.name}
                  <span
                    className="multiselect__remove-icon fa fa-times"
                    onClick={(e) =>
                      this.handleOptionRemoveClick(option.value, e)
                    }
                  ></span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    );
  }
}

export default MultiSelect;
