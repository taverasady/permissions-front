<template>
  <div class="container-fluid">
    <div class="row pt-4 pb-2">
      <div class="col">
        <h3>Permissions</h3>
        <p class="text-muted">
          Use this simple form to request for your permissions fast and easy!
        </p>
      </div>
    </div>
    <div class="row py-2">
      <div class="col">
        <b-button variant="outline-primary" @click="toggleRequestModal()">
          <b-icon-plus />
          New Request
        </b-button>
      </div>
    </div>
    <div class="row py-2">
      <div class="col">
        <b-overlay :show="isLoading" rounded="sm">
          <b-table
            striped
            hover
            :items="permissions"
            :fields="fields"
            show-empty
          >
            <template #cell(actions)="row">
              <b-button-group>
                <b-button
                  size="sm"
                  variant="warning"
                  @click="toggleRequestModal(row.item)"
                >
                  <b-icon-pencil-fill />
                </b-button>
              </b-button-group>
            </template>
            <template #empty>
              <p class="text-center text-muted">
                <b-icon-info-circle />
                No permissions available
              </p>
            </template>
          </b-table>
        </b-overlay>
      </div>
    </div>
    <PermitModal :permission="selectedPermission" :permit-types="permitTypes" @updated-permissions="getPermissionsAsync()"/>
  </div>
</template>

<script>
import axios from "axios";
import PermitModal from '@/components/permit-modal.vue';
import { permissionBase } from "@/utils"
export default {
  name: "Home",
  components: {
    PermitModal,
  },
  data() {
    return {
      permissions: [],
      permitTypes: [],
      fields: [
        {
          key: "employeeName",
        },
        {
          key: "employeeLastName",
        },
        {
          label: "Description",
          key: "permitType.description",
        },
        {
          key: "permitDate",
        },
        {
          key: "actions",
        },
      ],
      selectedPermission: {...permissionBase},
      isLoading: false,
      newRequestModalActive: false,
    };
  },
  mounted() {
    this.getPermissionsAsync();
    this.getPermissionsTypesAsync();
  },
  methods: {
    toggleRequestModal(permission){
      if (permission) {
        this.selectedPermission = permission;
      } else {
        this.selectedPermission = {...permissionBase};
      }
      this.$bvModal.show('edit-modal');
    },
    async getPermissionsAsync() {
      this.isLoading = true;
      await axios(`${process.env.VUE_APP_API_ROOT}/api/permit`)
        .then((response) => {
          this.permissions = response.data;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async getPermissionsTypesAsync() {
      this.isLoading = true;
      await axios(`${process.env.VUE_APP_API_ROOT}/api/permitType`)
        .then((response) => {
          this.permitTypes = response.data;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>