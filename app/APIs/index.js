import axios from 'axios'

import config from './config'


export const getBooks = () => ()=> axios.get(config.getBooks())
