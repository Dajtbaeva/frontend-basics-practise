const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const fetchPostsBtn = document.querySelector("#fetch");
const createPostForm = document.querySelector("#create-post-form");
const cancelBtn = document.querySelector("#cancel");

const API_URL = "https://jsonplaceholder.typicode.com/posts";
let controller;

// const xhr = new XMLHttpRequest();

// xhr.open("GET", API_URL);

// xhr.responseType = "json";

// xhr.onload = () => {
//   // const posts = JSON.parse(xhr.response);
//   const posts = xhr.response;

//   for (const post of posts) {
//     const postEl = document.importNode(postTemplate.content, true);
//     postEl.querySelector("h2").textContent = post.title.toUpperCase();
//     postEl.querySelector("p").textContent = post.body;

//     listElement.appendChild(postEl);
//   }
// };
// xhr.send();

// function sendHttpRequest() {
//   const promise = new Promise((resolve) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", API_URL);
//     xhr.responseType = "json";

//     xhr.onload = () => {
//       resolve(xhr.response);
//     };
//     xhr.send();
//   });

//   return promise;
// }

// fetchPostsBtn.addEventListener("click", async () => {
//   const posts = await sendHttpRequest();

//   for (const post of posts) {
//     const postEl = document.importNode(postTemplate.content, true);
//     postEl.querySelector("h2").textContent = post.title.toUpperCase();
//     postEl.querySelector("p").textContent = post.body;

//     listElement.appendChild(postEl);
//   }
// });

function sendHttpRequest(method, url, body) {
  //   const promise = new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open(method, url);
  //     xhr.setRequestHeader("Authorization", "Bearer xh");

  //     xhr.responseType = "json";

  //     xhr.onload = () => {
  //       if (xhr.status >= 200 && xhr.status < 300) {
  //         resolve(xhr.response);
  //       } else {
  //         reject(new Error("Internal server error"));
  //       }
  //     };
  //     xhr.send(JSON.stringify(body));
  //   });

  //   return promise;

  controller = new AbortController();
  const signal = controller.signal;

  return fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      Authorization: "Bearer token",
      "Content-type": "application/json; charset=UTF-8",
    },
    signal,
  }).then((res) => res.json());
}

fetchPostsBtn.addEventListener("click", async () => {
  try {
    const posts = await sendHttpRequest("GET", API_URL);

    for (const post of posts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector(".post-item").id = post.id;

      listElement.appendChild(postEl);
    }
    // sendHttpRequest("GET", API_URL).then((posts) => {
    //   for (const post of posts) {
    //     const postEl = document.importNode(postTemplate.content, true);
    //     postEl.querySelector("h2").textContent = post.title.toUpperCase();
    //     postEl.querySelector("p").textContent = post.body;
    //     postEl.querySelector(".post-item").id = post.id;
    //     listElement.appendChild(postEl);
    //   }
    // });
  } catch (e) {
    alert(e);
  }
});

// fetchPostsBtn.addEventListener("click", async () => {
//   const posts = await sendHttpRequest("GET", API_URL);

//   for (const post of posts) {
//     const postEl = document.importNode(postTemplate.content, true);
//     postEl.querySelector("h2").textContent = post.title.toUpperCase();
//     postEl.querySelector("p").textContent = post.body;
//     postEl.querySelector(".post-item").id = post.id;

//     listElement.appendChild(postEl);
//   }
// });

// Add new post
createPostForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = {
    userId: crypto.randomUUID(),
    title: e.target.title.value,
    content: e.target.body.value,
  };
  await sendHttpRequest("POST", API_URL, payload);
});

// Delete post
listElement.addEventListener("click", async (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.closest("li").id;
    await sendHttpRequest("DELETE", `${API_URL}/${id}`);
    console.log(`Deleted ${id} post`);
  }
});

// Cancel request
cancelBtn.addEventListener("click", () => controller.abort());
