import {LayerItem} from "./layer-item";
import {ItemCategory} from "./item-category";
/**
 * Created by garusis on 7/06/18.
 */

export interface Layer {
  layer_id: number;
  environment_id: number;
  layer_index: number;
  name: string;
  default_item: number;
  customizable: boolean;
  categories: Array<ItemCategory>;
  items: Array<LayerItem>;
}
