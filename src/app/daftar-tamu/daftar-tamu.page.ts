import { Component, OnInit } from '@angular/core';

interface Guest {
  name: string;
  visitDate: string;
  visitedTo: string;    // Rumah yang dikunjungi
  isOwnHouse: boolean;  // true jika kunjungan ke rumah sendiri
}

@Component({
  selector: 'app-daftar-tamu',
  templateUrl: './daftar-tamu.page.html',
  styleUrls: ['./daftar-tamu.page.scss'],
  standalone: false
})
export class DaftarTamuPage implements OnInit {
  // Data dummy tamu
  allGuests: Guest[] = [
    { name: 'Jamaludin', visitDate: '2025-06-13', visitedTo: 'Rumah Pak Budi (A1)', isOwnHouse: false },
    { name: 'Siti Aminah', visitDate: '2025-06-14', visitedTo: 'Rumah Sendiri (A2)', isOwnHouse: true },
    { name: 'Andi Wijaya', visitDate: '2025-06-12', visitedTo: 'Rumah Pak Joko (A3)', isOwnHouse: false },
    { name: 'Rina Susanti', visitDate: '2025-06-11', visitedTo: 'Rumah Sendiri (A4)', isOwnHouse: true }
  ];
  filteredGuests: Guest[] = [];
  searchTerm: string = '';
  sortOption: string = 'name';

  constructor() { }

  ngOnInit() {
    // Inisialisasi filteredGuests dengan data dummy
    this.filteredGuests = [...this.allGuests];
    this.sortGuests();
  }

  filterGuests() {
    const term = this.searchTerm.toLowerCase();
    this.filteredGuests = this.allGuests
      .filter(g => g.name.toLowerCase().includes(term));
    this.sortGuests();
  }

  sortGuests() {
    if (this.sortOption === 'name') {
      this.filteredGuests.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.filteredGuests.sort(
        (a, b) => new Date(a.visitDate).getTime() - new Date(b.visitDate).getTime()
      );
    }
  }
}
