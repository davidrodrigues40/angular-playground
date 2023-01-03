import { createFeatureSelector } from "@ngrx/store";

export const submitLogin = createFeatureSelector<Readonly<{ username: string, password: string }>>('login');