import axios from 'axios';
const apiUrl = "http://localhost:3001";
axios.defaults.headers.authorization = localStorage.getItem("token");

export default {
    getTasks: (context) => {
        const userId = localStorage.getItem('_id')
        axios.get(`${apiUrl}/tasks/all/${userId}`)
            .then(response => {
                context.commit('getTasks', response.data);
            })
            .catch(e => {
                console.log(e)
            });
    },
    postTask: (context, payload) => {
        axios.post(`${apiUrl}/tasks`, payload)
            .then(response => {
                context.commit('postTask', response.data);
            })
            .catch(e => {
                console.log(e);
            })
    },
    getUpdateTask: (context, index) => {
        const payload = context.state.tasks[index]
        context.commit('getUpdateTask', payload);
    },
    clearTask: (context) => {
        context.commit('clearTask');
    },
    deleteTask: (context, index) => {
        const _id = context.state.tasks[index]._id;
        axios.delete(`${apiUrl}/tasks/${_id}`)
            .then((response) => {
                context.commit('deleteTask', response.data)
            })
            .catch(e => {
                console.log(e);
            })
    },
    doneTask: (context, index) =>{
        const _id = context.state.tasks[index]._id;
        axios.patch(`${apiUrl}/tasks/${_id}`,{isTaskDone: true})
        .then((response) => {
            context.commit('doneTask', response.data)
        })
        .catch(e => {
            console.log(e);
        })
    },
    getDistance: (context, payload) => {
        context.commit('fetching');
        const {
            tasks,
            userLocation
        } = payload;
        const {
            lat,
            lng
        } = userLocation;
        let count = 0;
        if (tasks.length === 0) {
            context.commit("fetched");
        }
        tasks.forEach(task => {
            const starting = {
                lat,
                lng
            };
            const destination = {
                lat: task.address.lat,
                lng: task.address.lng
            };
            axios.post(`${apiUrl}/google/distance`, {
                    _id: task._id,
                    starting,
                    destination
                })
                .then(response => {
                    context.commit('getDistance', response.data);
                    count++;
                    if (count === tasks.length) {
                        context.commit("fetched");
                    }
                })
        });
    },
    getTask: (context, _id) => {
        axios.get(`${apiUrl}/tasks/${_id}`)
            .then(response => {
                context.commit('getTask', response.data)
            })
            .catch(e => {
                console.log(e);
            })
    },
    setUserLocation: (context, payload) => {
        context.commit('setUserLocation', payload);
    },
    login: (context, payload) => {
        axios.post(`${apiUrl}/users/login`, payload)
            .then(response => {
                console.log(response.data);
                context.commit('login', response.data)
            })
            .catch(e => {
                console.log(e);
            })
    },
    signup: (context, payload) => {
        axios.post(`${apiUrl}/users/signup`, payload)
            .then(response => {
                context.commit('signup', response.data)
            })
            .catch(e => {
                console.log(e);
            })
    },
    logout: (context) => {
        context.commit("logout");
    }
}