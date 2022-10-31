import axios from "axios"

const instance=axios.create({
    baseURL:"https://h19127165-authapp.herokuapp.com/",
    timeout: 2000,
})

export default instance