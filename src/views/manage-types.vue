<template>
  <div class="container-fluid">
    <div class="row pt-4 pb-2">
      <div class="col">
        <h3>Permission Types</h3>
        <p class="text-muted">
          Review/Remove the type of permissions your users can request
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
                  variant="danger"
                  @click="removePermissionTypeAsync(row)"
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
import axios from 'axios';
import Swal from 'sweetalert2'
export default {
  name: "ManageTypes",
  data() {
    return {
      permissionTypes: [],
      isLoading: false,
      fields: [
        {
          key: "description",
        },
        {
          key: "actions",
        }
      ],
    };
  },
  mounted() {
    this.getPermissionTypesAsync();
  },
  methods: {
    async getPermissionTypesAsync() {
      this.isLoading = true;
      await axios(`${process.env.VUE_APP_API_ROOT}/api/permitType`)
        .then((response) => {
          this.permissionTypes = response.data;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async removePermissionTypeAsync(permission) {
      this.isLoading = true;
      Swal.fire({
        title: 'Warning !',
        text: "¿Are you sure you want to remove this record?",
        icon: 'warning',
        showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Si', cancelButtonText:"No"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios(`${process.env.VUE_APP_API_ROOT}/api/permitType/${permission.item.id}`, {
              method: "DELETE",
              data: permission.item,
              })
              .catch((error) => {
                console.error(error);
              })
              .finally(() => {
                this.isLoading = false;
                this.getPermissionTypesAsync();
              });
              Swal.fire('Success!','File deleted.','success'
              )
        }else{
          this.isLoading = false;
        }
      });
    },
  },
};
</script>