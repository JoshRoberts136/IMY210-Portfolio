<template>
  <div class="container mx-auto p-8">
    <h1 class="text-4xl font-bold mb-4">My Projects</h1>
    <div class="mb-6">
      <h2 class="text-2xl font-semibold">Current Weather in Pretoria</h2>
      <div v-if="weather">
        <p class="text-lg">{{ weather.temperature }}°C, {{ weather.description }}</p>
        <img v-if="weather.icon" :src="weather.icon" alt="Weather icon" class="mx-auto mt-2" />
      </div>
      <p v-else-if="error" class="text-lg text-red-500">Failed to load weather: {{ error }}</p>
      <p v-else class="text-lg">Loading weather...</p>
    </div>
    <div class="grid gap-4">
      <div class="border p-4 rounded">
        <h2 class="text-xl">Project 1</h2>
        <p>Completed in COS 216, this is a project that pulls from an API to populate an e-commerce website.</p>
        <a href="https://example.com/project1" target="_blank" class="text-blue-500 hover:underline">View Project 1</a>
      </div>
      <div class="border p-4 rounded">
        <h2 class="text-xl">Project 2</h2>
        <p>A COS 212 assignment where we coded chess.</p>
        <a href="https://example.com/project2" target="_blank" class="text-blue-500 hover:underline">View Project 2</a>
      </div>
      <div class="border p-4 rounded">
        <h2 class="text-xl">Project 3</h2>
        <p>This was an IMY 211 project where we created our rooms in blender!</p>
        <a href="https://example.com/project3" target="_blank" class="text-blue-500 hover:underline">View Project 3</a>
      </div>
    </div>
  </div>
</template>

<script setup>
const weather = ref(null);
const error = ref(null);
onMounted(async () => {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=-25.73&longitude=28.22&current=temperature_2m,weather_code&timezone=Africa%2FJohannesburg'
    );
    
    if (!response.ok) throw new Error('Weather API request failed');
    
    const data = await response.json();
    console.log('Weather API response:', data);
    const weatherCode = data.current.weather_code;
    const weatherInfo = getWeatherInfo(weatherCode);
    
    weather.value = {
      temperature: Math.round(data.current.temperature_2m),
      description: weatherInfo.description,
      icon: weatherInfo.icon
    };
    
    console.log('Processed weather data:', weather.value);
  } catch (err) {
    error.value = err.message || 'Unknown error';
    console.error('Error fetching weather:', err);
  }
});
function getWeatherInfo(code) {
  const weatherMap = {
    0: { description: 'Clear sky', icon: 'https://cdn-icons-png.flaticon.com/128/6974/6974833.png' },
    1: { description: 'Mainly clear', icon: 'https://cdn-icons-png.flaticon.com/128/6974/6974833.png' },
    2: { description: 'Partly cloudy', icon: 'https://cdn-icons-png.flaticon.com/128/414/414927.png' },
    3: { description: 'Overcast', icon: 'https://cdn-icons-png.flaticon.com/128/414/414927.png' },
    45: { description: 'Fog', icon: 'https://cdn-icons-png.flaticon.com/128/1779/1779807.png' },
    48: { description: 'Depositing rime fog', icon: 'https://cdn-icons-png.flaticon.com/128/1779/1779807.png' },
    51: { description: 'Light drizzle', icon: 'https://cdn-icons-png.flaticon.com/128/3313/3313888.png' },
    53: { description: 'Moderate drizzle', icon: 'https://cdn-icons-png.flaticon.com/128/3313/3313888.png' },
    55: { description: 'Dense drizzle', icon: 'https://cdn-icons-png.flaticon.com/128/3313/3313888.png' },
    61: { description: 'Slight rain', icon: 'https://cdn-icons-png.flaticon.com/128/3351/3351979.png' },
    63: { description: 'Moderate rain', icon: 'https://cdn-icons-png.flaticon.com/128/3351/3351979.png' },
    65: { description: 'Heavy rain', icon: 'https://cdn-icons-png.flaticon.com/128/3351/3351979.png' },
    80: { description: 'Slight rain showers', icon: 'https://cdn-icons-png.flaticon.com/128/3351/3351979.png' },
    81: { description: 'Moderate rain showers', icon: 'https://cdn-icons-png.flaticon.com/128/3351/3351979.png' },
    82: { description: 'Violent rain showers', icon: 'https://cdn-icons-png.flaticon.com/128/3351/3351979.png' },
  };
  
  return weatherMap[code] || { description: 'Weather data unavailable', icon: '' };
}

// Josh Roberts, u23536765
</script>