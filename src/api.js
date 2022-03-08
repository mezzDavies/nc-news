import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-example-seminar-3-1.herokuapp.com/api",
});

export const fetchArticles = () => {
  return ncNewsApi.get("/articles");
};
