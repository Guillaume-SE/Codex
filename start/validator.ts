import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const messages = {
  // generic
  'required': 'Le champ "{{ field }}" est requis',
  'number': 'Le champ "{{ field }}" doit être un nombre',
  'string': 'Le champ "{{ field }}" doit être du texte',
  'positive': 'Le champ "{{ field }}" doit être un nombre positif',
  // specific
  'alternativeName.notSameAs': 'Le "{{ field }}" doit être différent du nom principal',
  'file.extname': 'Fichier invalide. Seuls les formats png, webp, jpg, jpeg sont autorisés',
  'file.size': 'Fichier trop lourd. Seuls les fichiers de 2mb maximum sont autorisés',
  'isExists': "Le {{ field }} choisi n'existe pas",
  'name.database.unique': 'Ce nom existe déjà',
  'rating.range': 'La note doit être comprise entre 0 et 10',
}

const fields = {
  mediaId: 'media',
  categoryId: 'catégorie',
  typeId: 'type',
  genreId: 'genre',
  name: 'nom',
  alternativeName: 'nom alternatif',
  statusId: 'progression',
  platformId: 'plateforme',
}

vine.messagesProvider = new SimpleMessagesProvider(messages, fields)
