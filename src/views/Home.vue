<template>
  <div>
    <Navbar />
    <b-container
      fluid
      class="content"
    >
      <b-row>
        <b-col md="12">
          <div class="card-list">
            <template v-if="isFetching">
              <p>Loading</p>
            </template>
            <b-card
              v-if="isFetched"
              header="Active Task List"
            >
              <TaskList
                :items="activeTasks"
                :fields="fields"
                :update-task="updateTask"
                :delete-task="deleteTask"
                :done-task="doneTask"
                actions
              />
            </b-card>
            <b-card
              v-if="isFetched"
              header="Done Tasks"
              header-bg-variant="success"
              header-text-variant="white"
            >
              <TaskList
                :items="doneTasks"
                :fields="fields"
              />
            </b-card>
            <b-card>
              Your Location: 
              lat: {{ userLocation.lat }}
              lng: {{ userLocation.lng }}
            </b-card>
          </div>
        </b-col>
        <div class="plus">
          <b-button
            v-b-modal.taskmodal
            variant="success"
            @click="postTask"
          >
            <i class="material-icons">
              add_circle_outline
            </i>
          </b-button>
        </div>
        <TaskModal
          :title="modalTitle"
          :task="task"
          :type="modalType"
        />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import TaskModal from "@/components/Home/TaskModal";
import TaskList from "@/components/Home/TaskList";
import router from "@/router";
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Navbar,
    TaskModal,
    TaskList
  },
  data() {
    return {
      modalTitle: "",
      modalType: "",
      description: "",
      latLng: {},
      fields: [
        "index",
        "isTaskDone",
        "name",
        "surname",
        "email",
        "address.name",
        "phone",
        "time",
        {
          key: "date",
          sortable: true
        },
        {
          key: "duration",
          label: "Travelling Time"
        },
        "distance",
        "difference",
        "actions"
      ]
    };
  },
  computed: {
    ...mapState(["tasks", "task", "userLocation", "isFetching", "isFetched"]),
    doneTasks: function(){
        return this.tasks.filter(task=>task.isTaskDone===true)
    },
    activeTasks: function(){
      return this.tasks.filter(task=>task.isTaskDone===false)
    }
  },
  watch: {
    tasks: function(tasks) {
      const { lat, lng } = this.userLocation;
      if (tasks.length > 0 && lat !== "" && lng !== "") {
        this.getDistance({tasks:tasks, userLocation:this.userLocation})
      }
    },
    userLocation: function(userLocation) {
      const { lat, lng } = userLocation;
      if (this.tasks && this.tasks.length > 0 && lat !== "" && lng !== "") {
        this.getDistance({tasks:this.tasks, userLocation})
      }
    }
  },
  beforeMount() {
    this.getTasks();
    this.handleUserLocation();
    const token = localStorage.getItem("token");
    if (!token) {
      router.push({ path: "auth" });
    }
  },
  methods: {
    ...mapActions([
      "getTasks",
      "getUpdateTask",
      "clearTask",
      "deleteTask",
      "getDistance",
      "setUserLocation",
      "doneTask"
    ]),
    handleUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        });
      }
    },
    setModal(modalTitle, modalType) {
      this.modalTitle = modalTitle;
      this.modalType = modalType;
    },
    updateTask(index) {
      this.getUpdateTask(index);
      this.setModal("Update Task", "update");
    },
    postTask() {
      this.clearTask();
      this.setModal("New Task", "post");
    },
    setDescription(description) {
      this.description = description;
    },
    setPlace(place) {
      if (!place) return;
      this.latLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
    }
  }
};
</script>

<style scoped lang="scss">
.card-list {
  .card {
    margin-bottom: 1rem;
  }
}
.plus {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1;
}

.plus button {
  width: 64px;
  height: 64px;
  border-radius: 128px;
  padding: 8px 0;
  box-shadow: 3px 3px 5px 0px rgba(171, 171, 171, 1);
}

.plus i {
  font-size: 48px;
}
</style>