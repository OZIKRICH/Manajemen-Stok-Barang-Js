const readlineSync = require("readline-sync");

class StockManage {
    constructor(){
        this.DaftarBarang=[];
    }

    tampilkanBarang(daftar){
        daftar.forEach((b) => {
            total = b.stok * b.harga;
            console.log(`${b.id}. ${b.nama.padEnd(20)} Stok: ${b.stok} Harga: ${b.harga} Total Nilai: ${total}`);
        });
    }

    tambahBarang(daftar, nama, stok, harga) {
        let newId = this.DaftarBarang.length + 1;
        daftar.push({id: newId, nama, stok: Number(stok), harga: Number(harga)});
        return daftar;
    }

    barangMasuk(daftar, id, jumlah){
        const barang = daftar.find((item) => item.id === id);

        if (barang){
            barang.stok += jumlah;
            console.log(`Berhasil menambahkan stok ${barang.nama}. Stok sekarang: ${barang.stok}`);
        } else{
            console.log(`Barang dengan ID ${id} tidak ditemukan.`);
        }
    }

    barangKeuar(daftar, id, jumlah){
        const barang = daftar.find((item) => item.id === id)

        if (barang){
            barang.stok -= jumlah;
            console.log(`Berhasil mengurangi stok ${barang.nama}. Stok sekarang: ${barang.stok}`);
        } else if (jumlah > barang.stok){
            console.log(`Barang yang keluar lebih dari stok. Stok sekarang: ${barang.stok}`);
        } else {
            console.log(`Barang dengan ID ${id} tidak ditemukan.`);
        }
    }


    hapusBarang(daftar, id){
        return daftar.filter((item) => item.id !== id);
    }

}

// const DaftarBarang = [
//     {id: 1, nama: "Pulpen", stok: 50, harga: 2500},
//     {id: 2, nama: "Buku Tulis", stok: 30, harga: 5000},
//     {id: 3, nama: "Pensil", stok: 20, harga: 2000},
//     {id: 4, nama: "Buku Gambar", stok: 25, harga: 7000},
//     {id: 5, nama: "Penghapus", stok: 10, harga: 3000}
// ];

console.log(`%c${"=== Manajemen Stok Barang ==="}`);