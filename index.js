const DaftarBarang = [
    {id: 1, nama: "Pulpen", stok: 50, harga: 2500},
    {id: 2, nama: "Buku Tulis", stok: 30, harga: 5000}
];

console.log(`%c${"=== Manajemen Stok Barang ==="}`);

DaftarBarang.forEach((b) => {
    console.log(`${b.id}. ${b.nama.padEnd(20)} Stok: ${b.stok} Harga: ${b.harga}`);
});