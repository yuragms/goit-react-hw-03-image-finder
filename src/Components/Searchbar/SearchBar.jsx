import style from "./SearchBar.module.css";
import React, { Component } from "react";
import { toast } from "react-toastify";
// import PropTypes from 'prop-types';

class SearchBar extends Component {
  state = {
    searchFieldvalue: "",
  };

  handleFieldChange = (e) => {
    this.setState({ searchFieldvalue: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.searchFieldvalue.trim() === "") {
      toast("Вы ввели пустое поле");
      return;
    }
    this.props.onSubmit(this.state.searchFieldvalue);
    this.setState({ searchFieldvalue: "" });
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <form onSubmit={this.handleSubmit} className={style.SearchForm}>
          <button type="submit" className={style.button}>
            <span className={style.label}>Search</span>
          </button>

          <input
            className={style.input}
            type="text"
            value={this.state.searchFieldvalue}
            onChange={this.handleFieldChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

// SearchBar.propTypes = {

// };

export default SearchBar;
