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
    console.log(article, id)
    const created_by = id
    const { title, body, topic } = article
    const { data } = await axios.post(`${DB_URL}/topics/${topic}/articles`, { title, body, created_by })
    return data 
}

export const deleteComment = async id => {
	await axios.delete(`${DB_URL}/comments/${id}`);
}

export const addNewComment = async (article, id, articleId) => {
    console.log(article)
    const { body } = article
    const { data } = await axios.post(`${DB_URL}/articles/${articleId}/comments`, { body, created_by: id })
    return data
}
