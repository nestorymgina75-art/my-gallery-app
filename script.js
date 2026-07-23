const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');
const caption = document.getElementById('caption');
const postBtn = document.getElementById('postBtn');
const feed = document.getElementById('feed');

let imageData = null;

// Onyesha preview ya picha
imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      imageData = event.target.result;
      preview.src = imageData;
      preview.style.display = 'block';
    }
    reader.readAsDataURL(file);
  }
});

// Post picha mpya
postBtn.addEventListener('click', () => {
  if (imageData && caption.value.trim()!== '') {
    const post = document.createElement('div');
    post.classList.add('post');

    const date = new Date().toLocaleDateString('sw-TZ');

    post.innerHTML = `
      <img src="${imageData}">
      <p>${caption.value}</p>
      <div class="post-info">
        <button class="like-btn" onclick="likePost(this)">❤️ 0 Likes</button>
        <span>${date}</span>
      </div>
    `;

    feed.prepend(post); // weka juu kabisa

    // Safisha form
    imageData = null;
    preview.src = '';
    preview.style.display = 'none';
    caption.value = '';
    imageInput.value = '';
  } else {
    alert('Tafadhali chagua picha na uandike maelezo');
  }
});

// Kazi ya like
function likePost(btn) {
  let count = parseInt(btn.textContent.match(/\d+/)[0]);
  count++;
  btn.textContent = `❤️ ${count} Likes`;
}