<template>
  <div class="">
    <h1 class="text-success font-monospace">All Todos</h1>
    <div class="container">
      <div class="row">
        <AddTodo></AddTodo>
        <FilterTodos></FilterTodos>
      </div>
      <div class="row">
        <div class="col-md-4 my-4" v-for="todo in myTodos" :key="todo.id">
          <b-card @dblclick="toggleCompleted(todo)" :bg-variant="dynamicBackground(todo)" text-variant="white"  class="text-center">
            <b-card-text class="d-flex justify-content-between align-items-center">
              <span>{{ todo.title }}</span>
              <button class="border-0" @click="deleteTodo(todo.id)"><b-icon icon="trash-fill" variant="danger"></b-icon></button>
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';
import AddTodo from "./AddTodo";
import FilterTodos from "./FilterTodos";

export default {
  components: {FilterTodos, AddTodo},
  computed : {
     ...mapGetters([
         'myTodos'
     ])
  },

  methods : {
    dynamicBackground(todo){
      return todo.completed ? 'success' : 'secondary'
    },
    toggleCompleted(todo){
      todo.completed = !todo.completed;  // Update Ui
      this.updateTodo(todo)
    },
    ...mapActions(['getTodos', "deleteTodo","updateTodo"])
  },

  name: "Todos",
  mounted() {
    this.getTodos()
  }
}
</script>

<style scoped>

</style>