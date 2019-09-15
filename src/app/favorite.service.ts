import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
const STORAGE_KEY = 'favoriteStations';
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private storage: Storage) { }

  getAllFavoriteStations() {
    return this.storage.get(STORAGE_KEY);
  }

  isFavorite(station) {
    return this.getAllFavoriteStations().then((res) => {
      if (res) {

        let i = 0;
        res.forEach(st => {
          if (st.id === station.id) {
            i += 1;
          }
        });
        console.log(i);
        return (i > 0);
      }
    });

  }

  favoriteStation(station) {
    return this.getAllFavoriteStations().then((res) => {
      if (res) {
        let i = 0;
        res.forEach(st => {
          if (st.id === station.id) {
            i += 1;
          }

        });
        if (i === 0) {
          res.push(station);
        }
        return this.storage.set(STORAGE_KEY, res);
      } else {
        return this.storage.set(STORAGE_KEY, [station]);
      }
    });
  }

  unfavoriteStation(stationId) {
    return this.getAllFavoriteStations().then(result => {
      if (result) {
        result.splice(result.indexOf(stationId), 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }
}

