<template>
  <section class="center">
    <article>
      <h1 class="header">
        404
      </h1>
      <p class="error">
        页面不存在
      </p>
    </article>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../assets/css/colors';
@import '../assets/css/font_size';
.center {
  text-align: center;
}

/* 404 Styling */
.header {
  font-size: 150px;
  font-weight: 700;
  margin: 2% 0 2% 0;
  text-shadow: 0px 3px 0px $color7;
  color: $color7;
}

/* Error Styling */
.error {
  margin: -70px 0 2% 0;
  font-size: 150px;
  text-shadow: 0px 3px 0px $color7;
  font-weight: 100;
  color: $color7;
}
</style>
