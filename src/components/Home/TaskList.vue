<template>
  <b-table
    hover
    responsive
    :items="items"
    :fields="fields"
    small
  >
    <template
      slot="index"
      slot-scope="data"
    >
      {{ data.index+1 }}
    </template>
    <template
      slot="difference"
      slot-scope="data"
    >
      <span>{{ difference(data.item.date, data.item.time, data.item.duration ) }}</span>
    </template>
    <template
      v-if="actions"
      slot="actions"
      slot-scope="data"
    >
      <div class="button-list">
        <b-button
          variant="outline-success"
          @click="doneTask(data.index)"
        >
          Done
        </b-button>
        <b-button
          v-b-modal.taskmodal
          variant="outline-info"
          @click="updateTask(data.index)"
        >
          Update
        </b-button>
        <b-button
          variant="outline-danger"
          @click="deleteTask(data.index)"
        >
          Remove
        </b-button>
      </div>
    </template>
  </b-table>
</template>

<script>
import moment from "moment";

export default {
  props: {
    actions: { type: Boolean, default: false },
    taskList: {
      type: String,
      default: ""
    },
    busy: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array,
      default: () => []
    },
    doneTask: {
      type: Function,
      default: () => {}
    },
    updateTask: {
      type: Function,
      default: () => {}
    },
    deleteTask: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    difference(taskDate, taskHours, travellingDate) {
      const formattedDate = moment(taskDate).format("DD/MM/YYYY");
      const formattedHours = moment(taskHours, "H:mm");
      const formattedTaskDate = moment(
        formattedDate + formattedHours.format("HH:mm:ss"),
        "DD/MM/YYYY HH:mm:ss"
      );
      const today = moment().format();
      if (moment(today).isSameOrAfter(formattedTaskDate)) {
        return "finished";
      }
      //dateDuration give us duration between today and task date except travelling date
      const dateDuration = moment.duration(formattedTaskDate.diff(today));

      // Travelling Time
      const travellingDateRows = travellingDate.split(" ");
      let travellingDays = 0;
      let travellingHours = 0;
      let travellingMinutes = 0;
      // Google give us a duration like these: 1 days 2 hours, 2 hours 43 minutes etc.
      if (travellingDateRows[1] === "day") {
        travellingDays = travellingDateRows[0];
        travellingHours = travellingDateRows[2];
      } else if (travellingDateRows[1] === "hours") {
        travellingHours = travellingDateRows[0];
        travellingMinutes = travellingDateRows[2];
      } else if (travellingDateRows[1] === "mins") {
        travellingMinutes = travellingDateRows[0];
      }
      const diffDays = this.getDiff(
        dateDuration.days(),
        24,
        travellingHours,
        dateDuration.hours()
      );
      const diffHoursAndMinutes = this.getDiff(
        diffDays.result,
        60,
        travellingMinutes,
        dateDuration.minutes()
      );
      let estimatedDate = "";
      if (dateDuration.years() < 0 || 
          dateDuration.months() < 0 || 
          diffDays.main < 0 ||
          diffHoursAndMinutes.main < 0 ||
          diffHoursAndMinutes.result < 0  
          ) {
        return "Finished";
      }
      if (dateDuration.years() > 0) {
        estimatedDate = dateDuration.years() + " years ";
      }
      if (dateDuration.months() > 0) {
        estimatedDate = estimatedDate + dateDuration.months() + " months ";
      }
      if (diffDays.main > 0) {
        estimatedDate = estimatedDate + diffDays.main + " days ";
      }
      if (diffHoursAndMinutes.main > 0) {
        estimatedDate = estimatedDate + diffHoursAndMinutes.main + " hours ";
      }
      if (diffHoursAndMinutes.result > 0) {
        estimatedDate = estimatedDate + diffHoursAndMinutes.result + " minutes";
      }
      return estimatedDate;
    },
    getDiff(main, timeValue, first, second) {
      let result = 0;
      if (first > second) {
        main -= 1;
        result = first - second - timeValue;
      } else {
        result = first - second;
      }
      result = Math.abs(result);
      return { main, result };
    }
  }
};
</script>

<style lang="scss" scoped>
.button-list {
  display: flex;
  button {
    margin: 0.25rem;
  }
}
</style>
