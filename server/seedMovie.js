const db = require('./db');

const moviesData = [ 
    {
    "title": "Rio",
    "category": "continue",
    "src": "/assets/movie-posters/continue-watch/image208.png",
    "year": "2011",
    "type": "film",
    "isPremium": false,
    "rating": "4.5/5",
    "genres": [
      "Animation",
      "Adventure"
    ],
    "description": "Blu, seekor burung macaw langka yang tidak bisa terbang, melakukan perjalanan ke Rio de Janeiro."
  },
  {
    "title": "Shazam",
    "category": "continue",
    "src": "/assets/movie-posters/continue-watch/image216.png",
    "year": "2019",
    "type": "film",
    "isPremium": true,
    "rating": "4.7/5",
    "genres": [
      "Action",
      "Adventure"
    ],
    "description": "Seorang remaja mendapatkan kekuatan dewa kuno untuk melawan ancaman mematikan."
  },
  {
    "title": "fastX",
    "category": "continue",
    "src": "/assets/movie-posters/continue-watch/image218.png",
    "year": "2023",
    "type": "film",
    "isPremium": true,
    "rating": "4.8/5",
    "genres": [
      "Action",
      "Crime"
    ],
    "description": "Dom Toretto dan keluarganya menghadapi musuh paling mematikan dari masa lalu mereka."
  },
  {
    "title": "Blue Lock",
    "category": "continue",
    "src": "/assets/movie-posters/continue-watch/image219.png",
    "year": "2022",
    "type": "series",
    "isPremium": false,
    "rating": "4.9/5",
    "genres": [
      "Anime",
      "Sports"
    ],
    "description": "Jepang mengumpulkan 300 striker muda untuk menciptakan striker terbaik dunia."
  },
  {
    "title": "A Man Called Otto",
    "category": "continue",
    "src": "/assets/movie-posters/continue-watch/image224.png",
    "year": "2022",
    "type": "film",
    "isPremium": false,
    "rating": "4.6/5",
    "genres": [
      "Comedy",
      "Drama"
    ],
    "description": "Pria pemarah yang kehilangan tujuan hidup menemukan persahabatan tak terduga."
  },
  {
    "title": "Big Hero 6",
    "category": "continue",
    "src": "/assets/movie-posters/continue-watch/image226.png",
    "year": "2014",
    "type": "film",
    "isPremium": false,
    "rating": "4.8/5",
    "genres": [
      "Animation",
      "Action"
    ],
    "description": "Hiro Hamada membentuk tim superhero bersama robot medis bernama Baymax."
  },
  {
    "title": "The Tomorrow War",
    "category": "toprated",
    "src": "/assets/movie-posters/top-rated/image212.png",
    "year": "2021",
    "type": "film",
    "isPremium": true,
    "rating": "4.4/5",
    "genres": [
      "Action",
      "Sci-Fi"
    ],
    "description": "Pasukan masa depan kembali ke masa kini untuk merekrut tentara demi perang global."
  },
  {
    "title": "Batman",
    "category": "toprated",
    "src": "/assets/movie-posters/top-rated/image213.png",
    "year": "2022",
    "type": "film",
    "isPremium": true,
    "rating": "4.9/5",
    "genres": [
      "Action",
      "Crime"
    ],
    "description": "Batman menyelidiki korupsi di Gotham sambil memburu pembunuh berantai, Riddler."
  },
  {
    "title": "Sonic",
    "category": "toprated",
    "src": "/assets/movie-posters/top-rated/image234.png",
    "year": "2020",
    "type": "film",
    "isPremium": false,
    "rating": "4.7/5",
    "genres": [
      "Action",
      "Adventure"
    ],
    "description": "Sonic mencoba memahami kehidupan di Bumi sambil menghindari kejaran Dr. Robotnik."
  },
  {
    "title": "My Hero Academia",
    "category": "toprated",
    "src": "/assets/movie-posters/top-rated/image223.png",
    "year": "2016",
    "type": "series",
    "isPremium": true,
    "rating": "4.9/5",
    "genres": [
      "Anime",
      "Action"
    ],
    "description": "Izuku Midoriya bermimpi menjadi pahlawan nomor satu di dunia yang penuh kekuatan super."
  },
  {
    "title": "Black Panther",
    "category": "toprated",
    "src": "/assets/movie-posters/top-rated/image224.png",
    "year": "2018",
    "type": "film",
    "isPremium": true,
    "rating": "4.6/5",
    "genres": [
      "Action",
      "Fantasy"
    ],
    "description": "T'Challa kembali ke Wakanda untuk memimpin bangsanya namun menghadapi tantangan dari masa lalu."
  },
  {
    "title": "Guardians of Galaxy",
    "category": "toprated",
    "src": "/assets/movie-posters/top-rated/image235.png",
    "year": "2014",
    "type": "film",
    "isPremium": true,
    "rating": "4.8/5",
    "genres": [
      "Action",
      "Sci-Fi"
    ],
    "description": "Sekelompok penjahat antargalaksi dipaksa bekerja sama untuk menyelamatkan alam semesta."
  },
  {
    "title": "Spider-Man",
    "category": "trending",
    "src": "/assets/movie-posters/trending/image210.png",
    "year": "2021",
    "type": "film",
    "isPremium": true,
    "rating": "4.9/5",
    "genres": [
      "Action",
      "Adventure"
    ],
    "description": "Identitas Peter Parker terungkap, membuatnya meminta bantuan Doctor Strange."
  },
  {
    "title": "Transformers",
    "category": "trending",
    "src": "/assets/movie-posters/trending/image211.png",
    "year": "2007",
    "type": "film",
    "isPremium": true,
    "rating": "4.5/5",
    "genres": [
      "Action",
      "Sci-Fi"
    ],
    "description": "Perang antara Autobots dan Decepticons berlanjut di Bumi."
  },
  {
    "title": "Avengers",
    "category": "trending",
    "src": "/assets/movie-posters/trending/image221.png",
    "year": "2012",
    "type": "film",
    "isPremium": true,
    "rating": "4.8/5",
    "genres": [
      "Action",
      "Adventure"
    ],
    "description": "Pahlawan terkuat Bumi bersatu untuk menghentikan Loki dan tentara Chitauri."
  },
  {
    "title": "Black Panther",
    "category": "trending",
    "src": "/assets/movie-posters/trending/image226.png",
    "year": "2018",
    "type": "film",
    "isPremium": true,
    "rating": "4.4/5",
    "genres": [
      "Action",
      "Sci-Fi"
    ],
    "description": "T'Challa menghadapi Erik Killmonger yang ingin merebut takhta Wakanda."
  },
  {
    "title": "Guardians of the Galaxy",
    "category": "trending",
    "src": "/assets/movie-posters/trending/image230.png",
    "year": "2014",
    "type": "film",
    "isPremium": true,
    "rating": "4.5/5",
    "genres": [
      "Action",
      "Adventure"
    ],
    "description": "Peter Quill mencuri bola misterius dan menjadi target pengejaran Ronan."
  },
  {
    "title": "Star Wars",
    "category": "trending",
    "src": "/assets/movie-posters/trending/image236.png",
    "year": "1977",
    "type": "film",
    "isPremium": true,
    "rating": "5.0/5",
    "genres": [
      "Action",
      "Sci-Fi"
    ],
    "description": "Luke Skywalker bergabung dengan aliansi pemberontak untuk melawan Kekaisaran."
  },
  {
    "title": "Black Panther",
    "category": "newrelease",
    "src": "/assets/movie-posters/new-release/image205.png",
    "year": "2022",
    "type": "film",
    "isPremium": true,
    "rating": "4.5/5",
    "genres": [
      "Action",
      "Drama"
    ],
    "description": "Rakyat Wakanda berjuang melindungi negara mereka dari campur tangan kekuatan dunia."
  },
  {
    "title": "Guardians of the Galaxy Vol 3",
    "category": "newrelease",
    "src": "/assets/movie-posters/new-release/image216.png",
    "year": "2023",
    "type": "film",
    "isPremium": true,
    "rating": "4.8/5",
    "genres": [
      "Action",
      "Sci-Fi"
    ],
    "description": "Para penjaga galaksi menyesuaikan diri dengan kehidupan di Knowhere."
  },
  {
    "title": "Spider-Man: Across the Spider-Verse",
    "category": "newrelease",
    "src": "/assets/movie-posters/new-release/image225.png",
    "year": "2023",
    "type": "film",
    "isPremium": true,
    "rating": "5.0/5",
    "genres": [
      "Animation",
      "Action"
    ],
    "description": "Miles Morales melintasi Multiverse untuk melindungi seluruh semesta."
  },
  {
    "title": "Transformers: Rise of the Beasts",
    "category": "newrelease",
    "src": "/assets/movie-posters/new-release/image227.png",
    "year": "2023",
    "type": "film",
    "isPremium": true,
    "rating": "4.4/5",
    "genres": [
      "Action",
      "Adventure"
    ],
    "description": "Kembali ke tahun 90-an, Maximals bergabung dengan Autobots dalam pertempuran."
  },
  {
    "title": "Avengers: Endgame",
    "category": "newrelease",
    "src": "/assets/movie-posters/new-release/image228.png",
    "year": "2019",
    "type": "film",
    "isPremium": true,
    "rating": "4.9/5",
    "genres": [
      "Action",
      "Adventure"
    ],
    "description": "Setelah kejadian Infinity War, Avengers yang tersisa mencoba memulihkan alam semesta."
  },
  {
    "title": "Star Wars: The Rise of Skywalker",
    "category": "newrelease",
    "src": "/assets/movie-posters/new-release/image232.png",
    "year": "2019",
    "type": "film",
    "isPremium": true,
    "rating": "4.3/5",
    "genres": [
      "Action",
      "Sci-Fi"
    ],
    "description": "Kisah akhir dari saga Skywalker di mana Rey menghadapi ancaman terakhir."
  }
];

const seed = async () => {
    try {
        console.log("Proses sinkronisasi data dimulai...");
        
        for (const m of moviesData) {
            const checkMovie = await db.query('SELECT id FROM movies WHERE title = $1', [m.title]);
            
            let movieId;
            if (checkMovie.rows.length === 0) {
                const res = await db.query(
                    `INSERT INTO movies (title, category, src, year, type, is_premium, rating, description) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
                    [m.title, m.category, m.src, m.year, m.type, m.isPremium, m.rating, m.description]
                );
                movieId = res.rows[0].id;
                console.log(`Movie Berhasil Masuk: ${m.title}`);
            } else {
                movieId = checkMovie.rows[0].id;
            }

            for (const gName of m.genres) {
                const gRes = await db.query('SELECT id FROM genre WHERE name = $1', [gName]);
                
                if (gRes.rows.length > 0) {
                    const genreId = gRes.rows[0].id;
                    await db.query(
                        'INSERT INTO movie_genres (movie_id, genre_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', 
                        [movieId, genreId]
                    );
                }
            }
        }
        console.log("Selesai! Database lo sekarang sudah penuh data film.");
        process.exit();
    } catch (err) {
        console.error("Error Seeding:", err.message);
        process.exit(1);
    }
};

seed();