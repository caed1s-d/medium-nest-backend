import { Articles } from "@app/models/article.entity";

export interface ArticlesResponseInterface {
  articles: Articles[];
  articlesCount: number;
}