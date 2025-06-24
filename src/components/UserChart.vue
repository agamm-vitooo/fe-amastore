<template>
  <div class="chart-wrapper">
    <h5 class="mb-3">Statistik Pendaftaran User per Tanggal</h5>
    <Line v-if="chartData" :data="chartData" :options="chartOptions" />

    <div class="text-center mt-3 text-success fw-bold fs-5">
      Total User Terdaftar: {{ totalUser }}
    </div>
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { ref, onMounted } from 'vue'
import { getAllClients } from '../services/UserService'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const chartData = ref(null)
const totalUser = ref(0)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      precision: 0
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}

onMounted(async () => {
  const clients = await getAllClients()
  totalUser.value = clients.length

  const dateCounts = {}

  clients.forEach(client => {
    const date = new Date(client.createdAt).toISOString().slice(0, 10)
    dateCounts[date] = (dateCounts[date] || 0) + 1
  })

  const sortedDates = Object.keys(dateCounts).sort()

  chartData.value = {
    labels: sortedDates,
    datasets: [{
      label: 'Jumlah User',
      data: sortedDates.map(date => dateCounts[date]),
      fill: true,
      borderColor: '#0d6efd',
      backgroundColor: 'rgba(13, 110, 253, 0.2)',
      tension: 0.3
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
    height: 320px;
    padding: 0.5rem;
  }
}
</style>
