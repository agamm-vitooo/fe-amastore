<!-- UserList.vue -->
<template>
  <div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead class="table-light text-center">
        <tr>
          <th>Nama</th>
          <th>Email</th>
          <th>Telepon</th>
          <th>Dibuat</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ new Date(user.createdAt).toLocaleString() }}</td>
          <td>
            <button class="btn btn-sm btn-warning me-1 mb-1" @click="$emit('edit', user)">Edit</button>
            <button class="btn btn-sm btn-danger mb-1" @click="$emit('delete', user._id)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="users.length === 0" class="text-muted text-center py-4">
      Tidak ada data user.
    </div>
  </div>
</template>

<script setup>
defineProps(['users'])
defineEmits(['edit', 'delete'])
</script>