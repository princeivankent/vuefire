<template>
  <b-row>
    <b-col>
      <b-card
        title="Card Title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </b-card-text>
        
        Users
        <ul>
          <li v-for="(user, index) in users" :key="index">
            {{ user.name }}
          </li>
        </ul>

        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { usersCollection, db } from '../config/firebase'

export default {
  name: 'Home',
  data() {
    return {
      users: []
    }
  },
  firestore() {
    return {
      users: db.collection('users')
    }
  }
}
</script>