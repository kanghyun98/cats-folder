export default class Loading {
  constructor($body) {
    this.$loadingWrapper = document.createElement('div');
    this.$loadingWrapper.classList.add('LoadingWrapper', 'hidden');
    $body.appendChild(this.$loadingWrapper);

    this.render();
  }

  toggleLoading() {
    this.$loadingWrapper.classList.toggle('hidden');
  }

  render() {
    this.$loadingWrapper.innerHTML = `
          <img src=${'./assets/nyan-cat.gif'} />
      `;
  }
}
