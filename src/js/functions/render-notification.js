export const renderNotification = (target, message) => {
  target.insertAdjacentHTML('afterbegin', `<span class="notification-text">${message}</span>`);
}
//
