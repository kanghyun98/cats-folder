export default class ImageView {
  constructor($body) {
    this.state = {
      imgURL: '',
    };

    this.$modalWrapper = document.createElement('div');
    this.$modalWrapper.classList.add('Modal', 'hidden');
    $body.appendChild(this.$modalWrapper);

    this.render();
  }

  setState(filePath) {
    const BASIC_IMG_PATH =
      'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';
    this.state = {
      ...this.state,
      imgURL: BASIC_IMG_PATH + filePath,
    };

    this.render();
    this.openModal();
  }

  render() {
    this.$modalWrapper.innerHTML = '';

    const $modalContent = document.createElement('div');
    $modalContent.classList.add('ModalContent');

    const $contentImg = document.createElement('img');
    $contentImg.src = this.state.imgURL;
    $modalContent.appendChild($contentImg);

    const $modalOverlay = document.createElement('div');
    $modalOverlay.classList.add('ModalOverlay');

    this.$modalWrapper.appendChild($modalOverlay);
    this.$modalWrapper.appendChild($modalContent);

    this.addCloseEvents($modalOverlay);
  }

  addCloseEvents($target) {
    $target.addEventListener('click', () => {
      this.closeModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  closeModal() {
    this.$modalWrapper.classList.add('hidden');
  }

  openModal() {
    this.$modalWrapper.classList.remove('hidden');
  }
}
