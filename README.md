![Static Badge](https://img.shields.io/badge/html-FD501A?style=for-the-badge&logo=html5&logoColor=white)
![Static Badge](https://img.shields.io/badge/css-306AF1?style=for-the-badge&logo=css3&logoColor=white)
![Static Badge](https://img.shields.io/badge/javascript-EFD81B?style=for-the-badge&logo=javascript&logoColor=black)
![Static Badge](https://img.shields.io/badge/typescript-387CC8?style=for-the-badge&logo=typescript&logoColor=white)
![Static Badge](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Static Badge](https://img.shields.io/badge/adonis-4031A9?style=for-the-badge&logo=adonisjs&logoColor=white)
![Static Badge](https://img.shields.io/badge/MySQL-F29111?style=for-the-badge&logo=mysql&logoColor=marine)
![Static Badge](https://img.shields.io/badge/Inertia-black?style=for-the-badge&logo=inertia&color=white)
![Static Badge](https://img.shields.io/badge/Vue.JS-68C575?style=for-the-badge&logo=vuedotjs&color=black)

# What's Codex ?

Codex is a site where I list the things I've read, seen and played, to which I give a rating.
This can be video games, films, series, anime and books.
It also allows me to keep up to date with the ones I've planned to see, the ones I've left out and my favorites.

## Functionalities

- Manage and curate a taxonomy of medias (books, movies, series, video games).
- Cascade deletion of the cover file when the related media is deleted.
- Handles storing uploaded cover images with automatic resize and optimizations ([Cloudinary](https://cloudinary.com/)).
- Details page for each media, retrieved by media id.

## Database diagram and relationship explanations

<img width="1413" height="961" alt="diagram-db-light" src="https://github.com/user-attachments/assets/497c776c-d38a-49b0-9deb-73e58bad90f6" />

- `users`: as the project aims to contain only my media entries, I chose not to link the "users" table to "reviews". It will only be used for authentication.

- `media`: contains every type of data the media I add may have. But also information specific to them, enabling them to be categorized within my application.

- `reviews`: contains everything related to my opinion about a media.

- `covers`: contains the official covers in good quality, making it easy to identify each media.

- `games_infos`: contains all video games related media information.

- `movies_infos`: contains all movies related media information.

- `series_infos`: contains all series related media information.

- `anime_infos`: contains all anime related media information.

- `books_infos`: contains all book related media information.

- `category_types`: allows to assign one media types to multiple categories and avoid types names duplication.

- `category_genres`: allows to assign one media genres to multiple categories and avoid genres names duplication.

## Future plans

- Restrict access to certain pages and functions to non-administrator users.
- Statistical display of media distribution according to various criteria.
- Adding a feature to track "collections".

## How to start

Node version > 18.18  
AdonisJS v6

Set up the database informations in the `.env` like the `.env.example`. The project use a MySQL database.

```bash
# clone the project
git clone https://github.com/Guillaume-SE/Codex.git

# install dependencies
npm install

# run the project
npm run dev

# create the database
node ace migration:run

# seed the db with fake data
node ace db:seed
# can also choose wich seed to run with
node ace db:seed -i
```

## Status

1 october 2025: covers upload now handled by Cloudinary, next step will be to work on a v1 for the app style.

## Other

The project is still under development, so I'll add more informations as it becomes available :sunglasses:
