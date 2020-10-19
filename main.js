// JavaScript
const numberOfPosts = 3;
const getRes = () => {
  fetch(
    `https://blog.coachmap.me/wp-json/wp/v2/posts?_embed&per_page=` +
      numberOfPosts
  )
    .then((res) => res.json())
    .then((res) => getBlogs(res));
};

const getBlogs = (e) => {
  let temparray = [];

  e.forEach((elem) => {
    let temp = [];
    temp.title = elem.title.rendered;
    temp.imageScr = elem._embedded["wp:featuredmedia"]["0"].source_url;
    temp.link = elem.link;
    temp.excerpt = elem.excerpt.rendered;
    temparray.push(temp);
  });

  showResults(temparray);
};

const showResults = (list) => {
  if (list.length <= 0) {
    console.log("sin datos");
    return null;
  }

  let loading = document.getElementById("loading");
  loading.parentNode.removeChild(loading);

  let container = document.getElementById("listRecent");

  list.forEach((elem) => {
    let bloggy = document.createElement("li");
    bloggy.setAttribute("class", "listRecentItem");
    bloggy.innerHTML = `<a href="${elem.link}>
        <div class="listRecentItemContainer">
            <a href="${elem.link}"><img src="${elem.imageScr}" alt="${elem.title}" class="listRecentItemImage" id="overlay2"></a>
        </div>
        <div class="listRecentItemTitle width300px">
            <a href="${elem.link}><h4 class="p18px" id="blog-title">${elem.title}</h4></a>
        </div>
        <div class="listRecentItemExcerpt width300px" id="truncate">
            <p id="truncate" >${elem.excerpt}</p>
        </div>
        <a href="${elem.link}" alt="leer mas" id="see-more"> Ver más</a>
    </a>`;
    container.appendChild(bloggy);
  });
};

getRes();

//href="${elem.link}" href="${elem.link}"
//class="flexContainer"
const row = document.querySelector(".contenedor-carrousel");
const coaches = document.querySelector(".img");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

rightArrow.addEventListener("click", () => {
  row.scrollLeft += row.offsetWidth;
  console.log(row.scrollLeft);
});

leftArrow.addEventListener("click", () => {
  row.scrollLeft -= row.offsetWidth;
});
