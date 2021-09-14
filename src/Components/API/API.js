function fetchFirstArr(nextFieldvalue, page) {
  return fetch(
    `https://pixabay.com/api/?q=${nextFieldvalue}&page=${page}&key=22652626-da7dc8e3a4ffdfdaea60a5cb5&image_type=photo&orientation=horizontal&per_page=12`
  ).then((res) => res.json());
}

const api = {
  fetchFirstArr,
};

export default api;
