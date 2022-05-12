export default class Breadcrumb {
  constructor({ $target, data, onClickNav }) {
    this.state = data;

    this.$breadcrumb = document.createElement('nav');
    this.$breadcrumb.classList.add('Breadcrumb');
    this.addEvent(this.$breadcrumb);
    $target.appendChild(this.$breadcrumb);

    this.handleClick = onClickNav;
  }

  setState(data) {
    this.state = data;
    this.render();
  }

  makePath(path, idx) {
    return `
          <div class="path-item" id=${idx}>
              ${path}
          </div>
      `;
  }

  render() {
    this.$breadcrumb.innerHTML = '';

    let $res = this.makePath('root', 0);
    if (this.state.length) {
      this.state.forEach((node, idx) => {
        $res += this.makePath(node.name, idx + 1);
      });
    }

    this.$breadcrumb.innerHTML = $res;
  }

  addEvent($target) {
    $target.addEventListener('click', (e) => {
      const $navItem = e.target.closest('.path-item');

      if ($navItem) {
        this.handleClick($navItem);
      }
    });
  }
}
