<template>

  <div>
    <md-card md-with-hover >
      <md-card-header>

        <md-card-header-text>
        <div class="md-subhead"></h5>{{botData.template}}</h5></div>
        </md-card-header-text>

        <md-switch></md-switch>

        <md-menu  md-direction="bottom left">
          <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>more_vert</md-icon>
          </md-button>

          <md-menu-content>

            <md-menu-item id="#renameconfirm"  v-on:click="openDialog(confirm.ref2)">
              <span >{{$lang.translate.info.rename}}</span>
            </md-menu-item>

            <md-menu-item id="confirm" v-on:click="openDialog(confirm.ref1)">
              <span >{{$lang.translate.info.delete}}</span>
            
            </md-menu-item>

            <router-link tag="md-menu-item"   :to="{ path: '/config/bot', query: { id: botData._id }}">
              <span>{{$lang.translate.info.setting}}</span>
            </router-link>
          </md-menu-content>  
          
        </md-menu>
        
      </md-card-header>

      <div id="imgwrapper">
        <img src="../assets/bot.png" :alt="botData.name">
      </div>

      <md-card-header-text>
        <div class="md-title"><h5>{{botData.name}}</h5></div>
        <div class="md-subhead">{{botData.template}}</div>
      </md-card-header-text>

      <md-card-content>
        {{botData.description}}
      </md-card-content>
    </md-card>


    <md-dialog md-open-from="#confirm" md-close-to="#confirm" ref='dialog1'>
      <md-dialog-title>{{confirm.title}}</md-dialog-title>

      <md-dialog-content>{{confirm.contentHtml}}</md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" v-on:click="closeDialog(confirm.ref1)"> {{confirm.cancel}}</md-button>
        <md-button class="md-primary" v-on:click="deleteItem(botData)" >{{confirm.ok}}</md-button>
      </md-dialog-actions>
    </md-dialog>


    <md-dialog md-open-from="#renameconfirm" md-close-to="#renameconfirm" ref='dialog2'>
      <md-dialog-title>{{$lang.translate.info.renameTitle}}</md-dialog-title>

      <md-dialog-content><md-input-container>
        <label{{$lang.translate.creater.new_name}}</label>
          <md-input v-model="newName" placeholder="New Name"   required></md-input>
        </md-input-container>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" v-on:click="closeDialog(confirm.ref2)"> {{confirm.cancel}}</md-button>
        <md-button class="md-primary" :disabled='!isValid' v-on:click="renameItem(botData)" >{{confirm.rename}}</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
      
</template>

<script>
import 'vue-material/dist/vue-material.css'

export default {
  props: ['botData'],
  data () {
    return {
      newName: '',
      confirm: {
        title: 'Do you want to delete this Bot ?',
        renameTitle: 'Write the new name of your bot !',
        contentHtml: 'This bot will be on database deleted, if you confirm it, there is no way to back it up.',
        ok: 'Delete',
        rename: 'Rename',
        cancel: 'Cancel',
        ref1: 'dialog1',
        ref2: 'dialog2'
      },
      isValid: false,
      aktiv: false
    }
  },
  watch: {
    newName () {
      if (this.newName.length !== 0) {
        this.isValid = true
      }
    }
  },
  methods: {
    deleteItem (item) {
      this.$store.dispatch('deleteBot', item)
      this.closeDialog(this.confirm.ref1)
    },
    changeBot (item) {
      this.$store.dispatch('changeStatus', item)
    },
    renameItem (item) {
      this.$store.dispatch('renameBot', [item, {
        name: this.newName}])
      this.closeDialog(this.confirm.ref2)
      this.newName = ''
      this.isValid = false
    },
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    }
  }
}
</script>

<style scoped>
  .md-card{
    min-width: 260px;
    min-height: 360px;
    max-width: 260px;
    max-height: 360px;
    word-wrap:break-word;
    margin: 20px;
  }
  .md-card-content{
    word-wrap:break-word;
  }
  .md-title{
    text-align: left;
    margin: 10px;
  }
  img{
    width: 148px;
    height: 148px;
  }
  #imgwrapper{
    text-align: center;
  }


</style>