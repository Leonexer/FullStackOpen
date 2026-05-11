import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject)

const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`)

export default { 
  getAll, 
  update,
  create, 
  delete: deletePerson }