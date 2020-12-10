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
    <EditModal @updated-permissions="getPermissionsAsync()"/>
  </div>
</template>

<script>
import axios from "axios";
import EditModal from '@/components/edit-modal.vue';
export default {
  name: "Home",
  components: {
    EditModal,
  },
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
