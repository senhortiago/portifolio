import * as z from 'zod/mini';

const hexColorSchema = z.string().check(z.regex(/^#[0-9a-fA-F]{6}$/));
const nonEmptyString = z.string().check(z.minLength(1));

export const projectSchema = z.object({
  id: nonEmptyString,
  title: nonEmptyString,
  summary: nonEmptyString,
  description: nonEmptyString,
  year: z.int().check(z.gte(2000), z.lte(2100)),
  role: nonEmptyString,
  tags: z.array(nonEmptyString).check(z.maxLength(8)),
  links: z.object({
    repository: z.nullable(z.url()),
    demo: z.nullable(z.url()),
  }),
  cover: z.object({
    from: hexColorSchema,
    to: hexColorSchema,
  }),
});

export const projectsResponseSchema = z.object({
  projects: z.array(projectSchema),
});

export type Project = z.infer<typeof projectSchema>;

export type RemoteState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; reason: 'network' | 'invalid-payload' };
