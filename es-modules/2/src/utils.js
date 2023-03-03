function returnHi(name) {
  return `hi ${name}`;
}

function returnOk(isOk) {
  return `isOk: ${isOk}`;
}

const API_URL =
  "https://api.github.com/users/techorda3/repos?per_page=2&page=1";

const API_URL_2 = "testapp";

// export default API_URL;

export { returnHi as default, returnOk };
