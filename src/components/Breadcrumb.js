export default class Breadcrumb {
  constructor({ $app, path, handleClickPath }) {
    this.state = path;
    this.onClickPath = handleClickPath;

    this.$nav = document.createElement('nav');
    this.$nav.classList.add('Breadcrumb');
    $app.appendChild(this.$nav);

    this.addEvent(this.$nav);

    this.render();
  }

  // Path 상태 업데이트
  setState(newPath) {
    this.state = newPath;
    this.render();
  }

  // 이벤트 처리
  addEvent($target) {
    $target.addEventListener('click', (e) => {
      const $breadcrumbItem = e.target.closest('.BreadcrumbItem');

      if ($breadcrumbItem) {
        this.onClickPath($breadcrumbItem);
      }
    });
  }

  // 렌더링
  render() {
    this.$nav.innerHTML = '';
    const $path = this.makePath();
    this.$nav.innerHTML = $path;
  }

  makePath() {
    let $path = `<div class='BreadcrumbItem' id=0>root</div>`;
    if (this.state.length > 0) {
      this.state.forEach((node, idx) => {
        $path += `<div class='BreadcrumbItem' id=${idx + 1}>${node.name}</div>`;
      });
    }

    return $path;
  }
}
