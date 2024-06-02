require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // Ganti dengan username PostgreSQL Anda
  host: 'localhost',
  database: 'GoodReadingBookstore', // Ganti dengan nama database Anda
  password: process.env.password, // Ganti dengan password untuk database
  port: 5432, // Port default PostgreSQL
});

const books = [
    {
        title: 'The Great Gatsby',
        publisher_name: 'Scribner',
        publisher_founded_year: 1846,
        publisher_city: 'New York',
        publisher_country: 'United States',
        language: 'English',
        price_in_rupiah: 150000,
        isbn: '9780743273565',
        pages: 180,
        weight_in_grams: 200,
        synopsis: 'The Great Gatsby, F. Scott Fitzgerald’s third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The story is of the fabulously wealthy Jay Gatsby and his new love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted “gin was the national drink',
        author_first_name: 'F. Scott',
        author_last_name: 'Fitzgerald',
        author_date_of_birth: '1896-09-24',
        category: 'Fiction'
    },
    {
        title: 'Laskar Pelangi',
        publisher_name: 'Bentang Pustaka',
        publisher_founded_year: 2005,
        publisher_city: 'Yogyakarta',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 120000,
        isbn: '9789793062799',
        pages: 529,
        weight_in_grams: 600,
        synopsis: 'Laskar Pelangi adalah novel yang menceritakan kehidupan 10 anak di Belitung yang berjuang untuk meraih mimpi-mimpi mereka di tengah keterbatasan.',
        author_first_name: 'Andrea',
        author_last_name: 'Hirata',
        author_date_of_birth: '1967-10-24',
        category: 'Fiction'
    },
    {
        title: 'Harry Potter and the Sorcerer\'s Stone',
        publisher_name: 'Bloomsbury',
        publisher_founded_year: 1986,
        publisher_city: 'London',
        publisher_country: 'United Kingdom',
        language: 'English',
        price_in_rupiah: 200000,
        isbn: '9780747532699',
        pages: 223,
        weight_in_grams: 320,
        synopsis: 'Harry Potter, an eleven-year-old orphan, discovers that he is a wizard and is invited to study at Hogwarts. Even as he escapes a dreary life and enters a world of magic, he finds trouble awaiting him.',
        author_first_name: 'J.K.',
        author_last_name: 'Rowling',
        author_date_of_birth: '1965-07-31',
        category: 'Fantasy'
    },
    {
        title: 'Bumi Manusia',
        publisher_name: 'Hasta Mitra',
        publisher_founded_year: 1980,
        publisher_city: 'Jakarta',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 110000,
        isbn: '9789799731248',
        pages: 535,
        weight_in_grams: 650,
        synopsis: 'Bumi Manusia adalah novel pertama dari tetralogi Buru karya Pramoedya Ananta Toer yang menggambarkan kehidupan Indonesia pada masa kolonialisme Belanda.',
        author_first_name: 'Pramoedya',
        author_last_name: 'Ananta Toer',
        author_date_of_birth: '1925-02-06',
        category: 'Historical Fiction'
    },
    {
        title: 'To Kill a Mockingbird',
        publisher_name: 'J.B. Lippincott & Co.',
        publisher_founded_year: 1836,
        publisher_city: 'Philadelphia',
        publisher_country: 'United States',
        language: 'English',
        price_in_rupiah: 180000,
        isbn: '9780061120084',
        pages: 281,
        weight_in_grams: 400,
        synopsis: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960.',
        author_first_name: 'Harper',
        author_last_name: 'Lee',
        author_date_of_birth: '1926-04-28',
        category: 'Fiction'
    },
    {
        title: '5 Cm',
        publisher_name: 'Grasindo',
        publisher_founded_year: 1994,
        publisher_city: 'Jakarta',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 95000,
        isbn: '9789790251723',
        pages: 362,
        weight_in_grams: 450,
        synopsis: '5 Cm adalah kisah tentang lima sahabat yang memutuskan untuk mendaki Gunung Semeru sebagai simbol perjalanan mereka dalam meraih mimpi-mimpi yang tersimpan 5 cm di depan kening.',
        author_first_name: 'Donny',
        author_last_name: 'Dhirgantoro',
        author_date_of_birth: '1978-10-10',
        category: 'Adventure'
    },
    {
        title: 'The Catcher in the Rye',
        publisher_name: 'Little, Brown and Company',
        publisher_founded_year: 1837,
        publisher_city: 'Boston',
        publisher_country: 'United States',
        language: 'English',
        price_in_rupiah: 140000,
        isbn: '9780316769488',
        pages: 214,
        weight_in_grams: 300,
        synopsis: 'The novel\'s protagonist Holden Caulfield has become an icon for teenage rebellion. The novel also deals with complex issues of innocence, identity, belonging, loss, connection, and sex.',
        author_first_name: 'J.D.',
        author_last_name: 'Salinger',
        author_date_of_birth: '1919-01-01',
        category: 'Fiction'
    },
    {
        title: 'Sapiens: A Brief History of Humankind',
        publisher_name: 'Harper',
        publisher_founded_year: 1817,
        publisher_city: 'New York',
        publisher_country: 'United States',
        language: 'English',
        price_in_rupiah: 250000,
        isbn: '9780062316094',
        pages: 443,
        weight_in_grams: 500,
        synopsis: 'Sapiens spans the whole of human history, from the very first humans to walk the earth to the radical breakthroughs of the Cognitive, Agricultural and Scientific Revolutions.',
        author_first_name: 'Yuval Noah',
        author_last_name: 'Harari',
        author_date_of_birth: '1976-02-24',
        category: 'Non-Fiction'
    },
    {
        title: 'Dilan: Dia adalah Dilanku Tahun 1990',
        publisher_name: 'Pastel Books',
        publisher_founded_year: 2014,
        publisher_city: 'Bandung',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 89000,
        isbn: '9786027870402',
        pages: 332,
        weight_in_grams: 400,
        synopsis: 'Dilan 1990 adalah novel yang menceritakan kisah cinta remaja antara Milea dan Dilan di tahun 1990-an di Bandung.',
        author_first_name: 'Pidi',
        author_last_name: 'Baiq',
        author_date_of_birth: '1972-12-08',
        category: 'Romance'
    },
    {
        title: 'Animal Farm',
        publisher_name: 'Secker & Warburg',
        publisher_founded_year: 1935,
        publisher_city: 'London',
        publisher_country: 'United Kingdom',
        language: 'English',
        price_in_rupiah: 130000,
        isbn: '9780451526342',
        pages: 112,
        weight_in_grams: 150,
        synopsis: 'Animal Farm is an allegorical novella by George Orwell, first published in England in 1945. The book tells the story of a group of farm animals who rebel against their human farmer, hoping to create a society where the animals can be equal, free, and happy.',
        author_first_name: 'George',
        author_last_name: 'Orwell',
        author_date_of_birth: '1903-06-25',
        category: 'Political Fiction'
    },
    {
        title: 'Negeri 5 Menara',
        publisher_name: 'Gramedia Pustaka Utama',
        publisher_founded_year: 1974,
        publisher_city: 'Jakarta',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 115000,
        isbn: '9789792231754',
        pages: 416,
        weight_in_grams: 500,
        synopsis: 'Negeri 5 Menara adalah novel karya Ahmad Fuadi yang menceritakan kisah enam santri di Pondok Madani yang berjuang meraih mimpi-mimpi besar mereka.',
        author_first_name: 'Ahmad',
        author_last_name: 'Fuadi',
        author_date_of_birth: '1972-12-30',
        category: 'Fiction'
    },
    {
        title: 'Eleanor & Park',
        publisher_name: 'St. Martin\'s Press',
        publisher_founded_year: 1952,
        publisher_city: 'New York',
        publisher_country: 'United States',
        language: 'English',
        price_in_rupiah: 175000,
        isbn: '9781250012579',
        pages: 336,
        weight_in_grams: 400,
        synopsis: 'Eleanor & Park is a story about two star-crossed misfits—smart enough to know that first love almost never lasts, but brave and desperate enough to try.',
        author_first_name: 'Rainbow',
        author_last_name: 'Rowell',
        author_date_of_birth: '1973-02-24',
        category: 'Young Adult'
    },
    {
        title: 'Supernova: Ksatria, Puteri, dan Bintang Jatuh',
        publisher_name: 'KPG (Kepustakaan Populer Gramedia)',
        publisher_founded_year: 1999,
        publisher_city: 'Jakarta',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 135000,
        isbn: '9789799023765',
        pages: 248,
        weight_in_grams: 300,
        synopsis: 'Supernova adalah novel pertama karya Dee Lestari yang memadukan fiksi ilmiah, roman, dan filsafat dalam satu alur cerita yang kompleks dan menarik.',
        author_first_name: 'Dee',
        author_last_name: 'Lestari',
        author_date_of_birth: '1976-01-20',
        category: 'Science Fiction'
    },
    {
        title: 'The Hobbit',
        publisher_name: 'George Allen & Unwin',
        publisher_founded_year: 1911,
        publisher_city: 'London',
        publisher_country: 'United Kingdom',
        language: 'English',
        price_in_rupiah: 220000,
        isbn: '9780547928227',
        pages: 310,
        weight_in_grams: 400,
        synopsis: 'The Hobbit is a fantasy novel and children\'s book by J.R.R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.',
        author_first_name: 'J.R.R.',
        author_last_name: 'Tolkien',
        author_date_of_birth: '1892-01-03',
        category: 'Fantasy'
    },
    {
        title: 'Ayat-Ayat Cinta',
        publisher_name: 'Republika Penerbit',
        publisher_founded_year: 1993,
        publisher_city: 'Jakarta',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 95000,
        isbn: '9789793210024',
        pages: 419,
        weight_in_grams: 450,
        synopsis: 'Ayat-Ayat Cinta adalah novel karya Habiburrahman El Shirazy yang mengisahkan kehidupan seorang mahasiswa Indonesia di Mesir yang menghadapi berbagai cobaan dalam hidup dan cintanya.',
        author_first_name: 'Habiburrahman',
        author_last_name: 'El Shirazy',
        author_date_of_birth: '1976-09-30',
        category: 'Romance'
    },
    {
        title: 'The Hunger Games',
        publisher_name: 'Scholastic Press',
        publisher_founded_year: 1920,
        publisher_city: 'New York',
        publisher_country: 'United States',
        language: 'English',
        price_in_rupiah: 180000,
        isbn: '9780439023481',
        pages: 374,
        weight_in_grams: 500,
        synopsis: 'The Hunger Games is a dystopian novel by the American writer Suzanne Collins. It is written in the voice of 16-year-old Katniss Everdeen, who lives in the future, post-apocalyptic nation of Panem in North America.',
        author_first_name: 'Suzanne',
        author_last_name: 'Collins',
        author_date_of_birth: '1962-08-10',
        category: 'Dystopian'
    },
    {
        title: 'Pulang',
        publisher_name: 'Gramedia Pustaka Utama',
        publisher_founded_year: 1974,
        publisher_city: 'Jakarta',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 120000,
        isbn: '9786020306700',
        pages: 464,
        weight_in_grams: 550,
        synopsis: 'Pulang adalah novel karya Leila S. Chudori yang mengisahkan kehidupan para eksil Indonesia yang terdampar di Paris pasca peristiwa 1965.',
        author_first_name: 'Leila',
        author_last_name: 'S. Chudori',
        author_date_of_birth: '1962-12-12',
        category: 'Historical Fiction'
    },
    {
        title: '1984',
        publisher_name: 'Secker & Warburg',
        publisher_founded_year: 1935,
        publisher_city: 'London',
        publisher_country: 'United Kingdom',
        language: 'English',
        price_in_rupiah: 160000,
        isbn: '9780451524935',
        pages: 328,
        weight_in_grams: 350,
        synopsis: '1984, published in 1949, is a dystopian novel set in a totalitarian society ruled by "Big Brother". It is a profound anti-utopian novel that examines the dangers of totalitarian rule and propaganda.',
        author_first_name: 'George',
        author_last_name: 'Orwell',
        author_date_of_birth: '1903-06-25',
        category: 'Dystopian'
    },
    {
        title: 'Ketika Cinta Bertasbih',
        publisher_name: 'Republika Penerbit',
        publisher_founded_year: 1993,
        publisher_city: 'Jakarta',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 98000,
        isbn: '9789793210031',
        pages: 502,
        weight_in_grams: 600,
        synopsis: 'Ketika Cinta Bertasbih adalah novel karya Habiburrahman El Shirazy yang mengisahkan perjuangan seorang mahasiswa Indonesia di Mesir dalam menempuh pendidikan dan mencari cinta sejatinya.',
        author_first_name: 'Habiburrahman',
        author_last_name: 'El Shirazy',
        author_date_of_birth: '1976-09-30',
        category: 'Romance'
    },
    {
        title: 'The Fault in Our Stars',
        publisher_name: 'Dutton Books',
        publisher_founded_year: 1852,
        publisher_city: 'New York',
        publisher_country: 'United States',
        language: 'English',
        price_in_rupiah: 175000,
        isbn: '9780525478812',
        pages: 313,
        weight_in_grams: 400,
        synopsis: 'The Fault in Our Stars is a love story about two teenagers who meet at a cancer support group and fall in love, despite facing terminal illness and the challenges that come with it.',
        author_first_name: 'John',
        author_last_name: 'Green',
        author_date_of_birth: '1977-08-24',
        category: 'Young Adult'
    },
    {
        title: 'Totto-chan: The Little Girl at the Window',
        publisher_name: 'Kodansha',
        publisher_founded_year: 1909,
        publisher_city: 'Tokyo',
        publisher_country: 'Japan',
        language: 'English',
        price_in_rupiah: 125000,
        isbn: '9784770020673',
        pages: 232,
        weight_in_grams: 300,
        synopsis: 'Totto-chan is a memoir by Tetsuko Kuroyanagi about her unconventional education at Tomoe Gakuen, a Tokyo school founded by educator Sosaku Kobayashi.',
        author_first_name: 'Tetsuko',
        author_last_name: 'Kuroyanagi',
        author_date_of_birth: '1933-08-09',
        category: 'Memoir'
    },
    {
        title: 'Perahu Kertas',
        publisher_name: 'Bentang Pustaka',
        publisher_founded_year: 2005,
        publisher_city: 'Yogyakarta',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 95000,
        isbn: '9789791227048',
        pages: 444,
        weight_in_grams: 550,
        synopsis: 'Perahu Kertas adalah novel karya Dee Lestari yang menceritakan perjalanan cinta dan mimpi dua tokoh utama, Kugy dan Keenan, yang berbeda latar belakang dan karakter.',
        author_first_name: 'Dee',
        author_last_name: 'Lestari',
        author_date_of_birth: '1976-01-20',
        category: 'Romance'
    },
    {
        title: 'The Alchemist',
        publisher_name: 'HarperOne',
        publisher_founded_year: 1817,
        publisher_city: 'New York',
        publisher_country: 'United States',
        language: 'English',
        price_in_rupiah: 145000,
        isbn: '9780062315004',
        pages: 208,
        weight_in_grams: 250,
        synopsis: 'The Alchemist follows the journey of an Andalusian shepherd boy named Santiago who dreams of finding a worldly treasure located in the Egyptian pyramids.',
        author_first_name: 'Paulo',
        author_last_name: 'Coelho',
        author_date_of_birth: '1947-08-24',
        category: 'Fiction'
    },
    {
        title: 'Orang-Orang Biasa',
        publisher_name: 'Gramedia Pustaka Utama',
        publisher_founded_year: 1974,
        publisher_city: 'Jakarta',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 110000,
        isbn: '9786020639624',
        pages: 264,
        weight_in_grams: 300,
        synopsis: 'Orang-Orang Biasa adalah novel karya Andrea Hirata yang menceritakan kehidupan masyarakat kecil di sebuah kota di Belitung dengan segala masalah dan kegembiraannya.',
        author_first_name: 'Andrea',
        author_last_name: 'Hirata',
        author_date_of_birth: '1967-10-24',
        category: 'Fiction'
    },
    {
        title: 'Brave New World',
        publisher_name: 'Chatto & Windus',
        publisher_founded_year: 1855,
        publisher_city: 'London',
        publisher_country: 'United Kingdom',
        language: 'English',
        price_in_rupiah: 170000,
        isbn: '9780060850527',
        pages: 268,
        weight_in_grams: 300,
        synopsis: 'Brave New World is a dystopian social science fiction novel and a cautionary tale, written by Aldous Huxley and published in 1932.',
        author_first_name: 'Aldous',
        author_last_name: 'Huxley',
        author_date_of_birth: '1894-07-26',
        category: 'Dystopian'
    },
    {
        title: 'Laut Bercerita',
        publisher_name: 'KPG (Kepustakaan Populer Gramedia)',
        publisher_founded_year: 1999,
        publisher_city: 'Jakarta',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 125000,
        isbn: '9786024246941',
        pages: 379,
        weight_in_grams: 450,
        synopsis: 'Laut Bercerita adalah novel karya Leila S. Chudori yang mengisahkan kehidupan seorang aktivis mahasiswa di masa Orde Baru yang mencari keadilan untuk teman-temannya yang hilang.',
        author_first_name: 'Leila',
        author_last_name: 'S. Chudori',
        author_date_of_birth: '1962-12-12',
        category: 'Historical Fiction'
    },
    {
        title: 'One Hundred Years of Solitude',
        publisher_name: 'Harper & Row',
        publisher_founded_year: 1817,
        publisher_city: 'New York',
        publisher_country: 'United States',
        language: 'English',
        price_in_rupiah: 185000,
        isbn: '9780060883287',
        pages: 417,
        weight_in_grams: 500,
        synopsis: 'One Hundred Years of Solitude is a landmark 1967 novel by Colombian author Gabriel García Márquez that tells the multi-generational story of the Buendía family.',
        author_first_name: 'Gabriel',
        author_last_name: 'García Márquez',
        author_date_of_birth: '1927-03-06',
        category: 'Magical Realism'
    },
    {
        title: 'Dilan: Dia adalah Dilanku Tahun 1991',
        publisher_name: 'Pastel Books',
        publisher_founded_year: 2014,
        publisher_city: 'Bandung',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 92000,
        isbn: '9786027870501',
        pages: 344,
        weight_in_grams: 400,
        synopsis: 'Dilan 1991 adalah lanjutan dari novel Dilan 1990, yang menceritakan kisah cinta Dilan dan Milea di tahun 1991 di Bandung.',
        author_first_name: 'Pidi',
        author_last_name: 'Baiq',
        author_date_of_birth: '1972-12-08',
        category: 'Romance'
    },
    {
        title: 'The Road',
        publisher_name: 'Alfred A. Knopf',
        publisher_founded_year: 1915,
        publisher_city: 'New York',
        publisher_country: 'United States',
        language: 'English',
        price_in_rupiah: 165000,
        isbn: '9780307387899',
        pages: 287,
        weight_in_grams: 350,
        synopsis: 'The Road is a post-apocalyptic novel by American writer Cormac McCarthy. The book details the grueling journey of a father and his young son over a period of several months, across a landscape blasted by an unspecified cataclysm.',
        author_first_name: 'Cormac',
        author_last_name: 'McCarthy',
        author_date_of_birth: '1933-07-20',
        category: 'Dystopian'
    },
    {
        title: 'Maryamah Karpov',
        publisher_name: 'Bentang Pustaka',
        publisher_founded_year: 2005,
        publisher_city: 'Yogyakarta',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 110000,
        isbn: '9789791227055',
        pages: 504,
        weight_in_grams: 600,
        synopsis: 'Maryamah Karpov adalah buku keempat dari Tetralogi Laskar Pelangi karya Andrea Hirata yang menceritakan perjuangan Ikal dalam mencapai mimpinya.',
        author_first_name: 'Andrea',
        author_last_name: 'Hirata',
        author_date_of_birth: '1967-10-24',
        category: 'Fiction'
    },
    {
        title: 'Life of Pi',
        publisher_name: 'Knopf Canada',
        publisher_founded_year: 1915,
        publisher_city: 'Toronto',
        publisher_country: 'Canada',
        language: 'English',
        price_in_rupiah: 160000,
        isbn: '9780676973768',
        pages: 354,
        weight_in_grams: 400,
        synopsis: 'Life of Pi is a fantasy adventure novel by Yann Martel published in 2001. The protagonist is Piscine Molitor "Pi" Patel, an Indian boy from Pondicherry who explores issues of spirituality and practicality from an early age.',
        author_first_name: 'Yann',
        author_last_name: 'Martel',
        author_date_of_birth: '1963-06-25',
        category: 'Adventure'
    },
    {
        title: 'Rectoverso',
        publisher_name: 'Truedee Books',
        publisher_founded_year: 2008,
        publisher_city: 'Jakarta',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 125000,
        isbn: '9789791227284',
        pages: 150,
        weight_in_grams: 200,
        synopsis: 'Rectoverso is a collection of short stories and poems by Dee Lestari that explores themes of love, loss, and self-discovery.',
        author_first_name: 'Dee',
        author_last_name: 'Lestari',
        author_date_of_birth: '1976-01-20',
        category: 'Poetry'
    },
    {
        title: 'The Kite Runner',
        publisher_name: 'Riverhead Books',
        publisher_founded_year: 1994,
        publisher_city: 'New York',
        publisher_country: 'United States',
        language: 'English',
        price_in_rupiah: 180000,
        isbn: '9781594480003',
        pages: 371,
        weight_in_grams: 450,
        synopsis: 'The Kite Runner is the first novel by Afghan-American author Khaled Hosseini. Published in 2003 by Riverhead Books, it tells the story of Amir, a young boy from the Wazir Akbar Khan district of Kabul, whose closest friend is Hassan.',
        author_first_name: 'Khaled',
        author_last_name: 'Hosseini',
        author_date_of_birth: '1965-03-04',
        category: 'Historical Fiction'
    },
    {
        title: 'Sang Pemimpi',
        publisher_name: 'Bentang Pustaka',
        publisher_founded_year: 2005,
        publisher_city: 'Yogyakarta',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 110000,
        isbn: '9789791227024',
        pages: 292,
        weight_in_grams: 350,
        synopsis: 'Sang Pemimpi adalah novel kedua dari Tetralogi Laskar Pelangi karya Andrea Hirata yang menceritakan kisah remaja Ikal dan sahabat-sahabatnya dalam mengejar mimpi mereka.',
        author_first_name: 'Andrea',
        author_last_name: 'Hirata',
        author_date_of_birth: '1967-10-24',
        category: 'Fiction'
    },
    {
        title: 'The Catcher in the Rye',
        publisher_name: 'Little, Brown and Company',
        publisher_founded_year: 1837,
        publisher_city: 'Boston',
        publisher_country: 'United States',
        language: 'English',
        price_in_rupiah: 140000,
        isbn: '9780316769488',
        pages: 214,
        weight_in_grams: 300,
        synopsis: 'The novel\'s protagonist Holden Caulfield has become an icon for teenage rebellion. The novel also deals with complex issues of innocence, identity, belonging, loss, connection, and sex.',
        author_first_name: 'J.D.',
        author_last_name: 'Salinger',
        author_date_of_birth: '1919-01-01',
        category: 'Fiction'
    },
    {
        title: 'The Adventures of Huckleberry Finn',
        publisher_name: 'Chatto & Windus',
        publisher_founded_year: 1855,
        publisher_city: 'London',
        publisher_country: 'United Kingdom',
        language: 'English',
        price_in_rupiah: 170000,
        isbn: '9780486280615',
        pages: 366,
        weight_in_grams: 400,
        synopsis: 'The Adventures of Huckleberry Finn is a novel by Mark Twain, published in 1884. It is considered one of the Great American Novels and a classic of American literature.',
        author_first_name: 'Mark',
        author_last_name: 'Twain',
        author_date_of_birth: '1835-11-30',
        category: 'Adventure'
    },
    {
        title: 'Sebuah Seni untuk Bersikap Bodo Amat',
        publisher_name: 'Gramedia Pustaka Utama',
        publisher_founded_year: 1974,
        publisher_city: 'Jakarta',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 125000,
        isbn: '9786024526982',
        pages: 246,
        weight_in_grams: 300,
        synopsis: 'Sebuah Seni untuk Bersikap Bodo Amat adalah buku karya Mark Manson yang menawarkan cara pandang baru dalam menghadapi masalah hidup dengan lebih santai dan realistis.',
        author_first_name: 'Mark',
        author_last_name: 'Manson',
        author_date_of_birth: '1984-03-09',
        category: 'Self-Help'
    },
    {
        title: 'Pride and Prejudice',
        publisher_name: 'T. Egerton',
        publisher_founded_year: 1787,
        publisher_city: 'London',
        publisher_country: 'United Kingdom',
        language: 'English',
        price_in_rupiah: 150000,
        isbn: '9780141199078',
        pages: 279,
        weight_in_grams: 350,
        synopsis: 'Pride and Prejudice is a romantic novel by Jane Austen, published in 1813. The story charts the emotional development of the protagonist, Elizabeth Bennet, who learns the error of making hasty judgments and comes to appreciate the difference between the superficial and the essential.',
        author_first_name: 'Jane',
        author_last_name: 'Austen',
        author_date_of_birth: '1775-12-16',
        category: 'Romance'
    },
    {
        title: 'Norwegian Wood',
        publisher_name: 'Kodansha',
        publisher_founded_year: 1909,
        publisher_city: 'Tokyo',
        publisher_country: 'Japan',
        language: 'English',
        price_in_rupiah: 175000,
        isbn: '9780375704024',
        pages: 296,
        weight_in_grams: 350,
        synopsis: 'Norwegian Wood is a 1987 novel by Japanese author Haruki Murakami. The story is a nostalgic look at the loss of innocence and the heartbreak of first love, told through the eyes of a young man named Toru Watanabe.',
        author_first_name: 'Haruki',
        author_last_name: 'Murakami',
        author_date_of_birth: '1949-01-12',
        category: 'Fiction'
    },
    {
        title: 'Twilight',
        publisher_name: 'Little, Brown and Company',
        publisher_founded_year: 1837,
        publisher_city: 'Boston',
        publisher_country: 'United States',
        language: 'English',
        price_in_rupiah: 160000,
        isbn: '9780316015844',
        pages: 498,
        weight_in_grams: 500,
        synopsis: 'Twilight is a young adult vampire-romance novel by author Stephenie Meyer. It is the first book in the Twilight series, and introduces seventeen-year-old Isabella "Bella" Swan who moves from Phoenix, Arizona to Forks, Washington, and finds her life in danger when she falls in love with a vampire, Edward Cullen.',
        author_first_name: 'Stephenie',
        author_last_name: 'Meyer',
        author_date_of_birth: '1973-12-24',
        category: 'Fantasy'
    },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        publisher_name: 'George Allen & Unwin',
        publisher_founded_year: 1911,
        publisher_city: 'London',
        publisher_country: 'United Kingdom',
        language: 'English',
        price_in_rupiah: 220000,
        isbn: '9780547928210',
        pages: 423,
        weight_in_grams: 550,
        synopsis: 'The Fellowship of the Ring is the first of three volumes of the epic novel The Lord of the Rings by the English author J.R.R. Tolkien. It is followed by The Two Towers and The Return of the King.',
        author_first_name: 'J.R.R.',
        author_last_name: 'Tolkien',
        author_date_of_birth: '1892-01-03',
        category: 'Fantasy'
    },
    {
        title: 'Catching Fire',
        publisher_name: 'Scholastic Press',
        publisher_founded_year: 1920,
        publisher_city: 'New York',
        publisher_country: 'United States',
        language: 'English',
        price_in_rupiah: 190000,
        isbn: '9780439023498',
        pages: 391,
        weight_in_grams: 450,
        synopsis: 'Catching Fire is the second book in The Hunger Games trilogy by Suzanne Collins. As the story continues, Katniss Everdeen has survived the Hunger Games but her troubles are far from over.',
        author_first_name: 'Suzanne',
        author_last_name: 'Collins',
        author_date_of_birth: '1962-08-10',
        category: 'Dystopian'
    },
    {
        title: 'Momo',
        publisher_name: 'Thienemann Verlag',
        publisher_founded_year: 1849,
        publisher_city: 'Stuttgart',
        publisher_country: 'Germany',
        language: 'English',
        price_in_rupiah: 160000,
        isbn: '9780312427428',
        pages: 209,
        weight_in_grams: 300,
        synopsis: 'Momo, also known as The Grey Gentlemen or The Men in Grey, is a fantasy novel by Michael Ende. The book is about the concept of time and how it is used by humans in modern societies.',
        author_first_name: 'Michael',
        author_last_name: 'Ende',
        author_date_of_birth: '1929-11-12',
        category: 'Fantasy'
    },
    {
        title: 'Si Anak Pintar',
        publisher_name: 'Gramedia Pustaka Utama',
        publisher_founded_year: 1974,
        publisher_city: 'Jakarta',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 95000,
        isbn: '9786020316556',
        pages: 336,
        weight_in_grams: 400,
        synopsis: 'Si Anak Pintar adalah novel karya Tere Liye yang menceritakan kisah seorang anak yang cerdas dan penuh semangat dalam menghadapi berbagai tantangan hidup.',
        author_first_name: 'Tere',
        author_last_name: 'Liye',
        author_date_of_birth: '1979-05-21',
        category: 'Fiction'
    },
    {
        title: 'Sapiens: Riwayat Singkat Umat Manusia',
        publisher_name: 'KPG (Kepustakaan Populer Gramedia)',
        publisher_founded_year: 1999,
        publisher_city: 'Jakarta',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 240000,
        isbn: '9786024246033',
        pages: 528,
        weight_in_grams: 600,
        synopsis: 'Sapiens adalah buku karya Yuval Noah Harari yang menceritakan sejarah singkat umat manusia dari masa prasejarah hingga era modern.',
        author_first_name: 'Yuval Noah',
        author_last_name: 'Harari',
        author_date_of_birth: '1976-02-24',
        category: 'Non-Fiction'
    },
    {
        title: 'Frankenstein',
        publisher_name: 'Lackington, Hughes, Harding, Mavor & Jones',
        publisher_founded_year: 1799,
        publisher_city: 'London',
        publisher_country: 'United Kingdom',
        language: 'English',
        price_in_rupiah: 145000,
        isbn: '9780486282114',
        pages: 280,
        weight_in_grams: 350,
        synopsis: 'Frankenstein; or, The Modern Prometheus is a novel written by English author Mary Shelley that tells the story of Victor Frankenstein, a young scientist who creates a grotesque creature in an unorthodox scientific experiment.',
        author_first_name: 'Mary',
        author_last_name: 'Shelley',
        author_date_of_birth: '1797-08-30',
        category: 'Gothic Fiction'
    },
    {
        title: 'Sang Alkemis',
        publisher_name: 'Penerbit Serambi',
        publisher_founded_year: 1988,
        publisher_city: 'Jakarta',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 125000,
        isbn: '9789791142040',
        pages: 212,
        weight_in_grams: 250,
        synopsis: 'Sang Alkemis adalah terjemahan dari The Alchemist karya Paulo Coelho yang mengisahkan perjalanan seorang penggembala muda mencari harta karun di Piramida Mesir.',
        author_first_name: 'Paulo',
        author_last_name: 'Coelho',
        author_date_of_birth: '1947-08-24',
        category: 'Fiction'
    },
    {
        title: 'Arsène Lupin: Gentleman Burglar',
        publisher_name: 'Pierre Lafitte',
        publisher_founded_year: 1905,
        publisher_city: 'Paris',
        publisher_country: 'France',
        language: 'English',
        price_in_rupiah: 130000,
        isbn: '9781907429266',
        pages: 277,
        weight_in_grams: 320,
        synopsis: 'Arsène Lupin is a fictional gentleman thief and master of disguise created by French writer Maurice Leblanc. The first story, "The Arrest of Arsène Lupin", was published in a magazine in 1905.',
        author_first_name: 'Maurice',
        author_last_name: 'Leblanc',
        author_date_of_birth: '1864-11-11',
        category: 'Mystery'
    },
    {
        title: 'The Da Vinci Code',
        publisher_name: 'Doubleday',
        publisher_founded_year: 1897,
        publisher_city: 'New York',
        publisher_country: 'United States',
        language: 'English',
        price_in_rupiah: 175000,
        isbn: '9780385504201',
        pages: 454,
        weight_in_grams: 500,
        synopsis: 'The Da Vinci Code is a 2003 mystery thriller novel by Dan Brown. It is Brown\'s second novel to include the character Robert Langdon: the first was his 2000 novel Angels & Demons.',
        author_first_name: 'Dan',
        author_last_name: 'Brown',
        author_date_of_birth: '1964-06-22',
        category: 'Thriller'
    },
    {
        title: 'Sherlock Holmes: The Complete Novels and Stories',
        publisher_name: 'Bantam Classics',
        publisher_founded_year: 1945,
        publisher_city: 'New York',
        publisher_country: 'United States',
        language: 'English',
        price_in_rupiah: 220000,
        isbn: '9780553212419',
        pages: 1796,
        weight_in_grams: 1500,
        synopsis: 'Sherlock Holmes is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a "consulting detective" in the stories, Holmes is known for his proficiency with observation, deduction, forensic science, and logical reasoning that borders on the fantastic.',
        author_first_name: 'Arthur Conan',
        author_last_name: 'Doyle',
        author_date_of_birth: '1859-05-22',
        category: 'Mystery'
    },
    {
        title: 'Matahari',
        publisher_name: 'Gramedia Pustaka Utama',
        publisher_founded_year: 1974,
        publisher_city: 'Jakarta',
        publisher_country: 'Indonesia',
        language: 'Indonesian',
        price_in_rupiah: 99000,
        isbn: '9786020332945',
        pages: 400,
        weight_in_grams: 450,
        synopsis: 'Matahari adalah buku ketiga dari serial Bumi karya Tere Liye yang menceritakan petualangan Raib, Seli, dan Ali di klan Matahari.',
        author_first_name: 'Tere',
        author_last_name: 'Liye',
        author_date_of_birth: '1979-05-21',
        category: 'Fantasy'
    },
    {
        title: 'Looking for Alaska',
        publisher_name: 'Dutton Books',
        publisher_founded_year: 1852,
        publisher_city: 'New York',
        publisher_country: 'United States',
        language: 'English',
        price_in_rupiah: 145000,
        isbn: '9780525475064',
        pages: 221,
        weight_in_grams: 300,
        synopsis: 'Looking for Alaska is John Green\'s first novel, published in March 2005 by Dutton Juvenile. The story is told through the first-person perspective of teenager Miles "Pudge" Halter, as he enrolls in a boarding school to try to gain a deeper perspective on life.',
        author_first_name: 'John',
        author_last_name: 'Green',
        author_date_of_birth: '1977-08-24',
        category: 'Young Adult'
    }
];

