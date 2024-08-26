import { Articles } from '@app/models/article.entity';

export type ArticleType = Omit<Articles, 'updateTimestamp'>;
