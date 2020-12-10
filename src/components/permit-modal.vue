<template>
  <b-modal id="edit-modal" hide-footer>
    <template #modal-title>
      <span v-if="mode == 'edit'">
        Editing permission #{{currentPermission.id}}
      </span>
      <span v-else>
        Create a new permission
      </span>
    </template>
    <form @submit.prevent="handleSubmit(currentPermission)">
        <label>First Name (*)</label>
        <b-form-input v-model="currentPermission.employeeName" type="text" required></b-form-input>
        <label>Last Name (*)</label>
        <b-form-input v-model="currentPermission.employeeLastName" type="text" required></b-form-input>
        <label>Type (*)</label>
        <b-form-select  required v-model="currentPermission.permitTypeId" :options="dropdownOptions"></b-form-select>
        <label>Date (*)</label>
        <b-form-datepicker v-model="currentPermission.permitDate" type="date" required></b-form-datepicker>
        <b-button class="mr-3 mt-2" type="submit">
          Save
        </b-button>
        <b-button class="mr-3 mt-2" @click="$bvModal.hide('edit-modal')">
          Cancel
        </b-button>
    </form>
  </b-modal>
</template>

<script>
import axios from 'axios';
import { permissionBase } from "@/utils"
import Swal from "sweetalert2";
export default {
  name: 'PermitModal',
  props: {
    permitTypes: {
      type: Array, 
      required: true
    },
    permission: {
      type: Object,
      default: () => {
        return {...permissionBase}
      }
    }
  },
  data() {
    return {
      isLoading: false,
      currentPermission: {},
    }
  },
  computed: {
    mode() {
      return this.permission.id ? 'edit' : 'insert';
    },
    dropdownOptions() {
      return this.permitTypes.map(type => {
        return {
          value: type.id,
          text: type.description
        }
      });
    }
  },
  watch: {
    permission: function (permission) {
      this.currentPermission = {...permission};
    },
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
      if (!permission.employeeName || !permission.employeeLastName || !permission.permitTypeId || !permission.permitDate){
        Swal.fire("error", "Please complete all inputs.", "error");
      }else{
        await axios(`${process.env.VUE_APP_API_ROOT}/api/permit`, {
          method: "POST",
          data: permission,
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            this.isLoading = false;
            Swal.fire("Success", "Your record has been saved", "success");
            this.$bvModal.hide('edit-modal');
            this.$emit('updated-permissions');
          });
      }
    },
    async editPermissionAsync(permission) {
      this.isLoading = true;
         if (!permission.employeeName || !permission.employeeLastName || !permission.permitTypeId || !permission.permitDate){
            Swal.fire("error", "Please complete all inputs.", "error");
         }else{
            await axios(`${process.env.VUE_APP_API_ROOT}/api/permit/${permission.id}`, {
              method: "PUT",
              data: permission,
              })
              .catch((error) => {
                console.error(error);
              })
              .finally(() => {
                this.isLoading = false;
                Swal.fire("Success", "Your record has been updated", "success");
                this.$bvModal.hide('edit-modal');
                this.$emit('updated-permissions');
              });
         }
    },
  }
}
</script>

<style>

</style>