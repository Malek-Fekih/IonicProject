import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { FavoriteService } from '../favorite.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.page.html',
  styleUrls: ['./station-details.page.scss'],
})
export class StationDetailsPage implements OnInit {
  station: any = {
    name: '',
    id: '',
    country: '',
    homepage: '',
    favicon: '',

  };
  isFavorite = false;
  constructor(private api: ApiService, private storage: Storage,
    private favoriteService: FavoriteService,
    public loadingController: LoadingController) {

  }

  ngOnInit() {
    /*this.station = this.storage.get('station').then((res) => {
      this.api.getStation(res).subscribe(val => this.station = val);
    });*/

    this.loader(2000).then(() => {
      this.storage.get('stationID').then((id) => {
        this.api.getStationById(id).subscribe((res) => {
          this.station = res[0];
          this.favoriteService.isFavorite(this.station).then((fav) => {
            this.isFavorite = fav;
          });
        });

      });
    });
  }
  async loader(secs) {
    const loading = await this.loadingController.create({
      message: 'Please Wait ...',
      duration: secs,
      spinner: 'circles'
    });
    await loading.present();
  }

  favoriteStation() {
    this.favoriteService.favoriteStation(this.station).then((res) => {
      this.isFavorite = true;
      this.ngOnInit();
    });
  }

  unfavourite() {
    this.favoriteService.unfavoriteStation(this.station).then(() => {
      this.isFavorite = false;
      this.ngOnInit();
    });
  }

}

