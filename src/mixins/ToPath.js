/** @format */

var mixin = {
  methods: {
    toPath(name, params) {
      this.$router.push({ name, params })
    }
  }
}

export default mixin
