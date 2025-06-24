<template>
  <div class="chart-wrapper">
    <h5 class="mb-3">Distribusi Produk per Kategori</h5>
    <Pie v-if="productData" :data="productData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { ref, onMounted } from 'vue'
import { getAllProducts } from '../services/ProductService'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const productData = ref(null)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: window.innerWidth < 576 ? 'top' : 'bottom',
      labels: {
        font: {
          size: window.innerWidth < 576 ? 10 : 12
        },
        boxWidth: 12
      }
    }
  }
}

onMounted(async () => {
  const products = await getAllProducts(1, 1000)

  const counts = {}
  products.forEach(product => {
    const categoryName = product.category_id?.name || 'Tanpa Kategori'
    counts[categoryName] = (counts[categoryName] || 0) + 1
  })

  const labels = Object.keys(counts)
  const data = Object.values(counts)

  const backgroundColors = [
    '#0d6efd', '#6610f2', '#6f42c1',
    '#d63384', '#dc3545', '#fd7e14',
    '#ffc107', '#198754', '#20c997', '#0dcaf0'
  ]

  productData.value = {
    labels,
    datasets: [{
      label: 'Jumlah Produk',
      backgroundColor: backgroundColors.slice(0, labels.length),
      data
    }]
  }
})
</script>

<style scoped>
.chart-wrapper {
  height: 400px;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
}

@media (max-width: 768px) {
  .chart-wrapper {
    height: 300px;
    padding: 0.5rem;
  }
}
</style>
