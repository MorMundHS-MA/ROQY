<template>
  <div id="test">
    <div id="test-card">
      <div class="card-header">
            <img src="../assets/bot.png"/>
            <h3 id="title">bot name</h3>
      </div>
      <div id="card-content">
        <div 
        v-for="(message, messages) in messages" 
        :key="message.message"
        :class="{'message-right': isUser(message.sender), 'message-left': !isUser(message.sender)}">
          <span>{{message.message}}</span>
        </div>
      </div>
      <div class="card-footer">
        <div class="footer-content">
          <input type="message" placeholder="write a message" v-model="message" @keyup.enter="addMessage()"/>
          <button class="button" @click="addMessage()">send</button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'test',
  props: ['id'],
  data () {
    return {
      message: null,
      messages: []
    }
  },
  computed: {
    bot () {
      return this.$store.dispatch('getBotById', '1512396066014id')
    }
  },
  methods: {
    addMessage () {
      if (this.message !== null) {
        let mess = {
          sender: 'user',
          message: this.message
        }
        this.messages.push(mess)
        this.message = null
        this.scrollToEnd()
        setTimeout(() => {
          this.getmessage()
        }, 300)
      }
    },
    scrollToEnd () {
      var container = this.$el.querySelector('#card-content')
      container.scrollTop = container.clientHeight
    },
    getmessage () {
      let mess = {
        sender: 'agent',
        message: 'asfagfs'
      }
      this.messages.push(mess)
      this.scrollToEnd()
    },
    isUser (sender) {
      return sender === 'user'
    }
  }
}
</script>

<style scoped>
#test {
  min-width: 463px;
}
#test-card {
  width: 40%;
  min-height: 560px;
  max-height: 560px;
  margin: 7% auto;
  border: 2px solid grey;
  border-radius: 3px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)
}
.card-header {
  width: 100%;
  background-color: white;
  height: 60px;
  padding: 10px;
  border-bottom: 2px solid grey;
}
img {
  width : 40px;
  height: 40px;
  margin-left: 4px;
}
#title {
  display: inline;
  margin-left: 10px;
}
#card-content {
  width: 100%;
  background-color: white;
  height: 435.5px;
  text-align: center;
  padding: 10px;
  overflow-x: auto;
}
.card-footer {
  width: 100%;
  background-color: white;
  height: 60px;
  text-align: center;
  padding: 10px;
  border-top: 1.5px solid grey;
}
input {
  border: 1.5px solid grey;
  padding: 5px 14px;
  margin-top: 2px;
  margin-right: 2px;
  border-radius: 4px;
  max-width: 70%;
  min-width: 70%;
  overflow-wrap: break-word
}
.button {
  background-color: orange;
  border: 1.5px solid grey;
  color: white;
  padding: 5px 14px;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  float:right;
  margin-top: 2px;
  margin-right: 3%;
}
.message-right {
  background-color: #4f8ff7;
  max-width: 45%;
  border-radius: 20px;
  padding: 6px 7px;
  margin-bottom: 6px;
  margin-left: auto;
  overflow-wrap: break-word;
}
.message-left {
  background-color: #f7a54f;
  max-width: 45%;
  border-radius: 20px;
  padding: 6px 7px;
  margin-bottom: 6px;
  overflow-wrap: break-word;
}
@media only screen and (max-width: 800px){
  #test-card {
    width: 70%;
  }
  .message-right, .message-left {
    max-width: 70%;
  }
}
</style>