<template>
  <main>
    <header>
      <nav class="navbar">
        <div>
          <Link href="/">Accueil</Link>
        </div>
        <div>
          <Link href="/games">Jeux</Link>
        </div>
        <div>
          <Link href="/movies">Films</Link>
        </div>
        <div>
          <Link href="/series">Séries</Link>
        </div>
        <div>
          <Link href="/anime">Anime</Link>
        </div>
        <div>
          <Link href="/books">Livres</Link>
        </div>
        <div>Connexion</div>
      </nav>
    </header>
    <div>
      <slot />
    </div>
  </main>
</template>
