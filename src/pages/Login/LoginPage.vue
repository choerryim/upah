<template>
  <q-page class="login flex flex-center">
    <div class="absolute bg">
      <div class="section bg-primary"></div>
      <div class="section bg-secondary"></div>
    </div>
    <q-card class="login-card">
      <q-card-section class="flex justify-center q-my-xs">
        <div class="image-holder" style="left: 10%">
          <img src="https://picsum.photos/id/237/200/300" />
        </div>
        <div class="image-holder" style="right: 10%; top: 1.5em">
          <img src="https://picsum.photos/id/238/200/300" />
        </div>
      </q-card-section>
      <q-card-section class="flex column">
        <div class="text-h5 text-center q-mb-xs">Login</div>
        <div class="text-body1 text-center text-grey">
          Please enter the details below
        </div>
      </q-card-section>
      <q-card-section class="flex column">
        <q-input
          ref="iEmail"
          v-model="email"
          :rules="validation.emailRules"
          filled
          placeholder="Email"
          :dense="true"
        />
        <q-input
          type="password"
          v-model="password"
          ref="iPassword"
          :rules="validation.passwordRules"
          filled
          placeholder="Password"
          :dense="true"
        />
        <div class="text-body2 text-right text-grey">Forgot Password?</div>
      </q-card-section>
      <q-card-section class="flex column">
        <q-btn @click="onLogin" rounded color="secondary" label="LOGIN" />
        <div class="text-body2 text-center text-grey q-mt-sm">
          Don't have account? Register!
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import { useQuasar, QSpinnerFacebook } from "quasar";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  created() {
    this.$q = useQuasar();
  },
  data() {
    return {
      validation: {
        emailRules: [
          (val) => !!val || "email must not be empty!",
          (val) =>
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) ||
            "Invalid email format!",
        ],
        passwordRules: [(val) => !!val || "password must not be empty!"],
      },
      email: "",
      password: "",
    };
  },
  methods: {
    onLogin() {
      const emailRef = this.$refs.iEmail;
      const passwordRef = this.$refs.iPassword;

      emailRef.validate();
      passwordRef.validate();
      if (emailRef.hassError || passwordRef.hasError) {
        return;
      }

      const auth = getAuth();
      this.showLoading("registering");
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.$q.notify({
            icon: "done",
            color: "positive",
            message: "Logged in",
          });

          this.$router.push({ name: "rolepage" });
        })
        .catch((error) => {
          this.$q.notify({
            color: "negative",
            message: error.message,
          });
        })
        .finally(() => {
          this.$q.loading.hide();
        });
    },
    showLoading(text) {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: "primary",
        spinnerSize: 140,
        backgroundColor: "secondary",
        message: text,
        messageColor: "black",
      });
    },
  },
};
</script>
