<template>
    <div class="card">
      <div class="card-header">
        <h3>Please input a new password, and you can login again</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="savePassword">
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your new password"
              required
            />
            <span class="password-toggle" @click="showPassword = !showPassword">{{ showPassword ? "🙈" : "👁️" }}</span>
          </div>
          <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input
              type="password"
              id="repeatPassword"
              v-model="repeatPassword"
              :type="showRepeatPassword ? 'text' : 'password'"
              placeholder="Repeat your new password"
              required
            />
            <span class="password-toggle" @click="showRepeatPassword = !showRepeatPassword">{{ showRepeatPassword ? "🙈" : "👁️" }}</span>
          </div>
          <div class="form-group">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        password: "",
        repeatPassword: "",
        showPassword: false,
        showRepeatPassword: false,
      };
    },
    methods: {
      savePassword() {
        // Implement logic to save the new password
        if (this.password === this.repeatPassword) {
          console.log("Password saved successfully");
        } else {
          console.log("Passwords do not match");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    border-radius: 15px;
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 5px 6px #0000004b;
  }
  
  .card-header {
    margin-bottom: 20px;
  }
  
  .card-header h3 {
    margin-bottom: 20px;
    font: normal normal normal 14px/17px Barlow;
  }
  
  .form-group {
    margin: 10px 0;
    text-align: left;
  }
  
  label {
    font: normal normal normal 12px/12px Barlow;
  }
  
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;
  }
  
  .password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  
  button {
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-weight: bold;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  