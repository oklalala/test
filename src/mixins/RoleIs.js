/** @format */

var mixin = {
  methods: {
    roleIs(role) {
      return this.$store.getters.myRole === role
    }
  }
}

export default mixin
