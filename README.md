## What's Codex ?

Codex is a site where I list the things I've read, seen and played, to which I give a rating.
This can be series, films, video games and books.
It also allows me to keep up to date with the ones I've planned to see, the ones I've left out and my favorites.

### Functionalities

- Manage and curate a taxonomy of medias (books, movies, series, video games).
- Cascade deletion of the cover file when the related media is deleted.
- Handles storing user-uploaded cover images with automatic resize ([Sharp](https://sharp.pixelplumbing.com/)).
- Details page for each media, retrieved by media id.

### Database diagram and relationship explanations
![codexdb-diagram](https://github.com/Guillaume-SE/Codex/assets/100344718/ae4559bf-de04-49d4-8d3d-62b91324024f)

**Users**: As the project aims to contain only my media entries, I chose not to link the "users" table to "reviews". It will only be used for authentication.  
**Media**: Will contain every type of data the media I add may have, for example books, video games, movies and series all have a synopsis.  
The [media type](https://github.com/Guillaume-SE/Codex/blob/main/app/Tools/Enums/MediaTypes.ts) will determine how the rest of the information is added to a dedicated table.   
**Reviews**: Reviews are created as soon as a media is added, and a review cannot exist without its associated media. This is one of the reasons why "rating" and "opinion" are one of the only nullable columns, because if I haven't yet seen the film, read the book, played the game, the media will have the appropriate [status](https://github.com/Guillaume-SE/Codex/blob/main/app/Tools/Enums/ReviewStatus.ts) for this specific case.

### Future plans

- Restrict access to certain pages and functions to non-administrator users.
- Search medias by title and a number of filters (genre, rating, name, etc).
- Statistical display of media distribution according to various criteria.
- Setting up a front end with Vue.js.

### How to start

Node version > 18.18  
AdonisJS v5

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
```

### Other

The project is still under development, so I'll add more information as it becomes available :sunglasses:
