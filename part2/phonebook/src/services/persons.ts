import axios from "axios";
import { Person, PersonNoId } from "../Common";
const baseUrl = 'http://localhost:3001/persons';

function getAll() {
  return axios.get(baseUrl).then(res => res.data as Person[]);
}

function postNew(newPerson: PersonNoId) {
  return axios.post(baseUrl, newPerson).then(res => res.data as Person);
}

function deletePerson(personId: string) {
  return axios.delete(`${baseUrl}/${personId}`).then(res => res.data as Person)
}

function changePerson(personId: string, changedPerson: Person) {
  return axios.put(`${baseUrl}/${personId}`, changedPerson).then(res => res.data as Person);
}

export default {getAll, postNew, deletePerson, changePerson}