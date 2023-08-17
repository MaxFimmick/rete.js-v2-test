import { createEditor as createDefaultEditor } from "./default";
import { createEditor as createPerfEditor } from "./perf";
import { createEditor as createCustomEditor } from "./customization";
import { createEditor as create3DEditor } from "./3d";

const factory = {
  default: createDefaultEditor,
  perf: createPerfEditor,
  customization: createCustomEditor,
  "3d": create3DEditor,
};

// eslint-disable-next-line no-restricted-globals, no-undef
// location !== 'undefined' -> 當前瀏覽器的 URL 不是空的，typeof 運算符用於確定變數是否已經被定義，如果 location 對象已經被定義，這個表達式的結果將是 true。
// location.search 返回 URL 中 ? 後面的查詢部分
const query =
  typeof location !== "undefined" && new URLSearchParams(location.search);
const name = ((query && query.get("template")) ||
  "default") as keyof typeof factory;

const createEditor = factory[name];

if (!createEditor) {
  throw new Error(`template with name ${name} not found`);
}

export { createEditor };
