import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-example-seminar-3-1.herokuapp.com/api",
});

export const fetchArticles = (topic) => {
  return ncNewsApi.get("/articles", { params: { topic } });
};

export const fetchTopics = () => {
  return ncNewsApi.get("/topics");
};

export const fetchRelatedArticles = () => {
  return ncNewsApi.get("/topics/:topic_slug");
};
