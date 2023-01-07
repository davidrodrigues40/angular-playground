import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ChuckNorrisFact } from "./models/chuck-norris-fact";
import { FactCategory } from "./models/fact-category";

export const factActions = createActionGroup({
  source: 'CHUCK',
  events: {
    'Get Fact': emptyProps(),
    'Get Fact Success': props<{ payload: Readonly<ChuckNorrisFact> }>(),
    'Get Fact Failed': props<{ payload: any }>(),
    'Get Fact For Category': props<{ payload: FactCategory }>()
  }
});

export const categoryActions = createActionGroup({
  source: 'CATEGORIES',
  events: {
    'Get All': emptyProps(),
    'Get All Success': props<{ payload: ReadonlyArray<FactCategory> }>(),
    'Category Selected': props<{ payload: Readonly<FactCategory> }>(),
    'Catetory Selected Success': props<{ payload: FactCategory }>()
  }
})