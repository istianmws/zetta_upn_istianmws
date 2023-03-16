const readlineSync = require('readline-sync');
function hitungHargaBuku(detailBuku, persenDiskon, persenPajak, jumlahBeli, jumlahKredit) {
    const HARGA_PPN = persenPajak; // konstan 11% pajak PPN
    let jumlahDiskon, hargaSetelahDiskon, jumlahPajak, hargaSetelahPajak;
    let statusDiskon = false;
    


    // Hitung jumlah diskon dan harga setelah diskon
    if(detailBuku.harga > 100000){
      statusDiskon = true;
      persenDiskon = parseInt(readlineSync.question("Masukkan persen Diskon\t: "));
      jumlahDiskon = detailBuku.harga * (persenDiskon / 100);
      hargaSetelahDiskon = (detailBuku.harga - jumlahDiskon) * jumlahBeli;
    }else{
      console.log("'!Maaf tidak ada diskon'\n 'Harga buku dibawah Rp 100.000'");
      statusDiskon = false;
      persenDiskon = 0;
      jumlahDiskon = detailBuku.harga * (persenDiskon / 100);
      hargaSetelahDiskon = (detailBuku.harga - jumlahDiskon) * jumlahBeli;
    };
    
    // Hitung jumlah pajak dan harga setelah pajak
    jumlahPajak = hargaSetelahDiskon * (HARGA_PPN / 100);
    hargaSetelahPajak = (hargaSetelahDiskon + jumlahPajak);
    let totalKredit = 0;
    let hargaKredit = hargaSetelahPajak / jumlahKredit;
    let cicilan =[];
    for(let i = 1; i <= jumlahKredit; i++){
      cicilan.push('Pembayaran setelah'+ i +'bulan = Rp'+totalKredit+'\n\t');
      totalKredit =totalKredit+ hargaKredit;
    }

    // Cek apakah stok cukup
    while(detailBuku.stok >= jumlahBeli){
        detailBuku.stok -= jumlahBeli;
        console.log("\t[Transaksi berhasil]");
        console.log("\t=Stok tersisa: " + detailBuku.stok + " buku");
        console.log("-------------------------------------");
        // Tampilkan hasil perhitungan
        console.log(
          `>>>>>>Detail buku:
          Judul       : ${detailBuku.judul}
          Pengarang   : ${detailBuku.pengarang}
          Harga satuan: Rp ${detailBuku.harga}
          Diskon      : ${persenDiskon} %
          Qty         : ${jumlahBeli} buku
          --------------------------------
          Total harga : Rp ${detailBuku.harga * jumlahBeli}
          Total diskon: Rp ${jumlahDiskon * jumlahBeli}
          Harga Diskon: Rp ${hargaSetelahDiskon}
          --------------------------------
          Jumlah pajak: Rp ${jumlahPajak}
          Harga Pajak : Rp ${hargaSetelahPajak}
          ================================
          
          Beli dengan cicilan :
          ${cicilan}
          Stok Buku    : ${detailBuku.stok}
          Beli buku lagi ? (y/n)`
        );
          let answer = readlineSync.question("\tMasukkan pilihan: ");
          if(answer == "y"){
            jumlahBeli = parseInt(readlineSync.question("Jumlah buku yang dibeli\t: "));
            if(jumlahBeli > detailBuku.stok){
              console.log("\tMaaf stok buku tidak cukup");
              console.log("\t---------------------------");
              return;
            }else{
              hitungHargaBuku(detailBuku, persenDiskon, persenPajak, jumlahBeli);
            }
          }else{
            console.log("\tTerima kasih telah berbelanja");
            console.log("\t---------------------------");
            return;
          }
        }
    }

  const buku = {
    judul: "",
    pengarang: "",
    harga: 0,
    stok: 10,
  };

  buku.judul =      readlineSync.question("Masukkan judul buku\t: ");
  buku.pengarang =  readlineSync.question("Masukkan nama pengarang\t: ");
  buku.harga = parseInt(readlineSync.question("Masukkan harga buku\t: "));
  jumlahBeli = parseInt(readlineSync.question("Jumlah buku yang dibeli\t: "));
  jumlahKredit = parseInt(readlineSync.question("Jumlah cicilan\t\t: "));
  
  hitungHargaBuku(buku, 0, 11, jumlahBeli, jumlahKredit);