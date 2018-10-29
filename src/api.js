import axios from 'axios';
const DB_URL = 'https://agile-bastion-11504.herokuapp.com/api';

export const getTopics = async () => {
    const { data } = await axios.get(`${DB_URL}/topics`)
    return data
}