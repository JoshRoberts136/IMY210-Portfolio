<template>
  <div class="container mx-auto p-8 text-center">
    <h1 class="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
    <img src="/profile.jpg" alt="Profile Photo" class="w-56 h-56 rounded-full mx-auto mb-4" />
    <p class="text-lg mb-4">Hello! I'm Josh Roberts, a student at the University of Pretoria. I enjoy watching Fromula 1 and I have a love hate reltionship with my football club, Chelsea. I grew up in Ballito but always knew that Pretoria was where I would end up studying. I started off in Accounting but am now very happy in Multimedia!</p>
    <div class="mt-6">
      <h2 class="text-2xl font-semibold">Random Quote</h2>
      <div v-if="quote">
        <p class="text-lg italic">"{{ quote.content }}"</p>
        <p class="text-lg font-medium">— {{ quote.author }}</p>
        <p v-if="quote.house" class="text-lg">{{ quote.house }}</p>
      </div>
      <p v-else-if="error" class="text-lg text-red-500">Failed to load quote: {{ error }}</p>
      <p v-else class="text-lg">Loading quote...</p>
    </div>
  </div>
</template>

<script setup>
const quote = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('https://api.quotable.io/random');
    if (!response.ok) throw new Error('Failed to fetch quote');
    
    const data = await response.json();
    quote.value = {
      content: data.content,
      author: data.author,
      house: ''
    };
    console.log('Quote loaded:', quote.value);
  } catch (err) {
    try {
      const gotResponse = await fetch('https://api.gameofthronesquotes.xyz/v1/random');
      if (!gotResponse.ok) throw new Error('Fallback API failed');
      
      const gotData = await gotResponse.json();
      quote.value = {
        content: gotData.sentence,
        author: gotData.character?.name || 'Unknown',
        house: gotData.character?.house?.name || ''
      };
      console.log('Fallback quote loaded:', quote.value);
    } catch (fallbackErr) {
      quote.value = {
        content: "The man who passes the sentence should swing the sword.",
        author: "Ned Stark",
        house: "House Stark"
      };
      error.value = "API connection issue - showing default quote";
      console.error('Error fetching quotes:', fallbackErr);
    }
  }
});
// Josh Roberts, u23536765
</script>