# 🛠️ Blog Admin Panel

A simple blog admin app for viewing and temporarily adding blog posts. This repo is designed to integrate with a separate data server using `fetch()` and provide a clean UI for blog management.

## 🔗 Live App

[👉 View the Developer Blog](https://yourusername.github.io/your-repo-name/)

---

## 📁 Folder Structure

```
/
├── index.html
├── styles/
│   └── style.css
├── scripts/
│   └── main.js
├── imgs/
│   └── wireframe.png
├── README.md
```

---

## 🔌 Data Fetch Example (No CORS)

```js
async function loadPosts() {
  try {
    const res = await fetch(DATA_URL);
    const data = await res.json();
    allPosts = data;
    renderPosts(allPosts);
  } catch (err) {
    console.error("Error fetching data:", err); 
    postContainer.innerHTML = "<p class='text-danger'>Unable to load blog posts.</p>";
  }
}
```

---

## 🧩 Extras Used For Assignment (5)

- ✅ Bootstrap 5 Modal for "Add New Post"
- ✅ Filter/Search through blog posts
- ✅ Bootstrap 5 Icons
- ✅ BS5 Toast for submission success (optional)
- ✅ Async/Await used to update inputs dynamically
- ❌ Forgot to collaborate with professor so I added 5 extras for +10 points each!

