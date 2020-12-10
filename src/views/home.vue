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
        <b-button variant="outline-primary">
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
                  @click="removePermissionAsync(row.id)"
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
        <b-pagination
          v-if="totalPages > 1"
          v-model="currentPage"
          :total-rows="totalPages"
          :per-page="pageSize"
        ></b-pagination>
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
          key: "first_name",
        },
        {
          key: "last_name",
        },
        {
          key: "type",
        },
        {
          key: "date",
        },
        {
          key: "actions",
        },
      ],
      currentPage: 1,
      totalPages: 1,
      pageSize: 10,
      isLoading: false,
    };
  },
  mounted() {
    //TODO: Implement Data initial load method e.g.: getPermissionsAsync()
    this.getPermissionsAsync();
  },
  methods: {
    // TODO: Create async data retrieval function
    async getPermissionsAsync() {
      this.isLoading = true;
      await axios("/api/permissions")
        .then((response) => {
          this.permissions = response.data;
          this.currentPage = response.page;
          this.totalPages = response.total;
          this.pageSize = response.pageSize;
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
      await axios("/api/permissions", {
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
    async removePermissionAsync(id) {
      this.isLoading = true;
      await axios(`/api/permissions/${id}`, {
        method: "DELETE",
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