const isCountryExistInDB = async (country) => {
    const { rows } = await pool.query('SELECT * FROM country WHERE country_name = $1', [country]);
    return rows.length > 0;
};

const getCountryId = async (country) => {
    const { rows } = await pool.query('SELECT country_id FROM country WHERE country_name = $1', [country]);
    return rows[0].country_id;
};

const insertCountry = async (country) => {
    await pool.query('INSERT INTO country (country_name) VALUES ($1)', [country]);
};

const isCityExistInDB = async (city) => {
    const { rows } = await pool.query('SELECT * FROM city WHERE city_name = $1', [city]);
    return rows.length > 0;
};

const getCityId = async (city) => {
    const { rows } = await pool.query('SELECT city_id FROM city WHERE city_name = $1', [city]);
    return rows[0].city_id;
}

const insertCity = async (city, countryId) => {
    await pool.query('INSERT INTO city (city_name, country_id) VALUES ($1, $2)', [city, countryId]);
};

const isPublisherExistInDB = async (publisherName) => {
    const { rows } = await pool.query('SELECT * FROM publisher WHERE publisher_name = $1', [publisherName]);
    return rows.length > 0;
}

const getPublisherId = async (publisherName) => {
    const { rows } = await pool.query('SELECT publisher_id FROM publisher WHERE publisher_name = $1', [publisherName]);
    return rows[0].publisher_id;
};

