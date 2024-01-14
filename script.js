const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2NmZTQzNDMwOTMyZWIzZGZhNDMwZjJjMzkxMDcyMiIsInN1YiI6IjY1YTMwZmY4ZTljMGRjMDEyMGE0NDMxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rYRQ0qRL2zNllfW0uyAaviSDnssgYtDCEjz72v1o75Y'
  }
};

// Base URL for TMDb images with size preference w500
const baseImageUrl = "https://image.tmdb.org/t/p/w500";

//fetch api and list as cards
fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)

    data.results.forEach((value, index, array) => {
      let card = document.createElement("div");
      card.className = "card card-clickable col-lg-3 col-md-4 col-sm-6 my-3 mx-auto";
      card.style.width = "13rem";
      card.style.padding = "0";
      card.setAttribute("data-movie-id", value.id); // to store movie id

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
      cardTitle.textContent = value.title;

      let cardText = document.createElement("p");
      cardText.className = "card-text fs-6";
      cardText.textContent = value.release_date;

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      card.appendChild(cardImage);
      card.appendChild(cardBody);
      document.getElementById("appendData").appendChild(card);
    });
  })
  .catch(err => console.error(err));

//a function to get movie detail object taking movie id as a parameter
function getMovieDetail(id) {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '?language=en-US', options)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch(err => console.error(err));
}

// Function to open the modal and populate it with movie details
function openMovieModal(movie) {
  const modalTitle = document.getElementById("movieModalLabel");
  const modalPoster = document.getElementById("modalPoster");
  const modalReleaseDate = document.getElementById("modalReleaseDate");
  const modalRuntime = document.getElementById("modalRuntime");
  const modalOverview = document.getElementById("modalOverview");
  const modalVoteAverage = document.getElementById("modalVoteAverage");
  
  // Populate modal
  modalTitle.textContent = `${movie.title} (${new Date(movie.release_date).getFullYear()})`;
  modalPoster.src = `${baseImageUrl}${movie.poster_path}`;
  modalReleaseDate.textContent = movie.release_date;
  modalRuntime.textContent = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`;
  modalOverview.textContent = movie.overview;
  modalVoteAverage.textContent = movie.vote_average;

  // Open the modal
  const movieModal = new bootstrap.Modal(document.getElementById("movieModal"));
  movieModal.show();
}

//to launch modal on click of card
document.getElementById("appendData").addEventListener("click", (event) => {
  const clickedCard = event.target.closest(".card-clickable");
  if (clickedCard) {
    const movieID = clickedCard.dataset.movieId;
    console.log("Clicked on movie ID:", movieID);
    getMovieDetail(movieID)
      .then((ourMovie) => {
        console.log(ourMovie);
        openMovieModal(ourMovie)
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
 