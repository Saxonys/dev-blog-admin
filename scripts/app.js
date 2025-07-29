const postContainer = document.getElementById("post-container");
const form = document.getElementById("postForm");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");


const toastEl = document.getElementById("toast");
const toast = new bootstrap.Toast(toastEl);

// store the posts in an array on the browser
// NOTE: if you add too many, this would break most likely
let allPosts = [];

// link to the json with the blog posts
const DATA_URL = "https://saxonys.github.io/static-blog-content/blog-data.json";

// sort posts by date
function sortPosts(posts, order = "newest") {
  return posts.slice().sort((a, b) => {
    // Compare as ISO date strings (YYYY-MM-DD)
    if (order === "newest") {
      return b.date.localeCompare(a.date);
    } else {
      return a.date.localeCompare(b.date);
    }
  });
}

// sort by search
function filterPosts(posts, query) {
  if (!query) return posts;
  const q = query.trim().toLowerCase();
  return posts.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(q);
    const tagsMatch = Array.isArray(post.tags) && post.tags.some(tag => tag.toLowerCase().includes(q));
    return titleMatch || tagsMatch;
  });
}

// render a single post, used for the add post thing
function renderPost(post) {
  const card = document.createElement("div");
  card.className = "card p-3 mb-3";
  card.innerHTML = `
    <h5>${post.title}</h5>
    <small class="text-muted">${post.date}</small>
    <p>${post.content.replace(/\n/g, "<br>")}</p>
    <div>${post.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join("")}</div>
  `;
  postContainer.appendChild(card);
}

// render all the posts
function renderPosts(posts) {
  const sortOrder = sortSelect.value;
  const searchQuery = searchInput.value;
  const filtered = filterPosts(posts, searchQuery);
  const sorted = sortPosts(filtered, sortOrder);
  postContainer.innerHTML = "";
  sorted.forEach(renderPost);
}

// submit a post for you to see!
form.addEventListener("submit", e => {
  e.preventDefault();
  const newPost = {
    title: form.title.value,
    date: form.date.value,
    content: form.content.value,
    tags: form.tags.value.split(",").map(tag => tag.trim()).filter(tag => tag)
  };
  allPosts.unshift(newPost);
  renderPosts(allPosts); //re-render the posts
  toast.show();
  form.reset();
  bootstrap.Modal.getInstance(document.getElementById("postModal")).hide();
});

// resort the blogs as specified
sortSelect.addEventListener("change", () => {
  renderPosts(allPosts);
});

searchInput.addEventListener("input", () => {
  renderPosts(allPosts);
});

// load the posts onto the site
async function loadPosts() {
  try {
    const res = await fetch(DATA_URL);
    const data = await res.json();
    allPosts = data;
    renderPosts(allPosts);
  } catch (err) {
    console.error("Error fetching data:", err); // something bad happened so just say we can't load it
    postContainer.innerHTML = "<p class='text-danger'>Unable to load blog posts.</p>";
  }
}

loadPosts();
