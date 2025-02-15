<template>
  <div>
    <h1>Слипы на карте</h1>
    <div id="map" style="height: 500px;"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import { useSlipsStore } from "@/stores/slips";

// Подключаем состояние слипов из Pinia
const slipsStore = useSlipsStore();
const map = ref(null);

onMounted(() => {
  // Инициализация карты
  map.value = L.map("map").setView([55.789, 49.123], 13); // Центр карты (можно настроить)

  // Подключаем слой карты (например, OpenStreetMap)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
  }).addTo(map.value);

  // Загружаем слипы
  slipsStore.fetchSlips().then(() => {
    // После того как слипы загружены, добавляем маркеры на карту
    slipsStore.slips.forEach(slip => {
      if (slip.lat && slip.lon) {
        const marker = L.marker([slip.lat, slip.lon]).addTo(map.value);

        // Добавляем всплывающее окно с информацией о слипе
        marker.bindPopup(`
          <b>${slip.name}</b><br>
          Тип покрытия: ${slip.coating}<br>
          С прицепом: ${slip.with_trailer ? "Да" : "Нет"}<br>
          Комментарий: ${slip.comment || "Нет комментария"}
        `);
      }
    });
  });
});
</script>

<style scoped>
#map {
  width: 100%;
  height: 500px;
  /* Размер карты */
}
</style>
