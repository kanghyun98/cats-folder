import getDirDataAPI from './util/api.js';
import Nodes from './components/Nodes.js';
import Breadcrumb from './components/Breadcrumb.js';
import ImageView from './components/ImageView.js';
import Loading from './components/Loading.js';

const cache = {};

export default class App {
  constructor($target) {
    // State
    this.state = {
      nodes: [],
      path: [],
    };

    // Breadcrumb
    this.breadcrumb = new Breadcrumb({
      $target,
      data: this.state.path,
      onClickNav: async (navItem) => {
        const newPath = this.state.path.slice(0, Number(navItem.id));
        const newNodes = cache[newPath[newPath.length - 1]?.id || '0'];

        const newState = {
          nodes: newNodes,
          path: newPath,
        };

        this.setState(newState);
      },
    });

    // Nodes
    this.nodes = new Nodes({
      $target,
      data: this.state.nodes,
      onClickIcon: async (node) => {
        if (node.type === 'DIRECTORY') {
          let newNodes;
          if (cache[node.id]) {
            newNodes = cache[node.id];
          } else {
            newNodes = await this.getDirDataAPIWithLoading(node.id);
            cache[node.id] = newNodes;
          }

          this.setState({
            ...this.state,
            nodes: newNodes,
            path: [...this.state.path, node],
          });
        } else if (node.type === 'FILE') {
          this.imageView.setState(node.filePath);
        }
      },
      onClickBack: () => {
        const newState = { ...this.state };
        newState.path.pop();
        const targetNode = newState.path[newState.path.length - 1];

        const newId = targetNode ? targetNode.id : '0'; // root 확인
        newState.nodes = cache[newId];

        this.setState(newState);
      },
    });

    // ImageView
    this.imageView = new ImageView({ $target });

    // Loading
    this.loading = new Loading({ $target });

    // Init
    this.init();
  }

  async getDirDataAPIWithLoading(id) {
    this.loading.toggleLoading();
    const data = await getDirDataAPI(id);
    this.loading.toggleLoading();

    return data;
  }

  setState(newState) {
    this.state = newState;

    // Breadcrumb 업데이트
    this.breadcrumb.setState(this.state.path);

    // 메인 화면 업데이트
    const isRoot = this.state.path.length === 0 ? true : false;
    this.nodes.setState(this.state.nodes, isRoot);
  }

  async init() {
    const rootNodes = await this.getDirDataAPIWithLoading();
    const newState = { ...this.state, nodes: rootNodes };
    this.setState(newState);

    cache['0'] = rootNodes;
  }
}
