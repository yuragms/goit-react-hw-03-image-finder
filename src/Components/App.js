import React, { Component } from "react";
import SearchBar from "./Searchbar/SearchBar.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageGallery from "./ImageGallery/ImageGallery.jsx";
import Modal from "./Modal/Modal.jsx";
import ButtonMore from "./Button/Button.jsx";
import style from "./App.module.css";
import { Spinner } from "./Loader/Loader.jsx";
import fetchAPI from "./API/API.js";

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

  componentDidUpdate(prevProps, prevState) {
    const prevFieldvalue = prevState.searchFieldvalue;
    const nextFieldvalue = this.state.searchFieldvalue;
    const page = this.state.page;

    if (prevFieldvalue !== nextFieldvalue || prevState.page !== page) {
      console.log("ИЗМЕНИЛОСЬ ПОЛЕ ПОСКА");

      this.setState({ loading: true });

      fetchAPI
        .fetchFirstArr(nextFieldvalue, page)
        .then((data) => {
          if (data.hits.length > 0) {
            console.log(7777);
          } else {
            this.setState({ error: 1 });
          }
          this.setState({ data: [...data.hits] });
        })
        .then(
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          })
        )
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }

    if (prevState.page !== page) {
      console.log("Изменилась пагинация");

      this.setState({ loading: true });

      fetchAPI
        .fetchFirstArr(nextFieldvalue, page)
        .then((data) => {
          this.setState({ data: [...prevState.data, ...data.hits] });
        })
        .then(
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          })
        )
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
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
    console.log(`searchFieldvalue 12`);

    this.setState({ searchFieldvalue, page: 1, data: [], error: null });
  };

  handleClickLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {
    const { data, loading, error, selectedlargeImageURL, taglargeImage } =
      this.state;

    const showButton = data.length > 0;
    console.log(`data999`);
    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {error && <h1>Нет данных с таким запросом</h1>}
        {loading && <Spinner />}

        {data && <ImageGallery hits={data} onClick={this.handleClickImage} />}
        {showButton && (
          <div className={style.ModBut}>
            <ButtonMore handleClickLoadMore={this.handleClickLoadMore} />
          </div>
        )}

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
