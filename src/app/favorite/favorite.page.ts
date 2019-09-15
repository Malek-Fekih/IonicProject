import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { FavoriteService } from '../favorite.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  constructor(
    private favoriteService: FavoriteService,
    private storage: Storage,
    public loadingController: LoadingController) { }
  stations: any;
  ngOnInit() {
    this.loader(3000).then(() => {
      this.favoriteService.getAllFavoriteStations().then((res) => {
        this.stations = res;
        console.log(this.stations);
      });
    }).then(() => { this.loadingController.dismiss(); });

  }
  getStationID(station) {
    this.storage.set('stationID', station.id);

  }
  async loader(secs) {
    const loading = await this.loadingController.create({
      message: 'Please Wait ...',
      duration: secs,
      spinner: 'circles'
    });
    await loading.present();
  }
}
