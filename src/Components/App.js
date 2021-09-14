import React, { Component } from "react";
import SearchBar from "./Searchbar/SearchBar.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageGallery from "./ImageGallery/ImageGallery.jsx";
import Modal from "./Modal/Modal.jsx";
import ButtonMore from "./Button/Button.jsx";
import style from "./App.module.css";

class App extends Component {
  state = {
    data: [],
    page: 1,
    loading: false,
    searchFieldvalue: "",
    error: null,
    selectedlargeImageURL: null,
    taglargeImage: null,
  };

  // https://pixabay.com/api/?q=cat&page=1&key=22652626-da7dc8e3a4ffdfdaea60a5cb5&image_type=photo&orientation=horizontal&per_page=12

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const prevFieldvalue = prevState.searchFieldvalue;
    const nextFieldvalue = this.state.searchFieldvalue;
    const page = this.state.page;

    if (prevFieldvalue !== nextFieldvalue || prevState.page !== page) {
      console.log("ИЗМЕНИЛОСЬ ПОЛЕ ПОСКА");

      this.setState({ loading: true });
      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${nextFieldvalue}&page=${page}&key=22652626-da7dc8e3a4ffdfdaea60a5cb5&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then((res) => res.json())
          .then((data) =>
            this.setState({ data: [...prevState.data, ...data.hits] })
          )
          .catch((error) => this.setState({ error }))
          .finally(() => this.setState({ loading: false }));
      }, 1500);
    }
  }

  handleClickImage = (largeImage) => {
    // this.setState({ selectedImage: largeImageURL });
    console.log(largeImage);
    const data = this.state.data;
    const tagObject = data.find((item) => item.largeImageURL === largeImage);
    if (tagObject) {
      const tag = tagObject.tags;
      console.log(tag);
      this.setState({ selectedlargeImageURL: largeImage });
      this.setState({ taglargeImage: tag });
    }
  };

  handleCloseModal = () => {
    this.setState({ selectedlargeImageURL: null });
    this.setState({ taglargeImage: null });
  };

  handleBackdropClose = (e) => {
    if (e.currentTarget === e.target) {
      this.handleCloseModal();
    }
  };

  handleFormSubmit = (searchFieldvalue) => {
    console.log(searchFieldvalue);
    this.setState({ searchFieldvalue });
  };

  handleClickLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {
    const { data, loading, error, selectedlargeImageURL, taglargeImage } =
      this.state;
    // const hits = data.hits;
    console.log(data);
    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {error && <h1>Нету данных, введите запрос точнее</h1>}
        {loading && <h1>Загружаем...</h1>}
        {/* {data && <div>Тут будет покемон после фетча<img src={data.hits[0].webformatURL} alt="ff" width="300"/></div>} */}
        {data && <ImageGallery hits={data} onClick={this.handleClickImage} />}

        <div className={style.ModBut}>
          <ButtonMore handleClickLoadMore={this.handleClickLoadMore} />
        </div>

        <ToastContainer autoClose={3000} />
        {selectedlargeImageURL && (
          <Modal
            url={selectedlargeImageURL}
            tag={taglargeImage}
            handleBackdropClose={this.handleBackdropClose}
            handleCloseModal={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}

export default App;
