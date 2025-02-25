import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://md-news.onrender.com/api",
});

export const fetchArticles = (topic, sort_by, order) => {
  return ncNewsApi.get("/articles", { params: { topic, sort_by, order } });
};

export const fetchTopics = () => {
  return ncNewsApi.get("/topics");
};

export const fetchArticle = (id) => {
  return ncNewsApi.get(`/articles/${id}`);
};

export const fetchArticleComments = (id) => {
  return ncNewsApi.get(`/articles/${id}/comments`);
};

export const patchArticle = (id, incVote) => {
  return ncNewsApi.patch(`/articles/${id}`, { inc_votes: incVote });
};
export const addComment = (id, newComment) => {
  return ncNewsApi.post(`/articles/${id}/comments`, newComment);
};

export const deleteComment = (id) => {
  return ncNewsApi.delete(`/comments/${id}`);
};
