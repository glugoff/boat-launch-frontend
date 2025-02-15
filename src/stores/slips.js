import axios from 'axios';  // Импортируем axios
import { defineStore } from 'pinia';  // Импортируем defineStore из Pinia

export const useSlipsStore = defineStore("slips", {
    state: () => ({
        slips: [],
        error: null,  // Добавляем поле для ошибки
    }),
    actions: {
        async fetchSlips() {
            console.log("fetchSlips() вызван"); // Проверяем, вызывается ли метод

            try {
                const response = await axios.get("http://localhost:5000/slips");
                this.slips = response.data;
                console.log("Полученные слипы:", this.slips);
                this.error = null;  // Очищаем ошибку, если запрос успешен
            } catch (error) {
                console.error("Ошибка загрузки слипов:", error);
                this.error = error.message || "Не удалось загрузить слипы";  // Записываем ошибку в state
            }
        },
    },
});
