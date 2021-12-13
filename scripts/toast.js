function toast(object)  {
  const main = document.getElementById('toast');
  if (main) {
      const toast = document.createElement('div');
      // auto close
      const autoClose = setTimeout(function(){
          main.removeChild(toast);
      },object.duration + 1000);

      // close when clicked
      toast.onclick = function(e){
          if (e.target.closest(".toast__close")) {
              main.removeChild(toast);
              clearTimeout(autoClose);
          }
      }

      const icons = {
          success: 'fa-check-circle',
          info: 'fa-info-circle',
          warning: 'fas fa-dot-circle',
          error: 'fas fa-exclamation-circle',
      };
      const icon = icons[object.type];
      const delay = (object.duration / 1000).toFixed(2);
      toast.classList.add('toast',`toast--${object.type}`);
      toast.style.animation = `slideInLeft ease 0.5s , fadeOut linear 1s ${delay}s forwards`;
      toast.innerHTML=`
          <div class="toast__icon">
              <i class="fas ${icon}"></i>
          </div>
          <div class="toast__body">
              <h3 class="toast__title">${object.title}</h3>
              <p class="toast__msg">${object.messenger}</p>
          </div>
          <div class="toast__close">
              <i class="fas fa-times"></i>
          </div>
      `;
      main.appendChild(toast);
  }
}

function showSuccessToast() {
  toast({
      title: 'Success',
      messenger: 'Đăng nhập thành công',
      type: 'success',
      duration: 3000
});
}
function showInfoToast() {
  toast({
      title: 'Info',
      messenger: 'Máy vi tính thiếu thông tin, cần bạn bổ sung',
      type: 'info',
      duration: 3000
  });
}
function showWarningToast() {
  toast({
      title: 'Warning',
      messenger: 'Máy vi tính đã truy cập vô trang cấm',
      type: 'warning',
      duration: 3000
});
}
function showErrorToast() {
  toast({
      title: 'Error',
      messenger: `Máy lỗi`,
      type: 'error',
      duration: 3000
  });
}