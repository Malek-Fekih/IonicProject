import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
})
export class CountriesPage implements OnInit {
  countries: Observable<any>;
  constructor(private myRouter: Router, private myNav: NavController,
    private api: ApiService, private storage: Storage,
    public loadingController: LoadingController, ) { }

  ngOnInit() {
    this.loader(1000).then(() => {
      this.api.getCountries().subscribe(res => this.countries = res);
    });

  }

  getCountryName(country): void {
    this.storage.set('country', country.name);
    this.ngOnInit();
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
