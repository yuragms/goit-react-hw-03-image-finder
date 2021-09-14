import React, { Component } from "react";
import style from "./Modal.module.css";
import PropTypes from "prop-types";

class Modal extends Component {
  static propTypes = {
    url: PropTypes.string,
    tag: PropTypes.string,
    handleBackdropClose: PropTypes.func.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleEscClose);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscClose);
  }

  handleEscClose = (e) => {
    if (e.code === "Escape") {
      this.props.handleCloseModal();
    }
  };

  render() {
    const { url, tag, handleBackdropClose } = this.props;
    return (
      <div className={style.Overlay} onClick={(e) => handleBackdropClose(e)}>
        <div className={style.Modal}>
          <img src={url} alt={tag} />
        </div>
      </div>
    );
  }
}

export default Modal;
