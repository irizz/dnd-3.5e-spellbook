export interface CharClass {
  id: string;
  name: string;
  level?: string;
}

export interface CharClassesResponse {
  classesList: CharClass[];
}

export interface ErrorToDisplay {
  statusText?: string;
  message?: string;
}

export interface Spell {
  id: string;
  name: string;
  school: string;
  components?: string;
  castingTime?: string;
  range?: string;
  area?: string;
  target?: string;
  effect?: string;
  duration?: string;
  savingThrow?: string;
  spellResistance?: string;
  materialComponents?: string;
  description: string;
  classes: SpellCharClass[];
  isFavorite?: boolean;
}

export type SortedSpells = { [key: string]: Array<string> };

export interface SpellCharClass {
  name: string;
  level: string;
}

export interface SpellsResponse {
  spellsList: Spell[];
}