<template>
  <!-- :outlined="isActiveBtn !== variable" -->
  <v-btn
    tile
    text
    depressed
    :disabled="loadingBtn && isActiveBtn !== variable"
    :color="
      isActiveBtn === variable ? 'var(--color-fr)' : 'var(--color-secondary)'
    "
    :class="isActiveBtn === variable ? 'active__btn' : 'unactive__btn'"
    @click="onFetchData(variable)"
  >
    <span class="font-16">
      {{ text }}
    </span>
  </v-btn>
</template>

<script>
export default {
  props: {
    text: String,
    variable: String,
    isActiveBtn: {
      type: String,
      default: "1D",
    },
    loadingBtn: {
      type: Boolean,
      default: false,
    },
    onFetchData: Function,
  },
};
</script>

<style>
.active__btn {
  font-weight: 700 !important;
  color: #000 !important;
  border-bottom: 2px solid var(--color-fr);
}
.unactive__btn {
  color: #999999 !important;
  font-weight: 500 !important;
}
</style>
