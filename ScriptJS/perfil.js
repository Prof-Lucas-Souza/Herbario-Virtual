const input = document.getElementById('fotoPerfil');
const preview = document.getElementById('preview');

input.addEventListener('change', () => {
  const file = input.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
  }
});
