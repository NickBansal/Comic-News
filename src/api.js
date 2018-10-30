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