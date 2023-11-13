import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TUser } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users: TUser[] = []
    ;
    return {users};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(users: TUser[]): number {
    return users.length > 0 ? Math.max(...users.map(hero => hero.id)) + 1 : 11;
  }
}
