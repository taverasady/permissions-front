<template>
  <div class="container-fluid">
    <div class="row pt-4 pb-2">
      <div class="col">
        <h3>Permission Types</h3>
        <p class="text-muted">
          Setup the type of permissions your users can request
        </p>
      </div>
    </div>
    <div class="row py-2">
      <div class="col">
        <b-overlay :show="isLoading" rounded="sm">
          <b-table
            striped
            hover
            :items="permissionTypes"
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
                  @click="removePermissionTypeAsync(row.id)"
                >
                  <b-icon-trash-fill />
                </b-button>
              </b-button-group>
            </template>
            <template #empty>
              <p class="text-center text-muted">
                <b-icon-info-circle />
                No permission types available
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
import axios from 'axios';
export default {
  name: "ManageTypes",
  data() {
    return {
      permissionTypes: [],
      isLoading: false,
      currentPage: 1,
      totalPages: 1,
      pageSize: 10,
      fields: [
        {
          key: "description",
        },
      ],
    };
  },
  mounted() {
    //TODO: Implement Data initial load method e.g.: getPermissionTypesAsync()
    this.getPermissionTypesAsync();
  },
  methods: {
    // TODO: Create async data retrieval function
    async getPermissionTypesAsync() {
      this.isLoading = true;
      await axios("/api/permissionTypes")
        .then((response) => {
          this.permissionTypes = response.data;
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
    async insertPermissionTypeAsync(type) {
      this.isLoading = true;
      await axios("/api/permissionTypes", {
        method: "POST",
        data: type,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
          this.getPermissionTypesAsync();
        });
    },
    // TODO: Create async row edit function
    async editPermissionTypeAsync(type) {
      this.isLoading = true;
      await axios(`/api/permissionTypes/${type.id}`, {
        method: "PUT",
        data: type,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
          this.getPermissionTypesAsync();
        });
    },
    // TODO: Create async row delete function
    async removePermissionTypeAsync(id) {
      this.isLoading = true;
      await axios(`/api/permissionTypes/${id}`, {
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
          this.getPermissionTypesAsync();
        });
    },
  },
};
</script>