<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="#">Udemy</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    </b-navbar>

    <b-row class="justify-content-md-center mt-5">
      <b-col md="3">
        <b-card
          no-body
          class="mb-2"
        >
          <h4 slot="header" class="text-center">Login</h4>

          <b-card-body>
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-form-group>

            <b-form-group 
              id="input-group-2" 
              label="Password:" 
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.password"
                type="password"
                required
                placeholder="Enter password"
              ></b-form-input>
            </b-form-group>
          </b-card-body>

          <b-card-footer>
            <b-button 
              variant="success" 
              @click="onSubmit"
              block
             >
              <template v-if="authenticationStatus.login">
                <i class="fa fa-sync fa-spin"></i>
              </template>
              <template v-else>
                login
              </template>
            </b-button>
          </b-card-footer>
        </b-card>
      </b-col>
    </b-row>

    <b-toast id="my-toast" variant="danger" solid>
      <div slot="toast-title" class="d-flex flex-grow-1 align-items-baseline">
        <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
        <strong class="mr-auto">Notice!</strong>
        <small class="text-muted mr-2">42 seconds ago</small>
      </div>
      This is the content of the toast.
      It is short and to the point.
    </b-toast>
  </div>
</template>