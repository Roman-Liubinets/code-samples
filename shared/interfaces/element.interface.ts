import { ElementMaterialsEnum } from "../enums";

export interface IElementMaterial {
  id?: string;
  type: ElementMaterialsEnum;
  title: string;
  link: string;
  status?: number;
}
