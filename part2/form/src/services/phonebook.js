import axios from "axios"
const url = '/api/persons'

const getAll = () => {
    return axios
        .get(url)
        .then(response => response.data)

}
const create = (person) => {
    return axios
        .post(url, person)
        .then(response => response.data)
}

const deleteEntry = (id) => {
    return axios
        .delete(url + '/' + id)
        .then(response => response.data)
}

const update = (id, entry) => {
    return axios
        .put(url + '/' + id, entry)
        .then(response => response.data)
}

export default { getAll, create, deleteEntry, update }