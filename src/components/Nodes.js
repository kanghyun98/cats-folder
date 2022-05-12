export default class Nodes {
  constructor({ $target, data, onClickIcon, onClickBack }) {
    this.state = {
      data,
      isRoot: true,
    };

    this.$nodes = document.createElement('ul');
    this.$nodes.classList.add('Nodes');
    this.addEvent(this.$nodes);
    $target.appendChild(this.$nodes);

    this.handleClickIcon = onClickIcon;
    this.handleClickBack = onClickBack;
  }

  // Nodes 업데이트
  setState(data, isRoot) {
    this.state = {
      data,
      isRoot,
    };
    this.render();
  }

  // Icon 만드는 메소드
  makeIcon(id, name, type) {
    const iconPath =
      type === 'DIRECTORY' ? './assets/directory.png' : './assets/file.png';
    return `
          <div class="Node" id="${id}">
              <img src="${iconPath}" />
              <div>${name}</div>
          </div>
      `;
  }

  // 렌더링 메소드
  render() {
    this.$nodes.innerHTML = '';

    let $res = this.state.isRoot
      ? ''
      : '<div class="Node"><img src="./assets/prev.png"></div>';

    if (this.state.data) {
      this.state.data.forEach(({ id, name, type, filePath }) => {
        const $icon = this.makeIcon(id, name, type);
        $res += $icon;
      });
    }

    this.$nodes.innerHTML = $res;
  }

  // 이벤트 처리 (Event Deligation)
  addEvent($target) {
    $target.addEventListener('click', (e) => {
      const $node = e.target.closest('.Node');

      if ($node) {
        const nodeId = $node.id;

        if (!nodeId) {
          // 뒤로가기
          this.handleClickBack();
        } else {
          // file/directory
          const selectedNode = this.state.data.find(
            (node) => node.id === nodeId
          );
          this.handleClickIcon(selectedNode);
        }
      }
    });
  }
}
