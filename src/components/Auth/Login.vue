<template>
  <b-form @submit="onSubmit">
    <h4>Login</h4>
    <hr>
    <b-form-group
      label="Mail:"
    >
      <b-form-input
        v-model="form.email"
        type="email"
        required
        placeholder="Please enter your mail"
      />
    </b-form-group>
    <b-form-group label="Password:">
      <b-form-input
        v-model="form.password"
        type="password"
        required
        placeholder="Please enter your password"
      />
    </b-form-group>
    <b-button
      type="submit"
      variant="secondary"
    >
      Submit
    </b-button>
  </b-form>
</template>

<script>
export default {
  props:{
    form: {type:Object, default:function(){return}},
    onSubmit:{type:Function, default:function(){return}} 
  },
}
</script>