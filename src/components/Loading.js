export default class Loading {
  constructor({ $target }) {
    this.$target = $target;

    this.$loadingWrapper = document.createElement('div');
    this.$loadingWrapper.classList.add('LoadingWrapper', 'hidden');
    $target.appendChild(this.$loadingWrapper);

    this.render();
  }

  toggleLoading() {
    this.$loadingWrapper.classList.toggle('hidden');
  }

  render() {
    const $loadingImg = document.createElement('img');
    $loadingImg.src = './assets/nyan-cat.gif';

    this.$loadingWrapper.appendChild($loadingImg);
  }
}