const insertPublisher = async (publisherName, foundedYear, cityId) => {
    await pool.query('INSERT INTO publisher (publisher_name, founded_year, city) VALUES ($1, $2, $3)', [publisherName, foundedYear, cityId]);
};

const isAuthorExistInDB = async (firstName, lastName) => {
    const { rows } = await pool.query('SELECT * FROM author WHERE first_name = $1 AND last_name = $2', [firstName, lastName]);
    return rows.length > 0;
};

const insertAuthor = async (firstName, lastName, dateOfBirth) => {
    await pool.query('INSERT INTO author (first_name, last_name, date_of_birth) VALUES ($1, $2, $3)', [firstName, lastName, dateOfBirth]);
}

const getAuthorId = async (firstName, lastName) => {
    const { rows } = await pool.query('SELECT author_id FROM author WHERE first_name = $1 AND last_name = $2', [firstName, lastName]);
    return rows[0].author_id;
};

const isCategoryExistInDB = async (category) => {
    const { rows } = await pool.query('SELECT * FROM category WHERE category_name = $1', [category]);
    return rows.length > 0;
};

const getCategoryID = async (category) => {
    const { rows } = await pool.query('SELECT category_id FROM category WHERE category_name = $1', [category]);
    return rows[0].category_id;
}

const insertCategory = async (category) => {
    await pool.query('INSERT INTO category (category_name) VALUES ($1)', [category]);
};

