<!--<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <div class="create-post">
      <div class="create-post">
        <label for="create-post">Say Something...</label>
        <input type="text" id="create-post" v-model="text" placeholder="Create a post">
        <button v-on:click="createPost">Post!</button>
      </div>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)"
      >
      {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()+1}/${post.createdAt.getFullYear()}`}}
      <p class="text">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>-->

<template>
  <div>
  <h1>Add an Activity</h1>
  <select name="Topic" id="create-post" v-model="topic">
  <option value="" disabled selected>Select a Topic</option>
  <option value="Sports">Sports</option>
  <option value="Education">Education</option>
  <option value="Arts">Arts</option>
</select>
  <input type="number" id="create-post" v-model="price" placeholder="Price" min="1">
  <input type="text" id="create-post" v-model="location" placeholder="Location">
  <input type="text" id="create-post" v-model="provider" placeholder="Provider">
  <button v-on:click="createPost">Post!</button>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)"
      >
      {{ 'Post Date: ' + `${post.createdAt.getDate()}/${post.createdAt.getMonth()+1}/${post.createdAt.getFullYear()}`}}
      <p class="text">{{ post.text }}</p>
      <p class="text">{{ post.topic }}</p>
      <p class="text">{{ post.price }}</p>
      <p class="text">{{ post.location }}</p>
      <p class="text">{{ post.provider }}</p>
      <button v-on:click="deletePost(post._id)">Delete Activity</button>
      </div>
    </div>
  </div>
  
</template>

<script>
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [{
        error: '',
        text: '',
        topic: '',
        price: '',
        location: '',
        provider: '',
        review: ''
      }],
    }  
    },
    async created() {
      try {
        this.posts = await PostService.getPosts();
      } catch(err) {
        this.error = err.message;
      }
  },
  methods: {
    async createPost() {
      await PostService.insertPost('Topic: ' + this.topic, 'Price: ' + this.price + 'eur', 'Location: ' + this.location, 'Provider: ' + this.provider);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
	background-color: #6d8ce8;
}

div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #282828;
  background-color: #6d8ce8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at{
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15 px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>