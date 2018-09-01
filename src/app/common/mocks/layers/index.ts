import {Layer} from "../../models/layer";
import {environment3} from "./environment-3"
import {environment1} from "./environment-1";
import {environment2} from "./environment-2";
import {environment4} from "./environment-4";
import {environment5} from "./environment-5";
import {environment6} from "./environment-6";

/**
 * Created by garusis on 31/08/18.
 */
export const layerList: Array<Layer> = [
  ...environment6,
  ...environment5,
  ...environment4,
  ...environment3,
  ...environment2,
  ...environment1
];
