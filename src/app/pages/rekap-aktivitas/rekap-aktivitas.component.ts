import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rekap-aktivitas',
  templateUrl: './rekap-aktivitas.component.html',
  styleUrls: ['./rekap-aktivitas.component.scss'],
  standalone: false,
})
export class RekapAktivitasComponent implements OnInit {
  aktivitasList: any[] = [];
  filteredList: any[] = [];

  filterTanggal: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAktivitas();
  }

  getAktivitas(): void {
    this.http.get<any[]>('https://api.example.com/aktivitas') // ganti dengan API-mu
      .subscribe(data => {
        this.aktivitasList = data;
        this.filteredList = data;
      });
  }

  filterByTanggal(): void {
    if (this.filterTanggal) {
      const filterDate = new Date(this.filterTanggal).toDateString();
      this.filteredList = this.aktivitasList.filter(log =>
        new Date(log.waktu).toDateString() === filterDate
      );
    } else {
      this.filteredList = this.aktivitasList;
    }
  }
}