const isLanguageExistInDB = async (language) => {
    const { rows } = await pool.query('SELECT * FROM language WHERE language_name = $1', [language]);
    return rows.length > 0;
}

const getLanguageId = async (language) => {
    const { rows } = await pool.query('SELECT language_id FROM language WHERE language_name = $1', [language]);
    return rows[0].language_id;
}

const insertLanguage = async (language) => {
    await pool.query('INSERT INTO language (language_name) VALUES ($1)', [language]);
}

const isBookExist = async (isbn) => {
    const { rows } = await pool.query('SELECT * FROM book WHERE isbn = $1', [isbn]);
    return rows.length > 0;
}

const insertBook = async (book) => {
    const countryExist = await isCountryExistInDB(book.publisher_country);
    if (!countryExist) {
        await insertCountry(book.publisher_country);
    }
    const countryId = await getCountryId(book.publisher_country);

    const cityExist = await isCityExistInDB(book.publisher_city);
    if (!cityExist) {
        await insertCity(book.publisher_city, countryId);
    }
    const cityId = await getCityId(book.publisher_city);

    const publisherExist = await isPublisherExistInDB(book.publisher_name);
    console.log(publisherExist)
    if (!publisherExist) {
        console.log('publisher does not exist')
        await insertPublisher(book.publisher_name, book.publisher_founded_year, cityId);
    }
    const publisherId = await getPublisherId(book.publisher_name);

    const authorExist = await isAuthorExistInDB(book.author_first_name, book.author_last_name);
    if (!authorExist) {
        await insertAuthor(book.author_first_name, book.author_last_name, book.author_date_of_birth);
    }
    const authorId = await getAuthorId(book.author_first_name, book.author_last_name);

    const categoryExist = await isCategoryExistInDB(book.category);
    console.log('Category exist: ', categoryExist)
    if (!categoryExist) {
        await insertCategory(book.category);
    }
    const categoryId = await getCategoryID(book.category);

    const languageExist = await isLanguageExistInDB(book.language);
    if (!languageExist) {
        await insertLanguage(book.language);
    }
    const languageId = await getLanguageId(book.language);
    // there exist db book_category and book_author
    const bookExist = await isBookExist(book.isbn);
    if (bookExist) {
        console.log(`Book with ISBN ${book.isbn} already exists in the database.`);
        return;
    }

    // insert the book first
    const { rows } = await pool.query('INSERT INTO book (title, publisher_id, language_id, price_in_rupiah, isbn, pages, weight_in_grams, synopsis) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING book_id', [book.title, publisherId, languageId, book.price_in_rupiah, book.isbn, book.pages, book.weight_in_grams, book.synopsis]);
    const bookId = rows[0].book_id;

    // insert into book_author
    await pool.query('INSERT INTO book_author (book_id, author_id) VALUES ($1, $2)', [bookId, authorId]);

    // insert into book_category
    await pool.query('INSERT INTO book_category (book_id, category_id) VALUES ($1, $2)', [bookId, categoryId]);

    return bookId;
};

for (let book of books) {
    try {
        insertBook(book);
    } catch (error) {
        break;
    }
}
