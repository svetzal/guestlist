<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/guests">Guest List</router-link> |
    <router-link to="/guests/add">RSVP Me!</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
@import url(https://fonts.googleapis.com/css2?family=Meow+Script&display=swap);

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1,h2,h3 {
  font-family: "Meow Script", cursive;
  margin: 0;
}

h1 {
  font-size: 4em;
}

h2 {
  font-size: 2em;
}

html,body {
  height: 100%;
  background: url(./assets/background.jpg);
  background-size: cover;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #6a5221;
      text-shadow: 0 0 10px #f3bc4c;
    }
  }
}

.screen {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
