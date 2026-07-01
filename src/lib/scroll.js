// Smooth scroll to a section by ID
export function scrollToId(id) {
  const el = document.getElementById(id);

  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Generate TMDB URL for a movie or TV show
export function tmdbUrl(type, id) {
  return `https://www.themoviedb.org/${type}/${id}`;
}
