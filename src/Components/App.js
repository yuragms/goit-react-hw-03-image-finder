import "./App.css";
import React, { Component } from "react";
import SearchBar from "./Searchbar/SearchBar.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageGallery from "./ImageGallery/ImageGallery.jsx";

class App extends Component {
  state = {
    data: null,
    loading: false,
    searchFieldvalue: "",
    error: null,
  };

  // https://pixabay.com/api/?q=cat&page=1&key=22652626-da7dc8e3a4ffdfdaea60a5cb5&image_type=photo&orientation=horizontal&per_page=12

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const prevFieldvalue = prevState.searchFieldvalue;
    const nextFieldvalue = this.state.searchFieldvalue;
    if (prevFieldvalue !== nextFieldvalue) {
      console.log("ИЗМЕНИЛОСЬ ПОЛЕ ПОСКА");

      this.setState({ loading: true });
      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${nextFieldvalue}&page=1&key=22652626-da7dc8e3a4ffdfdaea60a5cb5&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then((res) => res.json())
          .then((data) => this.setState({ data }))
          .catch((error) => this.setState({ error }))
          .finally(() => this.setState({ loading: false }));
      }, 1500);
    }
  }

  handleClickImage = (largeImage) => {
    // this.setState({ selectedImage: largeImage });
    console.log(largeImage);
  };

  handleFormSubmit = (searchFieldvalue) => {
    console.log(searchFieldvalue);
    this.setState({ searchFieldvalue });
  };

  render() {
    const { data, loading, error } = this.state;
    // const hits = data.hits;
    console.log(data);
    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {error && <h1>Нету данных, введите запрос точнее</h1>}
        {loading && <h1>Загружаем...</h1>}
        {/* {data && <div>Тут будет покемон после фетча<img src={data.hits[0].webformatURL} alt="ff" width="300"/></div>} */}
        {data && (
          <ImageGallery hits={data.hits} onClick={this.handleClickImage} />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
