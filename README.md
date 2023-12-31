<h2 align="center">Backend Repository <br> Platform Penyewaan Barang</h2>
<h3>TEAM ID       :  C523-PS029</h3>
<h3>TEMA			    : Teknologi dalam Berbagai Aspek Kehidupan </h3>
<h3>NAMA ADVISOR	: Buchori Rafsanjani </h3>
<h3>LIST ANGGOTA	: </h3>
<ol>
  <li>S182XB441 – Astriditiya Laila Nur Fadilah - Aktif</li>
  <li>F498YB197 – Abdul Rizki Maghribi - Aktif</li>
  <li>F265YB190 – Dimas Fauzan - Aktif</li>
  <li>F193YB217 – Muhammad Dariaz Zidane - Aktif</li>
  <li>F156YB169 – Rama Fajar Fadhillah - Aktif</li>
</ol>
<h3>Nama Project : Ezrent</h3>
<h3>LINK BACKEND : <a href="https://api.ezrent.my.id/">api.ezrent.my.id</a> </h3>
<h2 align="left">Apa itu ezrent ?</h2>
<p align="justify">Ezrent adalah platform penyewaan barang berbasis website yang dapat digunakan untuk transaksi penyewaan barang. Pengguna dapat menyewa barang dengan rentang hari tertentu. Barang yang terdapat pun beragam, terdapat barang elektronik, properti, dan lainnya. Selain menyewa barang, pengguna pun dapat menyewakan barang yang ia miliki dengan cara membuka toko.</p>
<h2 align="left">Tech Stack</h2>

|      Nama             |             Link                            | 
| --------------------- |:-------------------------------------------:| 
| Typescript            | https://www.typescriptlang.org              | 
| Mysql                 | https://www.mysql.com                       |  
| Docker                | https://www.docker.com                      |  
| Prisma ORM            | https://www.prisma.io                       |  
| Passport              | https://www.passportjs.org/                 |  
|JWT (Json Web Token)   | https://jwt.io                              |    
| Prisma ORM            | https://www.prisma.io                       |  
| Nginx                 | https://www.nginx.com/                      | 
| Lets Enscrypt         | https://letsencrypt.org/                    | 
| Nest JS Open API      |https://docs.nestjs.com/openapi/introduction | 
<h2 align="left">Development</h2>
<p align="left">
  Clone Repository ini<br> 
    
    $ git clone https://github.com/nullsec45/Back-end-Capstone
</p>
<p align="left">
  Install dependencies : <br> 
    
    $ npm install
</p>

<p align="left">
  Ubah .env.example menjadi .env : <br> 
    
    $ mv .env.example .env
</p>
<p align="left">
  Ubah isi .env sesuai environment anda *sebagai contoh: 
  <br>
    
    # DATABASE
    DATABASE_URL="mysql://root@localhost:3306/ezrent"
    
    # JWT
    JWT_SECRET="secret_jwt_ezrent"
</p>
<p align="left">
  Jalankan Migrate Database : <br> 
    
    $ npx prisma generate dev
</p>
<p align="left">
  Jalankan Program Ke Mode Development : <br> 
    
    $ npm run start:dev
</p>
