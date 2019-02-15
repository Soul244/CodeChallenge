import router from '../../router';

export default {
    error: (state, payload) => {
        state.message.push(`error:${payload.status}: ${payload.statusText}`);
    },
    getTasks: (state, payload) => {
        state.tasks = payload.tasks;
        state.activeTasks = payload.tasks.filter(task => task.isTaskDone === false)
        state.doneTasks = payload.tasks.filter(task => task.isTaskDone === true)
    },
    getTask: (state, payload) => {
        state.task = payload.task;
    },
    postTask: (state, payload) => {
        state.tasks.push(payload.task);
        state.activeTasks.push(payload.task);
        state.message.push(payload.message);
    },
    updateTask: (state, payload) => {
        const index = state.activeTasks.findIndex(task => task._id === payload._id);
        state.activeTasks[index] = payload.updatedData;
        state.message.push(payload.message);
    },
    deleteTask: (state, payload) => {
        const index = state.activeTasks.findIndex(task => task._id === payload._id);
        state.activeTasks.splice(index, 1)
        state.message.push(payload.message);
    },
    doneTask: (state, payload) => {
        const index = state.activeTasks.findIndex(task => task._id === payload._id);;
        state.doneTasks.push(state.activeTasks[index]);
        state.activeTasks.splice(index, 1);
        state.message.push(payload.message);
    },
    getDistance: (state, payload) => {
        const index = state.tasks.findIndex(task => task._id == payload._id);
        state.tasks[index].distance = payload.distance;
        state.tasks[index].duration = payload.duration;
    },
    getUpdateTask: (state, payload) => {
        state.task = payload;
    },
    clearTask: (state) => {
        state.task = {};
        state.message = [];
    },
    setUserLocation: (state, payload) => {
        state.userLocation = payload;
    },
    login: (state, payload) => {
        if (payload.token) {
            localStorage.setItem('_id', payload._id);
            localStorage.setItem('email', payload.email);
            localStorage.setItem('name', payload.name);
            localStorage.setItem('token', payload.token);
            router.push({
                path: '/'
            })
        }
        state.user = {
            _id: payload._id,
            email: payload.email,
            token: payload.token,
        }
        state.message.push(payload.message)
    },
    signup: (state, payload) => {
        state.message.push(payload.message);
    },
    logout: () => {
        localStorage.setItem('_id', "");
        localStorage.setItem('email', "");
        localStorage.setItem('name', "");
        localStorage.setItem('token', "");
        router.push({
            path: '/auth'
        })
        state.message.push("Başarıyla çıkış yaptınız.");
    },
    fetching: (state) => {
        state.isFetching = true;
    },
    fetched: (state) => {
        state.isFetching = false,
            state.isFetched = true;
    },
}