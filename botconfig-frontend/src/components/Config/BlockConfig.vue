<template>
  <div v-if="isBlockSelected" id="blockConfig">

    <div id="header">
      <span v-on:click="toggleFavorite()" v-if="isFavorite" class="favIcon" style="color:orange;">★</span>
      <span v-on:click="toggleFavorite()" v-else  class="favIcon">☆</span>
      <input ref="titleInput" id="titleInput" v-model="title">
      <span v-on:click="focusInput()" style="font-size:24px;margin-right:5%;position: relative;top: 1px;">✎</span>
      <button v-on:click="deleteBlock()" style="position: relative;top: -4px;"><md-icon>delete</md-icon></button>
    </div>

    <div class='wrapper'>
      <div class='question margin'>
      <div>
        <h4>{{$lang.translate.config.question}}</h4>
      </div>
      
      <div class='row' v-on:click="focusChip()">
        <div class='block-wrapper'>
          <div class='block' v-for="(question,index) in block.questions" :key="index">
              <span>{{question}}</span>
              <md-button  class="md-icon-button  md-mini md-dense" v-on:click='deleteQuestion(question)'>
                <md-icon>delete</md-icon>
              </md-button>
          </div>
          <div>
              <input class="chips" ref="chip"
              v-model='question'
              name='newBlock'
              v-on:blur='addNewQuestion()'
              @keyup.enter='addNewQuestion()'/>
          </div>
        </div>
      </div>
      
    </div>
    <div class='answer margin'>
      <div>
        <h4 >{{$lang.translate.config.answer}}</h4>
      </div>
      
      <textarea v-model="answer" cols="30" rows="10" class="block-wrapper"></textarea>
      </div>
    </div>
    <span style="cursor: default;margin-left: 10%;">{{$lang.translate.config.forward}}</span>
    <input id="forwardTo" v-model="forward"/>
  </div>

</template>

<script>
export default {
  name: 'blockConfig',
  props: ['block'],
  data () {
    return {
      question: ''
    }
  },
  methods: {
    addNewQuestion () {
      if (this.question !== '') {
        this.$emit('newQuestion', this.question)
        this.question = ''
      }
    },
    deleteQuestion (question) {
      this.$emit('deleteQuestion', question)
    },
    addNewAnswer () {
      if (this.answer.length !== 0) {
        this.$emit('newAnswer', this.answer)
        this.answer = ''
      }
    },
    saveData () {
      this.$emit('saveData')
    },
    testBot () {
      this.$emit('testBot')
    },
    toggleFavorite () {
      this.$emit('favorite')
    },
    deleteBlock () {
      this.$emit('delete')
    },
    focusInput () {
      this.$refs.titleInput.focus()
    },
    focusChip () {
      this.$refs.chip.focus()
    }
  },
  computed: {
    isBlockSelected () {
      return this.block !== undefined && this.block !== null
    },
    isFavorite () {
      return this.block !== undefined && this.block !== null && this.block.isFavorite
    },
    answer: {
      get () {
        return this.block.answer
      },
      set (answer) {
        this.$emit('setAnswer', answer)
      }
    },
    title: {
      get () {
        return this.block.title
      },
      set (title) {
        this.$emit('setTitle', title)
      }
    },
    forward: {
      get () {
        return this.block.forwardTo
      },
      set (forwarding) {
        this.$emit('setForwardTo', forwarding)
      }
    }
  }
}
</script>

<style scoped>
#blockConfig {
  width: 100%;
  height: 100%;
}
#header {
  width: 100%;
  padding: 10px;
  background-color: #eeeeee;
  margin: 0;
}
#header>h2 {
  margin-top: 2.5%;
  margin-left: 10%;
  margin-right: 40%;
}
.row {
  width: 100%;
}
.wrapper {
  padding: 2% 10%;
}
.block {
  text-align: center;
  line-height: 30px;
  border-radius: 15px;
  max-width: 100%;
  display: inline-block;
  padding: .9%;
  margin: .5%;
  cursor: pointer;
  background-color: #76bbed;
  color: white;
  resize: none;
  word-wrap: break-word;
}
.question {
  width: 100%;
}
.answer {
  width: 100%;
}
.margin {
  margin-top: 6%;
}
.block-wrapper{
  border: 2px solid #d4d6d8;
  border-radius: 4px;
  padding: 2%;
  margin-top: 1.5%;
  min-height: 260px;
  max-height: 280px;
  width: 300px;
  overflow: auto;
}
ol {
  padding-left: 10%;
}
#titleInput {
  font-size: 22px;
  width: auto;
}
.chips {
}
input :focus {
  border: none;
}
.innerQuestion {
  margin: 3% 2%;
}
.innerQuestion>span {
  font-weight: bold;
}
.rightSite {
  display: block;
}
.favIcon {
  font-size: 28px;
  position: relative;
  top: 2px;
}
#forwardTo {
  border: #cccccc solid 1px;
  width: 100px;
}
</style>
