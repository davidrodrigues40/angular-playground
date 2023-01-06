import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { MenuItem } from "./models/menu-item";

export const menuActions = createActionGroup({
  source: 'MENU',
  events: {
    'Get All': emptyProps(),
    'Get All Success': props<{ payload: ReadonlyArray<MenuItem> }>()
  }
})