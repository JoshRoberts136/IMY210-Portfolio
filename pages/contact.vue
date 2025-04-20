<template>
  <div class="container mx-auto p-8">
    <h1 class="text-4xl font-bold mb-4">Contact Me</h1>
    <form name="contact" method="POST" data-netlify="true" class="flex flex-col gap-4 max-w-md mx-auto">
      <input type="hidden" name="form-name" value="contact" />
      <label for="name" class="text-lg">Name:</label>
      <input type="text" id="name" name="name" required class="p-2 border rounded" />
      <label for="email" class="text-lg">Email:</label>
      <input type="email" id="email" name="email" required class="p-2 border rounded" />
      <label for="message" class="text-lg">Message:</label>
      <textarea id="message" name="message" required class="p-2 border rounded"></textarea>
      <button type="submit" class="bg-blue-500 text-white p-2 rounded">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'default',
  // Josh Roberts, u23536765
}
</script>