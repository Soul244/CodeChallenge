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
      <span>{{ difference(data.item.date, data.item.duration, data.item.time) }}</span>
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
    difference(date, duration, time) {
      const start = moment(date, "YYYY-MM-DD");
      const end = moment().format("YYYY-MM-DD");
      let days = moment.duration(start.diff(end)).asDays();
      let hours = "";
      let minutes = "";
      const durationRows = duration.split(" ");
      const taskTimeRows = time.split(":");
      console.log(taskTimeRows);
      const taskHours = parseInt(taskTimeRows[0], 10);
      const taskMinutes = parseInt(taskTimeRows[1], 10);
      let durationHours = 0;
      let durationMinutes = 0;
      // Google give us a duration like these: 1 days 2 hours, 2 hours 43 minutes etc.
      if (durationRows[1] === "day") {
        const durationDays = durationRows[0];
        days -= durationDays;
        durationHours = durationRows[2];
      } else if (durationRows[1] === "hours") {
        durationHours = durationRows[0];
      } else if (durationRows[1] === "mins") {
        durationMinutes = durationRows[0];
      }
      let result = this.diff({
        days,
        durationHours,
        durationMinutes,
        taskHours,
        taskMinutes
      });
      if(result.days<0 || 
      (result.days===0 && result.hours<0) || 
      (result.days===0 && result.hours===0 && result.minutes<0)) {
        return "Task time finished"
      }
      return (
        result.days +
        " days " +
        result.hours +
        " hours " +
        result.minutes +
        " minutes"
      );
    },

    diff(time) {
      const firstResult = this.getDiff(
        time.days,
        24,
        time.durationHours,
        time.taskHours
      );
      const secondResult = this.getDiff(
        firstResult.t,
        60,
        time.durationMinutes,
        time.taskMinutes
      );
      return {
        days: firstResult.main,
        hours: secondResult.main,
        minutes: secondResult.t
      };
    },
    getDiff(main, timeValue, first, second) {
      let t = 0;
      if (first > second) {
        main -= 1;
        t = first - second - timeValue;
      } else {
        t = first - second;
      }
      t = Math.abs(t);
      return { main, t };
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
