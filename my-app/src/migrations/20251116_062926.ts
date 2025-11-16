import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "overview_issue_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"keyword" varchar NOT NULL
  );
  
  ALTER TABLE "payload_kv" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload_kv" CASCADE;
  ALTER TABLE "overview" DROP CONSTRAINT "overview_hero_main_logo_id_media_id_fk";
  
  DROP INDEX "overview_hero_hero_main_logo_idx";
  ALTER TABLE "overview_issue_keywords" ADD CONSTRAINT "overview_issue_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."overview"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "overview_issue_keywords_order_idx" ON "overview_issue_keywords" USING btree ("_order");
  CREATE INDEX "overview_issue_keywords_parent_id_idx" ON "overview_issue_keywords" USING btree ("_parent_id");
  ALTER TABLE "overview" DROP COLUMN "hero_main_logo_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  ALTER TABLE "overview_issue_keywords" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "overview_issue_keywords" CASCADE;
  ALTER TABLE "overview" ADD COLUMN "hero_main_logo_id" integer;
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  ALTER TABLE "overview" ADD CONSTRAINT "overview_hero_main_logo_id_media_id_fk" FOREIGN KEY ("hero_main_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "overview_hero_hero_main_logo_idx" ON "overview" USING btree ("hero_main_logo_id");`)
}
