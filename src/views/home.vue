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
                  @click="showEditModal(row)"
                >
                  <b-icon-pencil-fill />
                </b-button>
                <b-button
                  size="sm"
                  variant="danger"
                  @click="removePermissionAsync(row)"
                >
                  <b-icon-trash-fill />
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      permissions: [],
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
     
      isLoading: false,
      newRequestModalActive: false,
    };
  },
  mounted() {
    this.getPermissionsAsync();
  },
  methods: {
    toggleRequestModal(){
      this.newRequestModalActive = !this.newRequestModalActive;
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
    // TODO: Create async row insert function
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
          this.getPermissionsAsync();
        });
    },
    // TODO: Create async row edit function
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
          this.getPermissionsAsync();
        });
    },
    // TODO: Create async row delete function
    async removePermissionAsync(permission) {
      this.isLoading = true;
      await axios(`${process.env.VUE_APP_API_ROOT}/api/permit/${permission.item.id}`, {
        method: "DELETE",
        data: permission.item,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
          this.getPermissionsAsync();
        });
    },
  },
};
</script>
