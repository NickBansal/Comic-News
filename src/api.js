import axios from 'axios';
const DB_URL = 'https://agile-bastion-11504.herokuapp.com/api';

export const getTopics = async () => {
    const { data } = await axios.get(`${DB_URL}/topics`)
    return data
}

export const getArticleByTopic = async (topic) => {
    const { data } = await axios.get(`${DB_URL}/topics/${topic}/articles`)
    return data
}

export const getAllArticles = async () => {
    const { data } = await axios.get(`${DB_URL}/articles`)
    return data
}

export const getArticleById = async (article_id) => {
    const { data } = await axios.get(`${DB_URL}/articles/${article_id}`)
    return data
}

export const getCommentsByArticle = async (article_id) => {
    const { data } = await axios.get(`${DB_URL}/articles/${article_id}/comments`)
    return data
}

export const getUserByUsername = async (username) => {
    const { data } = await axios.get(`${DB_URL}/users/${username}`)
    return data
}

export const addNewArticle = async (article, id) => {
    const created_by = id
    const { title, body, topic } = article
    const { data } = await axios.post(`${DB_URL}/topics/${topic}/articles`, { title, body, created_by })
    return data 
}

export const deleteComment = async id => {
	await axios.delete(`${DB_URL}/comments/${id}`);
}

export const addNewComment = async (article, id, articleId) => {
    const { body } = article
    const { data } = await axios.post(`${DB_URL}/articles/${articleId}/comments`, { body, created_by: id })
    return data
}

export const getAllUsers = async () => {
    const { data } = await axios.get(`${DB_URL}/users`)
    return data
}

export const updateVotes = async (id, newVotes, contentType) => {
    const direction = newVotes === true ? "up" : "down";
    const URL =
      contentType === "article"
        ? `${DB_URL}/articles/${id}?vote=${direction}`
        : `${DB_URL}/comments/${id}?vote=${direction}`;
    const { status } = await axios.patch(URL);
    return status;
  };