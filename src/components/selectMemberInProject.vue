<!-- @format -->

<template lang="html">
  <el-select
    placeholder="placeholder"
    v-model="selectedMembers"
    multiple
    style="width: 100%"
  >
    <el-option
      v-for="member in members"
      :key="member.id"
      :label="member.name"
      :value="member.id"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: ['members', 'placeholder'],
  data() {
    return {
      selectedMembers: ''
    }
  },
  watch: {
    selectedMembers(selectedEveryone) {
      this.$emit('selected', selectedEveryone)
    }
  }
}
</script>

<style lang="css" scoped></style>
