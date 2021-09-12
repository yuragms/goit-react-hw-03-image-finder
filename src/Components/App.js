import "./App.css";
import React, { Component } from "react";
import SearchBar from "./Searchbar/SearchBar.jsx";

class App extends Component {
  state = {
    data: null,
    loading: false,
    searchFieldvalue: "",
  };

  // https://pixabay.com/api/?q=cat&page=1&key=22652626-da7dc8e3a4ffdfdaea60a5cb5&image_type=photo&orientation=horizontal&per_page=12

  componentDidMount() {
    this.setState({ loading: true });
    setTimeout(() => {
      fetch(
        "https://pixabay.com/api/?q=cat&page=1&key=22652626-da7dc8e3a4ffdfdaea60a5cb5&image_type=photo&orientation=horizontal&per_page=12"
      )
        .then((res) => res.json())
        .then((data) => this.setState({ data }))
        .finally(() => this.setState({ loading: false }));
    }, 2000);
  }

  handleFormSubmit = (searchFieldvalue) => {
    console.log(searchFieldvalue);
    this.setState({ searchFieldvalue });
  };

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {this.state.loading && <h1>Загружаем...</h1>}
        {this.state.data && <div>Тут будет покемон после фетча</div>}
      </div>
    );
  }
}

export default App;
