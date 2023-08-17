import { NodeEditor, type GetSchemes, ClassicPreset } from 'rete';
import { AreaPlugin, AreaExtensions } from 'rete-area-plugin';
import { ClassicFlow, ConnectionPlugin, Presets as ConnectionPresets } from 'rete-connection-plugin';
import { VuePlugin, Presets, type VueArea2D } from 'rete-vue-plugin';

type Schemes = GetSchemes<ClassicPreset.Node, ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>>;

type AreaExtra = VueArea2D<Schemes>;

export async function createEditor(container: HTMLElement) {
  const socket = new ClassicPreset.Socket('socket');

  // 定義類型和初始化編輯器實例
  const editor = new NodeEditor<Schemes>();

  // 互動式連接:此功能使用戶能夠與節點進行交互。
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();

  // 創建 Vue.js 渲染的區域
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const render = new VuePlugin<Schemes, AreaExtra>();

  // 可選節點
  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl(),
  });

  render.addPreset(Presets.classic.setup());

  connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(area);
  area.use(connection);
  area.use(render);

  // 節點順序
  AreaExtensions.simpleNodesOrder(area);

  // 添加 nodeA
  const nodeA = new ClassicPreset.Node('A');
  let modifiedTime: string;
  nodeA.addControl(
    'a',
    new ClassicPreset.InputControl('text', {
      initial: 'test',
      change(value) {
        modifiedTime = new Date().toLocaleString();
        return { value, modifiedTime };
      },
    })
  );

  // 可取得修改過的值
  // setTimeout(() => {
  //   console.log('changed', nodeA.controls.a);
  // }, 3000);

  // 設置 output 節點
  nodeA.addOutput('a', new ClassicPreset.Output(socket, 'test'));
  await editor.addNode(nodeA);

  // 添加 nodeB
  const nodeB = new ClassicPreset.Node('B');
  nodeB.addControl('b', new ClassicPreset.InputControl('number', { initial: 0 }));
  nodeB.addInput('b', new ClassicPreset.Input(socket));
  await editor.addNode(nodeB);

  // 節點定位
  await area.translate(nodeB.id, { x: 270, y: 0 });

  // 建立 Node 連接
  await editor.addConnection(new ClassicPreset.Connection(nodeA, 'a', nodeB, 'b'));

  AreaExtensions.zoomAt(area, editor.getNodes());

  return () => area.destroy();
}
