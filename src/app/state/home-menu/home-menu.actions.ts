import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { MenuItem } from "../menu/models/menu-item";

export const homeMenuActions = createActionGroup({
    source: 'HOME_MENU',
    events: {
        'Get Home Menu': emptyProps(),
        'Get Home Menu Success': props<{ payload: ReadonlyArray<MenuItem> }>(),
        'Get Home Menu Error': props<{ payload: any }>()
    },
});