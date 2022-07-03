<template>
  <q-page class="register flex flex-center">
    <div class="absolute bg">
      <div class="section bg-primary"></div>
      <div class="section bg-secondary"></div>
    </div>
    <q-card class="login-card flex column justify-center">
      <q-card-section class="flex column">
        <div class="text-h5 text-center q-mb-xs">Create Account</div>
        <div class="text-body2 text-center text-grey">
          Please enter details below
        </div>
      </q-card-section>
      <q-card-section class="flex column">
        <q-input
          ref="iName"
          :rules="validation.nameRules"
          v-model="name"
          class="q-mb-sm"
          filled
          placeholder="Name"
          :dense="true"
        />
        <q-input
          ref="iEmail"
          :rules="validation.emailRules"
          v-model="email"
          class="q-mb-sm"
          filled
          placeholder="Email"
          :dense="true"
        />
        <q-input
          ref="iPassword"
          :rules="validation.passwordRules"
          v-model="password"
          class="q-mb-sm"
          type="password"
          filled
          placeholder="Password"
          :dense="true"
        />
        <q-input
          ref="iConfirmPassword"
          :rules="validation.confirmPasswordRules"
          v-model="confirmPassword"
          type="password"
          filled
          placeholder="Confirm Password"
          :dense="true"
        />
      </q-card-section>
      <q-card-section class="flex column">
        <q-btn @click="onSignUp" rounded color="secondary" label="SIGN UP" />
      </q-card-section>
      <q-card-section>
        <div class="text-body2 text-center text-grey">
          Already have an account?
          <span class="text-link" @click="$router.push({ name: 'loginpage' })"
            >Login</span
          >
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { useQuasar, QSpinnerFacebook } from "quasar";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "src/boot/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default {
  created() {
    this.$q = useQuasar();
  },
  data() {
    return {
      validation: {
        nameRules: [
          (val) => val.length > 3 || "Minimum name length must be more than 3!",
        ],
        emailRules: [
          (val) => !!val || "email must not be empty!",
          (val) =>
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) ||
            "Invalid email format!",
        ],
        passwordRules: [
          (val) =>
            val.length > 8 || "Minimum password length must be 8 characters!",
        ],
        confirmPasswordRules: [
          (val) =>
            val === this.password ||
            "password and confirm password must be the same!",
        ],
      },
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    onSignUp() {
      const nameRef = this.$refs.iName;
      const emailRef = this.$refs.iEmail;
      const passwordRef = this.$refs.iPassword;
      const confirmPassRef = this.$refs.iConfirmPassword;

      nameRef.validate();
      emailRef.validate();
      passwordRef.validate();
      confirmPassRef.validate();

      if (
        nameRef.hasError ||
        emailRef.hassError ||
        passwordRef.hasError ||
        confirmPassRef.hasError
      ) {
        return;
      }

      const auth = getAuth();
      this.showLoading("registering");
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          // Add user info into fb
          await setDoc(doc(db, "User", user.uid), {
            username: this.name,
            about: "",
            register_date: Timestamp.fromDate(new Date()),
            verified: false,
          });

          // TODO: update profile picture to default
          updateProfile(user, { displayName: this.name })
            .then(() => {
              this.$q.notify({
                icon: "done",
                color: "positive",
                message: "Registration Successful",
              });
            })
            .catch((error) => {
              this.$q.notify({
                color: "negative",
                message: "register succesful, but profile name set error",
              });
            })
            .finally(() => {
              this.$q.loading.hide();
              this.$router.push({ name: "rolepage" });
            });
        })
        .catch((error) => {
          this.$q.notify({
            color: "negative",
            message: error.message,
          });
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
