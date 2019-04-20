const settings = {
  addReviewBtnClass: "addBtn",
  deleteReviewBtnClass: "deleteBtn",
  successReviewBtnClass: "successBtn",
  denialReviewBtnClass: "denialBtn",
  checkReviewClass: "review-check-box",
  listReviewClass: "review",
  checkReviewContainerClass: "review-check-list",
  listReviewContainerClass: "review-list",
};

$(document).ready(() => {
  // Reviews
  let reviews = new Reviews(settings,'feedback.json');
  // Add review

});