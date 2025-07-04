<template>
  <div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead class="table-light">
        <tr>
          <th>Nama</th>
          <th>Kategori</th>
          <th>Aktif</th>
          <th class="text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product._id">
          <td>{{ product.name }}</td>
          <td>{{ product.category_id?.name }}</td>
          <td>
            <span
              class="badge"
              :class="product.is_active ? 'bg-success' : 'bg-secondary'"
            >
              {{ product.is_active ? 'Ya' : 'Tidak' }}
            </span>
          </td>
          <td class="text-center">
            <button class="btn btn-sm btn-warning me-2" @click="$emit('edit', product)">
              Edit
            </button>
            <button class="btn btn-sm btn-danger" @click="$emit('delete', product._id)">
              Hapus
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps(['products'])
defineEmits(['edit', 'delete'])
</script>
