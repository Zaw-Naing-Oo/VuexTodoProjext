import axios from "axios";
export default {
    state : {
      todos : [

      ]
    },

    getters : {
        myTodos(state){
            return state.todos
        }
    },

    mutations : {
        setTodos(state,todos){
            state.todos = todos
        },
        setTodo(state,newTodo){
            state.todos.unshift(newTodo);
        },
        removeTodo(state,removeId){
            state.todos = state.todos.filter(todo => {
                return todo.id !== removeId
            })
        },
        updateTodo(state,todo){
            state.todo.forEach( (t) => {
                if(t.todo === todo.id){
                    t = todo;
                }
            })
        }
    },

    actions : {
        async getTodos({ commit }){
          let res = await  axios.get("https://jsonplaceholder.typicode.com/todos");
          let todos = res.data;
          console.log(todos)
          commit("setTodos",todos)
        },
        async addTodo(context,newTodo){
            let res = await  axios.post("https://jsonplaceholder.typicode.com/todos",newTodo);
            console.log(res.data);
            context.commit("setTodo",res.data)

        },
        async deleteTodo(context,removeId){
            await  axios.delete(`https://jsonplaceholder.typicode.com/todos/${removeId}`);
            context.commit('removeTodo',removeId)
        },

        async filterTodo(context,limit){
            let res = await  axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
            console.log(res.data)
            context.commit("setTodos",res.data)
        },
        async updateTodo(context,todo){
            let res = await  axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`,todo);
            console.log(res)
            context.commit('updateTodo',res.data)
        }
    },
}