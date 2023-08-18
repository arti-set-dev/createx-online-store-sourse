export const renderRating = (rating) => {
  let stars = '';

  for (let i = 0; i < 5; i++) {
    stars +=  `<li class="rating__star ${i < rating ? 'rating__star--noted' : ''}"></li>`;
  }
  return stars;
}
