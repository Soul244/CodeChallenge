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
                context.commit('error', e.response);
            });
    },
    getTask: (context, _id) => {
        axios.get(`${apiUrl}/tasks/${_id}`)
            .then(response => {
                context.commit('getTask', response.data)
            })
            .catch(e => {
                context.commit('error', e.response);
            })
    },
    postTask: (context, payload) => {
        axios.post(`${apiUrl}/tasks`, payload)
            .then(response => {
                context.commit('postTask', response.data);
            })
            .catch(e => {
                context.commit('error', e.response);
            })
    },
    updateTask: (context, payload) => {
        const _id = payload._id;
        axios.patch(`${apiUrl}/tasks/${_id}`, payload)
            .then((response) => {
                context.commit('updateTask', response.data)
            })
            .catch(e => {
                context.commit('error', e.response);
            })
    },
    deleteTask: (context, _id) => {
        console.log(_id);
        axios.delete(`${apiUrl}/tasks/${_id}`)
            .then((response) => {
                context.commit('deleteTask', response.data)
            })
            .catch(e => {
                context.commit('error', e.response);
            })
    },
    doneTask: (context, _id) => {
        axios.patch(`${apiUrl}/tasks/${_id}`, {
                isTaskDone: true
            })
            .then((response) => {
                context.commit('doneTask', response.data)
            })
            .catch(e => {
                context.commit('error', e.response);
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
            if(task.address===null) {
                count++;
                if (count === tasks.length) {
                    context.commit("fetched");
                }
                return;
            };
            const starting = {
                lat,
                lng
            };
            const destination = {
                lat: task.address.geometry.location.lat,
                lng: task.address.geometry.location.lng
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
                .catch(e=>{
                    context.commit('error', e.response);
                })
        });
    },
    getUpdateTask: (context, _id) => {
        const payload = context.state.tasks[context.state.tasks.findIndex(task => task._id == _id)];
        context.commit('getUpdateTask', payload);
    },
    clearTask: (context) => {
        context.commit('clearTask');
    },
    setUserLocation: (context, payload) => {
        context.commit('setUserLocation', payload);
    },
    login: (context, payload) => {
        axios.post(`${apiUrl}/users/login`, payload)
            .then(response => {
                context.commit('login', response.data)
            })
            .catch(e => {
                context.commit('error', e.response);
            })
    },
    signup: (context, payload) => {
        axios.post(`${apiUrl}/users/signup`, payload)
            .then(response => {
                context.commit('signup', response.data)
            })
            .catch(e => {
                context.commit('error', e.response);
            })
    },
    logout: (context) => {
        context.commit("logout");
    }
}