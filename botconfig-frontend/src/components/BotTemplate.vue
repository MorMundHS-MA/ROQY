<template>
    <md-layout md-row>
        <md-layout md-flex-small="100" md-flex-medium="50">
            <md-card md-with-hover>
                
            </md-card>
        </md-layout>

    </md-layout>
</template>

<script>
export default {
  computed: {
    templates () {
      return this.$store.state.templates
    }
  }
}
</script>


<style scoped>
</style>