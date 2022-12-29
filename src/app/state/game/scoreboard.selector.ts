import { createFeatureSelector } from "@ngrx/store";
import { Game } from "./game.model";

export const selectScore = createFeatureSelector<Readonly<Game>>('game');