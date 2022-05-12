const IMAGE_BASIC_URL =
  'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';

export default class ImageView {
  constructor({ $target }) {
    this.$target = $target;
    this.imgURL = null;

    this.$modalWrapper = document.createElement('div');
    this.$modalWrapper.classList.add('ModalWrapper', 'hidden');
    $target.appendChild(this.$modalWrapper);

    this.render();
  }

  setState(filePath) {
    const imgURL = IMAGE_BASIC_URL + filePath;
    this.imgURL = imgURL;

    this.toggleModal();
    this.render();
  }

  toggleModal() {
    this.$modalWrapper.classList.toggle('hidden');
  }

  onCloseModal() {
    this.$modalWrapper.classList.add('hidden');
    this.$modalWrapper.innerHTML = '';
  }

  render() {
    const $modalContent = document.createElement('div');
    $modalContent.classList.add('ModalContent');

    const $modalImg = document.createElement('img');
    $modalImg.src = this.imgURL;

    const $modalOverlay = document.createElement('div');
    $modalOverlay.classList.add('ModalOverlay');

    // 모달 닫기 이벤트 (외부 클릭, esc 클릭)
    $modalOverlay.addEventListener('click', () => {
      this.onCloseModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.onCloseModal();
      }
    });

    $modalContent.appendChild($modalImg);

    this.$modalWrapper.appendChild($modalContent);
    this.$modalWrapper.appendChild($modalOverlay);
  }
}
