<template>
  <b-modal id="edit-modal" hide-footer>
    <template #modal-title>
      <span v-if="mode == 'edit'">
        Editing permission #{{id}}
      </span>
      <span v-else>
        Create a new permission
      </span>
    </template>
    <form @submit.prevent="handleSumbit(permission)">
        <label for="first_name">First Name</label>
        <b-form-input id="first_name" v-model="permission.first_name" type="text" required></b-form-input>
        <label for="last_name">Last Name</label>
        <b-form-input id="last_name" v-model="permission.last_name" type="text" required></b-form-input>
        <label for="type">Type</label>
        <b-form-select id="type" v-model="permission.type" :options="options"></b-form-select>
        <label for="date">Date</label>
        <b-form-input id="date" v-model="permission.date" type="date" required></b-form-input>
        <b-button class="mr-3 mt-2" type="submit">
          Add
        </b-button>
        <b-button class="mr-3 mt-2" @click="$bvModal.hide('edit-modal')">
          Cancel
        </b-button>
    </form>
  </b-modal>
</template>

<script>
import axios from 'axios';
export default {
  name: 'EditModal',
  props: {
    permission: {
      type: Object,
      default: () => {
        return {
          first_name: '',
          last_name: '',
          type: '',
          date: new Date(),
        }
      }
    }
  },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    mode() {
      return this.permission.id ? 'edit' : 'insert';
    }
  },
  methods: {
    handleSubmit(permission) {
      if (this.mode == 'insert') {
        this.insertPermissionAsync(permission);
      } else if (this.mode == 'edit') {
        this.editPermissionAsync(permission);
      }
    },
    async insertPermissionAsync(permission) {
      this.isLoading = true;
      await axios(`${process.env.VUE_APP_API_ROOT}/api/permit`, {
        method: "POST",
        data: permission,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
          this.$emit('updated-permissions');
        });
    },
    async editPermissionAsync(permission) {
      this.isLoading = true;
      await axios(`/api/permissions/${permission.id}`, {
        method: "PUT",
        data: permission,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
          this.$emit('updated-permissions');
        });
    },
  }
}
</script>

<style>

</style>