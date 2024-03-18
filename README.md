### What's Codex ?

Codex is a site where I list the things I've read, seen and played, to which I give a rating.
This can be series, films, video games and books.
It also allows me to keep up to date with the ones I've planned to see, the ones I've left out and my favorites.
It will use Node and AdonisJS for the back end and Vue.js for the front end.

### How to start

Node version > 18.18  
AdonisJS v5

Set up the database informations in the `.env` like the `.env.example`.
The command `node ace migration:run` is needed to create the database.

```
// clone the project
git clone https://github.com/Guillaume-SE/Codex.git

// install dependencies
npm install

// run the project
npm run dev
```

### Functionalities

- Add, update and remove a media.
- Cover automatically removed when media is deleted, unless the cover is the default one.
- Add a cover that will be automatically resized with [Sharp](https://sharp.pixelplumbing.com/) before being stored.
- Different filters for each category: by genre, notes, name, etc.
- Details page for each media, retrieved by media id

### Other

The project is still under development, so I'll add more information as it becomes available :sunglasses:
