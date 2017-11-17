<template>
    <div id="login">
  <md-layout md-tag="form" novalidate @submit.prevent="allValid" md-align="center">
    <md-layout md-tag="md-card" md-column md-flex="30" md-flex-medium="50" md-flex-small="60" md-flex-xsmall="90" class="md-primary">
      <md-card-header>
        <div class="md-title">{{$lang.translate.login.tittle}}</div>
      </md-card-header>

      <md-card-content>
        <md-input-container>
          <md-icon>person</md-icon>
          <label>{{$lang.translate.login.username}}</label>
          <md-input email required v-model="username" />
        </md-input-container>

        <md-input-container md-has-password>
          <md-icon>lock</md-icon>
          <label>{{$lang.translate.login.password}}</label>
          <md-input type="password" required v-model="password" />
        </md-input-container>
      </md-card-content>

      <md-card-actions>
        <md-button  type="submit">{{$lang.translate.login.tittle}}</md-button>
      </md-card-actions>
    </md-layout>
  </md-layout>
</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    allValid () {
      if (this.username() && this.password()) {
        console.log('anmelden')
      }
    }
  },
  computed: {

  },
  watch: {
    password () {
      if (this.password !== '') {
        return true
      } else {
        return false
      }
    },
    username () {
      if (this.username !== '') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
#login {
    margin-top: 10px;
}

</style>