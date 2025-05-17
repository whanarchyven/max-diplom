import { t } from 'elysia'

export const NewsSchema = t.Object({
  slug: t.String(),
  date: t.Optional(t.String()),
  title: t.Object({
    en: t.String(),
    ru: t.String()
  }),
  description: t.Object({
    en: t.String(),
    ru: t.String()
  }),
  content: t.Object({
    en: t.String(),
    ru: t.String()
  }),
  image: t.String()
})

export const NewsCreateSchema = t.Object({
  slug: t.String(),
  date: t.Optional(t.String()),
  title: t.Object({
    en: t.String(),
    ru: t.String()
  }),
  description: t.Object({
    en: t.String(),
    ru: t.String()
  }),
  content: t.Object({
    en: t.String(),
    ru: t.String()
  }),
  image: t.String()
})

export type News = typeof NewsSchema.static 