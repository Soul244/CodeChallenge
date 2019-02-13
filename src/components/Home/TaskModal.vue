<template>
  <div>
    <b-modal
      id="taskmodal"
      hide-footer
      :title="title"
    >
      <b-form @submit="onSubmit">
        <b-form-group>
          <FlashMessage />
          <p v-if="formErrors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li
                v-for="(error,index) in formErrors"
                :key="index"
              >
                {{ error }}
              </li>
            </ul>
          </p>
        </b-form-group>
        <b-form-group label="Address:">
          <gmap-autocomplete
            class="form-control"
            placeholder="Please enter an address"
            @place_changed="setAddress"
          />
          <br>
          <Gmap-Map
            style="width: 466px; height: 300px;"
            :zoom="1"
            :center="{lat: 0, lng: 0}"
          >
            <Gmap-Marker
              v-if="position"
              :key="index"
              :position="position"
            />
            <Gmap-Marker
              v-if="form.address"
              label=""
              :position="{
                lat: form.address.geometry.location.lat(),
                lng: form.address.geometry.location.lng(),
              }"
            />
          </Gmap-Map>
        </b-form-group>
        <b-form-group label="Name:">
          <b-form-input
            v-model="form.name"
            type="text"
            placeholder="Please enter a name"
          />
        </b-form-group>
        <b-form-group label="Surname:">
          <b-form-input
            v-model="form.surname"
            type="text"
            placeholder="Please enter a surname"
          />
        </b-form-group>
        <b-form-group label="Email Address:">
          <b-form-input
            v-model="form.email"
            type="email"
            placeholder="Please enter an email address"
          />
        </b-form-group>
        <b-form-group label="Phone:">
          <b-form-input
            v-model="form.phone"
            type="tel"
            placeholder="Please enter phone number"
          />
        </b-form-group>
        <b-form-group label="Time:">
          <b-form-input
            v-model="form.time"
            type="time"
            placeholder="Please enter time"
          />
        </b-form-group>
        <b-form-group label="Date:">
          <b-form-input
            v-model="form.date"
            type="date"
            placeholder="Please enter date"
          />
        </b-form-group>
        <b-button
          type="submit"
          variant="primary"
        >
          Submit
        </b-button>
        {{ type }}
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "TaskModal",
  props: {
    title: {
      type: String,
      required: true
    },
    task: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      description: "",
      position: null,
      formErrors: [],
      message: '',
      form: {
        _id: null,
        user: null,
        name: null,
        surname: null,
        email: null,
        address: null,
        phone: null,
        time: null,
        date: null,
        isTaskDone: null,
        isTaskMissed: null
      }
    };
  },
  computed: {
    resultMessage () {
      return this.$store.state.message;
    }
  },
  watch: {
    task: function(newVal, oldVal) {
      const { form } = this;
      //form.address = newVal.address;
      form._id = newVal._id;
      form.name = newVal.name;
      form.surname = newVal.surname;
      form.email = newVal.email;
      form.phone = newVal.phone;
      form.time = newVal.time;
      form.date = newVal.date;
      form.isTaskDone = newVal.isTaskDone;
      form.isTaskMissed = newVal.isTaskMissed;
    },
    resultMessage: function(newVal) {
      this.flashMessage.show({status: 'error', title: 'Errors', message: newVal})
    }
  },
  methods: {
    ...mapActions(["postTask", "updateTask"]),
    setDescription(description) {
      this.description = description;
    },
    setAddress(address) {
      this.form.address = address;
    },
    onSubmit(e) {
      e.preventDefault();
      this.formErrors=[];
      const {form,formErrors, resultMessage} = this;
      if(!form.name){
        formErrors.push('Name required')
      }
      if(!form.surname){
        formErrors.push("Surname required")
      }
      if(!form.time){
        formErrors.push("Time is required");
      }
      if(!form.date){
        formErrors.push("Date is required");
      }
      if(!form.address){
        formErrors.push("Address is required")
      }
      if(formErrors.length>0){
        this.flashMessage.show({status: 'error', title: 'Errors', message: formErrors.join(', ')})
      }
      if(resultMessage) {
        this.flashMessage.show({status: 'error', title: 'Errors', message: this.resultMessage})
      }
      form.user = localStorage.getItem("_id");
      if (this.type === "post") {
        this.postTask(this.form);
      } else {
        this.updateTask(this.form);
      }
    }
  }
};
</script>

<style scoped>
</style>
