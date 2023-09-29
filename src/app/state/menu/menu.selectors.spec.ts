import { MenuState } from "../app.state";
import * as selectors from './menu.selectors';
import { MenuItem } from "./models/menu-item";

describe('Menu Selectors', () => {
    const initialState: MenuState = {
        items: []
    };
    const item: MenuItem = {
        value: "",
        route: ""
    };

    it('should select the feature state', () => {
        const menu = selectors.getMenu.projector({ ...initialState, items: [item] });

        expect(menu).toEqual([item]);
    });
});