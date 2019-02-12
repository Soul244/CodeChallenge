import router from '../../router';

export default {
    fetching:(state)=>{
        state.isFetching=true;
    },
    fetched:(state)=>{
        state.isFetching=false,
        state.isFetched=true;
    },
    getTasks: (state, payload) => {
        state.tasks = payload.tasks;
    },
    postTask: (state, payload) => {
        state.tasks.push(payload.task);
        state.message = payload.message;
    },
    getUpdateTask:(state,payload)=>{
        state.task = payload;
    },
    getTask: (state, payload) => {
        state.task = payload.task;
    },
    getDistance: (state,payload)=>{
        const index = state.tasks.findIndex(task=>task._id==payload._id);
        state.tasks[index].distance = payload.distance;
        state.tasks[index].duration = payload.duration;
    },
    setUserLocation: (state,payload)=>{
        state.userLocation = payload;
    },
    clearTask:(state)=>{
        state.task={};
    },
    doneTask: (state, payload)=>{
        console.log(payload);
    },
    deleteTask:(state, payload)=>{
        state.tasks.splice(payload, 1)
    },
    login: (state, payload)=>{
        if(payload.token){
            localStorage.setItem('_id', payload._id);
            localStorage.setItem('email', payload.email);
            localStorage.setItem('name', payload.name);
            localStorage.setItem('token', payload.token);
            router.push({path:'/'})
        }
        state.user= {
            _id: payload._id,
            email: payload.email,
            token: payload.token,
        }
        state.message=payload.message
    },
    signup: (state,payload)=>{
        state.message=payload.message;
    },
    logout: () =>{
        localStorage.setItem('_id', "");
        localStorage.setItem('email', "");
        localStorage.setItem('name', "");
        localStorage.setItem('token', "");
        router.push({path:'/auth'})
    }
}