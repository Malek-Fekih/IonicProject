import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-stations',
  templateUrl: './stations.page.html',
  styleUrls: ['./stations.page.scss'],
})
export class StationsPage implements OnInit {
  stations: any;
  country = '';
  constructor(private activateRoute: ActivatedRoute, private api: ApiService, private storage: Storage, public loadingController: LoadingController) { }

  ngOnInit() {
    this.storage.get('country').then((res) => {
      this.country = res;
      this.api.getStations(res).subscribe(val => this.stations = val);

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

  getStationDetails(station): void {
    this.storage.set('station', station.id);
    this.ngOnInit();
  }


}
