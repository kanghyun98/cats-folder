import { getNodesById } from './api/cats.js';
import Breadcrumb from './components/Breadcrumb.js';
import Nodes from './components/Nodes.js';
import ImageView from './components/ImageView.js';
import Loading from './components/Loading.js';

const cache = {}; // nodeId로 Node 저장하는 캐시 (root: 0)

export default class App {
  constructor($app) {
    this.$app = $app;

    // 상태
    this.state = {
      nodes: [],
      path: [],
    };

    // 경로 관련 처리
    this.breadcrumb = new Breadcrumb({
      $app,
      path: this.state.path,
      onClickPath: ($target) => {
        if (Number($target.id) < this.state.path.length) {
          const newPath = this.state.path.slice(0, Number($target.id));
          const newNodes = cache[newPath[newPath.length - 1]?.id || '0'];
          const newState = {
            nodes: newNodes,
            path: newPath,
          };

          this.setState(newState);
        }
      },
    });

    // 파일,폴더 관련 처리
    this.nodes = new Nodes({
      $app,
      nodes: this.state.nodes,
      onClickIcon: async (targetNode) => {
        if (targetNode.type === 'DIRECTORY') {
          // 폴더 클릭 시, 하위 폴더로 이동
          let newNodes;
          if (cache[targetNode.id]) {
            newNodes = cache[targetNode.id]; // 캐싱
          } else {
            newNodes = await this.getNodesByIdWithLoading(targetNode.id);
            cache[targetNode.id] = newNodes;
          }
          const newPath = [...this.state.path, targetNode];
          const newState = {
            nodes: newNodes,
            path: newPath,
          };

          this.setState(newState);
        } else {
          // 파일 클릭 시, 모달 띄우기
          this.imageView.setState(targetNode.filePath);
        }
      },
      onClickBackIcon: () => {
        const newPath = [...this.state.path];
        newPath.pop();

        const backNode = newPath[newPath.length - 1];
        const newNodes = cache[backNode?.id || '0'];
        const newState = {
          nodes: newNodes,
          path: newPath,
        };

        this.setState(newState);
      },
    });

    // 모달(이미지)
    this.imageView = new ImageView(document.querySelector('body'));

    // 로딩 스피너
    this.loading = new Loading(document.querySelector('body'));

    // 초기
    this.init();
  }

  setState(newState) {
    this.state = newState;

    const isRoot = this.state.path.length === 0;
    this.nodes.setState(this.state.nodes, isRoot);
    this.breadcrumb.setState(this.state.path);
  }

  async getNodesByIdWithLoading(url) {
    this.loading.toggleLoading();
    const data = await getNodesById(url);
    this.loading.toggleLoading();

    return data;
  }

  async init() {
    const newNodes = await this.getNodesByIdWithLoading(); // root nodes

    const newState = {
      ...this.state,
      nodes: newNodes,
    };

    this.setState(newState);

    cache['0'] = newNodes; // root 캐시
  }
}
