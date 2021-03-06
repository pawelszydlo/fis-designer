import {Injectable} from '@angular/core';
import {assertIsCompoundState, CompoundState} from '../io-toolbar/serialization-utils';

const STORAGE_KEY = 'savedConfigs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  /** Saves compound state to local storage under specified name. */
  saveState(name: string, state: CompoundState) {
    const stored = this.getWholeStorage();
    stored.set(name, JSON.stringify(state));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(stored.entries())));
  }

  /** Loads compound state with specified name from local storage. */
  loadState(name: string): CompoundState {
    const stored = this.getWholeStorage();
    if (!stored.has(name)) {
      throw new Error(`Key ${name} doesn't exist in the storage.`);
    }
    return assertIsCompoundState(JSON.parse(stored.get(name)!));
  }

  /** Gets a list of stored config names. */
  getSavedNames(): string[] {
    const stored = this.getWholeStorage();
    return Array.from(stored.keys());
  }

  /** Loads whole app local storage dict or creates a new one. */
  getWholeStorage(): Map<string, string> {
    const storage = localStorage.getItem(STORAGE_KEY);
    if (storage) {
      try {
        return new Map<string, string>(JSON.parse(storage));
      } catch (e) {
        console.error(`Error loading from local storage. Resetting store. (${e})`);
        localStorage.clear();
      }
    }
    return new Map<string, string>();
  }
}
