function hitungHargaBuku(detailBuku, persenDiskon, persenPajak) {
    const HARGA_PPN = 0.11; // konstan 11% pajak PPN
    let jumlahDiskon, hargaSetelahDiskon, jumlahPajak, hargaSetelahPajak;
    let statusDiskon = false;

    // Hitung jumlah diskon dan harga setelah diskon
    if(buku.harga > 100000){
      statusDiskon = true;
      persenDiskon = parseInt(readlineSync.question("Masukkan persentase Diskon: "));
      jumlahDiskon = detailBuku.harga * (persenDiskon / 100);
      hargaSetelahDiskon = detailBuku.harga - jumlahDiskon;
    }else{
      statusDiskon = false;
      persenDiskon = 0;
      jumlahDiskon = detailBuku.harga * (persenDiskon / 100);
      hargaSetelahDiskon = detailBuku.harga - jumlahDiskon;
    }
    
  
    // Hitung jumlah pajak dan harga setelah pajak
    jumlahPajak = hargaSetelahDiskon * (persenPajak / 100);
    hargaSetelahPajak = hargaSetelahDiskon + jumlahPajak + (hargaSetelahDiskon * HARGA_PPN);
  
    // Tampilkan hasil perhitungan
    console.log(`Detail buku:
    Judul: ${detailBuku.judul}
    Pengarang: ${detailBuku.pengarang}
    Harga: ${detailBuku.harga}
    
    Jumlah diskon: ${jumlahDiskon}
    Harga setelah diskon: ${hargaSetelahDiskon}
    
    Jumlah pajak: ${jumlahPajak}
    Harga setelah pajak: ${hargaSetelahPajak}`);
  }

  const buku = {
    judul: "Belajar JavaScript",
    pengarang: "John Doe",
    harga: 100000,
  };

  const readlineSync = require('readline-sync');
  buku.judul = readlineSync.question("Masukkan judul buku: ");
  buku.pengarang = readlineSync.question("Masukkan nama pengarang: ");
  buku.harga = parseInt(readlineSync.question("Masukkan harga buku: "));
  
  hitungHargaBuku(buku, 0, 10);
  