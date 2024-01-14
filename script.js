
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2NmZTQzNDMwOTMyZWIzZGZhNDMwZjJjMzkxMDcyMiIsInN1YiI6IjY1YTMwZmY4ZTljMGRjMDEyMGE0NDMxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rYRQ0qRL2zNllfW0uyAaviSDnssgYtDCEjz72v1o75Y'
  }
};

fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
  .then((response) => response.json())
  .then((data) => {
    // Base URL for TMDb images (use the appropriate size)
    const baseImageUrl = "https://image.tmdb.org/t/p/w500"; // You can choose the size you prefer (e.g., w185, w500, etc.)

    data.results.forEach((value, index, array) => {
      console.log(value);

      let wrapper = document.createElement("div");
      wrapper.className = "card col-lg-3 col-md-4 col-sm-6 m-3 border-0";
      wrapper.style.width = "13rem";
      wrapper.style.padding = "0";

      let cardImage = document.createElement("img");
      cardImage.className = "card-img-top img-fluid";
      let posterUrl = `${baseImageUrl}${value.poster_path}`;
      cardImage.setAttribute("src", posterUrl);
      cardImage.style.height = "auto";
      cardImage.style.width = "100%";
      

      let cardBody = document.createElement("div");
      cardBody.className = "card-body";

      let cardTitle = document.createElement("h5");
      cardTitle.className = "card-title";
      cardTitle.textContent = value.original_title;

      let text = document.createElement("p");
      text.className = "card-text";
      text.textContent = value.release_date;

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(text);
      wrapper.appendChild(cardImage);
      wrapper.appendChild(cardBody);
      document.getElementById("appendData").appendChild(wrapper);
    });
  })
  .catch(err => console.error(err));
