export default class Nodes {
  constructor({ $app, nodes, onClickIcon, onClickBackIcon }) {
    this.state = {
      nodes,
      isRoot: true,
    };
    this.handleClickIcon = onClickIcon;
    this.handleClickBackIcon = onClickBackIcon;

    this.$nodes = document.createElement('ul');
    this.$nodes.classList.add('Nodes');
    this.addEvent(this.$nodes);
    $app.appendChild(this.$nodes);

    this.render(true); // 초기엔 root
  }

  // Nodes 상태 업데이트
  setState(newNodes, isRoot) {
    this.state = {
      nodes: newNodes,
      isRoot,
    };

    this.render();
  }

  // 이벤트 처리 (Event Deligation)
  addEvent($target) {
    $target.addEventListener('click', (e) => {
      const $node = e.target.closest('.Node');

      if ($node) {
        const nodeId = $node.id;
        if (nodeId) {
          // 폴더, 파일 클릭 시
          const targetNode = this.state.nodes.find(
            (node) => node.id === nodeId
          );
          this.handleClickIcon(targetNode);
        } else {
          // 뒤로가기 클릭 시
          this.handleClickBackIcon();
        }
      }
    });
  }

  // 렌더링
  render() {
    this.$nodes.innerHTML = ''; // $nodes 비우기
    const $icons = this.makeNodeIcons();
    this.$nodes.innerHTML = $icons;
  }

  makeNodeIcons() {
    let $icons = this.state.isRoot
      ? ''
      : `
          <div class="Node">
              <img src="./assets/prev.png">
          </div>
      `;

    this.state.nodes.forEach(({ id, name, type }) => {
      const iconImgPath =
        type === 'DIRECTORY' ? './assets/directory.png' : './assets/file.png';

      $icons += `
          <div class=Node id=${id}>
             <img src=${iconImgPath} /> 
             <div>${name}</div>
          </div>
      `;
    });

    return $icons;
  }
}
