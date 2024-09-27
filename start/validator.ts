import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const messages = {
  // generic
  'required': 'Le champ est requis',
  'number': 'Le champ doit être un nombre',
  'string': 'Le champ doit être du texte',
  'positive': 'Le champ doit être un nombre positif',
  // specific
  'isExists': "Le {{ field }} choisi n'existe pas",
  'categoryId.isExists': "La {{ field }} choisie n'existe pas",
  'typeId.isAssociatedTo': 'Ce {{ field }} est indisponible pour cette catégorie',
  'genreId.distinct': 'Les genres doivent être uniques',
  'genreId.*.isExists': "Un ou plusieurs genres choisis n'existent pas",
  'genreId.*.isAssociatedTo': 'Un ou plusieurs genres sont indisponibles pour cette catégorie',
  'platformId.isExists': "La {{ field }} choisie n'existe pas",
}

const fields = {
  mediaId: 'media',
  mediaParentId: 'media',
  categoryId: 'catégorie',
  statusId: 'statut',
  typeId: 'type',
  platformId: 'plateforme',
}

vine.messagesProvider = new SimpleMessagesProvider(messages, fields)
