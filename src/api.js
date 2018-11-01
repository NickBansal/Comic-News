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

export const addNewArticle = async (article) => {
    const { title, body, topic, created_by } = article
    const { data } = await axios.post(`${DB_URL}/topics/${topic}/articles`, { title, body, created_by })
    return data 
}