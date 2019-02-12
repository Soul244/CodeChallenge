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
            @place_changed="setPlace"
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
              v-if="place"
              label=""
              :position="{
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
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
      place: null,
      formErrors: [],
      flash:'',
      form: {
        user: null,
        name: null,
        surname: null,
        email: null,
        address: {
          name: null,
          lat: null,
          lng: null,
        },
        phone: null,
        time: null,
        date: null
      }
    };
  },
  computed: {
    ...mapState(["message"])
  },
  watch: {
    task: function(newVal, oldVal) {
      const { form } = this;
      form.name = newVal.name;
      form.surname = newVal.surname;
      form.email = newVal.email;
      form.address = newVal.address;
      form.phone = newVal.phone;
      form.time = newVal.time;
      form.date = newVal.date;
    }
  },
  methods: {
    ...mapActions(["postTask", "updateTask"]),
    setDescription(description) {
      this.description = description;
    },
    setPlace(place) {
      this.place = place;
    },
    usePlace(place) {
      if (this.place) {
        position = {
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng()
        };
        this.place = null;
      }
    },
    onSubmit(e) {
      e.preventDefault();
      this.formErrors=[];
      const {form,formErrors} = this;
      if(!form.name){
        formErrors.push('Name required')
      }
      if(!form.surname){
        formErrors.push("Surname required")
      }
      this.flashMessage.show({status: 'error', title: 'Errors', message: formErrors.join(', ')})

      form.user = localStorage.getItem("_id");
      form.address = {
        name: this.place.name,
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng(),
      }
      console.log(this.form);
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
