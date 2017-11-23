<template>
  <div id="login">
  <md-layout md-tag="form" novalidate @submit.stop.prevent="submit" md-align="center">
    <md-layout md-tag="md-card" md-column md-flex="30" md-flex-medium="40" md-flex-small="60" md-flex-xsmall="90" class="md-primary">
      <md-card-header>
        <div class="md-title">{{$lang.translate.login.tittle}}</div>
      </md-card-header>

      <md-card-content>
        <md-input-container>
          <md-icon>person</md-icon>
          <label>{{$lang.translate.login.username}}</label>
          <md-input  required v-model="username"/>
        </md-input-container>

        <md-input-container md-has-password>
          <md-icon>lock</md-icon>
          <label>{{$lang.translate.login.password}}</label>
          <md-input type="password" required v-model="password"/>
        </md-input-container>
      </md-card-content>

      <md-card-actions>
        <md-button v-show="!loading" type="submit">{{$lang.translate.login.tittle}}</md-button>
      </md-card-actions>
    </md-layout>
  </md-layout>
</div>
</template>
<script>
import { validationMixin } from 'vuelidate'

export default {
  name: 'login',
  mixins: [validationMixin],
  data: () => ({
    form: {
      username: null,
      password: null
    }
  })
}
</script>

<style scoped>
#login {
    margin-top: 10px;
}

</style>