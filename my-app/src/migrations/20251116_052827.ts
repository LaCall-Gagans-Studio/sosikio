import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_products_about_process_steps_icon" AS ENUM('layers', 'trendingUp', 'zap', 'playCircle', 'brainCircuit', 'headphones', 'barChart2', 'users', 'target', 'briefcase');
  CREATE TYPE "public"."enum_products_about_features_items_icon" AS ENUM('barChart2', 'users', 'headphones', 'trendingUp', 'target', 'briefcase');
  CREATE TYPE "public"."enum_overview_strengths_icon" AS ENUM('users', 'target', 'trendingUp', 'barChart2', 'layers', 'zap', 'brainCircuit', 'headphones', 'playCircle', 'briefcase');
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "staff_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "staff" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"bio" varchar,
  	"avatar_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "timeline" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"detail" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products_about_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_products_about_process_steps_icon" NOT NULL,
  	"title_jp" varchar NOT NULL,
  	"title_en" varchar,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "products_about_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_products_about_features_items_icon" NOT NULL,
  	"title_jp" varchar NOT NULL,
  	"title_en" varchar,
  	"description" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"product_id" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"tagline" varchar NOT NULL,
  	"tagline_en" varchar,
  	"logo_id" integer NOT NULL,
  	"logo_long_id" integer,
  	"catchphrase" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"main_color" varchar DEFAULT 'text-[#5bb5c3]' NOT NULL,
  	"bg_color" varchar DEFAULT 'bg-sky-50' NOT NULL,
  	"bgcolor_light" varchar DEFAULT 'bg-[#5bb5c3]' NOT NULL,
  	"border_color" varchar DEFAULT 'border-[#5bb5c3]' NOT NULL,
  	"gradient" varchar DEFAULT 'bg-gradient-to-r from-[#5bb5c3] to-blue-600' NOT NULL,
  	"about_main_heading_jp" varchar NOT NULL,
  	"about_main_heading_en" varchar,
  	"about_main_text" varchar NOT NULL,
  	"about_process_title_jp" varchar NOT NULL,
  	"about_process_title_en" varchar,
  	"about_features_title_jp" varchar NOT NULL,
  	"about_features_title_en" varchar,
  	"about_cta_title_jp" varchar NOT NULL,
  	"about_cta_title_en" varchar,
  	"about_cta_description" varchar NOT NULL,
  	"about_cta_button_text" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"users_id" integer,
  	"staff_id" integer,
  	"timeline_id" integer,
  	"products_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "philosophy" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"vision_tagline" varchar NOT NULL,
  	"vision_lead" varchar NOT NULL,
  	"representative_name" varchar NOT NULL,
  	"representative_title" varchar NOT NULL,
  	"representative_avatar_id" integer NOT NULL,
  	"representative_greeting" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "related_company_businesses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "related_company_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"address" varchar NOT NULL,
  	"tel" varchar,
  	"fax" varchar,
  	"map_embed_url" varchar
  );
  
  CREATE TABLE "related_company" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"established" varchar,
  	"capital" varchar,
  	"motto" varchar,
  	"employees" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "overview_client_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "overview_strengths_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "overview_strengths" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_overview_strengths_icon" DEFAULT 'users' NOT NULL,
  	"badge" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "overview" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_subtitle" varchar,
  	"hero_main_logo_id" integer,
  	"hero_cta_primary_label" varchar DEFAULT 'サービスを見る',
  	"hero_cta_primary_href" varchar DEFAULT '#about',
  	"hero_cta_secondary_label" varchar DEFAULT 'SOSIKIOを知る',
  	"hero_cta_secondary_href" varchar DEFAULT '/philosophy',
  	"hero_background_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "staff_links" ADD CONSTRAINT "staff_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."staff"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "staff" ADD CONSTRAINT "staff_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_about_process_steps" ADD CONSTRAINT "products_about_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_about_features_items" ADD CONSTRAINT "products_about_features_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_about_features_items" ADD CONSTRAINT "products_about_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_logo_long_id_media_id_fk" FOREIGN KEY ("logo_long_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_staff_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."staff"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_timeline_fk" FOREIGN KEY ("timeline_id") REFERENCES "public"."timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "philosophy" ADD CONSTRAINT "philosophy_representative_avatar_id_media_id_fk" FOREIGN KEY ("representative_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "related_company_businesses" ADD CONSTRAINT "related_company_businesses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."related_company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "related_company_offices" ADD CONSTRAINT "related_company_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."related_company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "related_company" ADD CONSTRAINT "related_company_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "overview_client_logos" ADD CONSTRAINT "overview_client_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "overview_client_logos" ADD CONSTRAINT "overview_client_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "overview_strengths_points" ADD CONSTRAINT "overview_strengths_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."overview_strengths"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "overview_strengths" ADD CONSTRAINT "overview_strengths_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "overview" ADD CONSTRAINT "overview_hero_main_logo_id_media_id_fk" FOREIGN KEY ("hero_main_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "overview" ADD CONSTRAINT "overview_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "staff_links_order_idx" ON "staff_links" USING btree ("_order");
  CREATE INDEX "staff_links_parent_id_idx" ON "staff_links" USING btree ("_parent_id");
  CREATE INDEX "staff_avatar_idx" ON "staff" USING btree ("avatar_id");
  CREATE INDEX "staff_updated_at_idx" ON "staff" USING btree ("updated_at");
  CREATE INDEX "staff_created_at_idx" ON "staff" USING btree ("created_at");
  CREATE INDEX "timeline_updated_at_idx" ON "timeline" USING btree ("updated_at");
  CREATE INDEX "timeline_created_at_idx" ON "timeline" USING btree ("created_at");
  CREATE INDEX "products_about_process_steps_order_idx" ON "products_about_process_steps" USING btree ("_order");
  CREATE INDEX "products_about_process_steps_parent_id_idx" ON "products_about_process_steps" USING btree ("_parent_id");
  CREATE INDEX "products_about_features_items_order_idx" ON "products_about_features_items" USING btree ("_order");
  CREATE INDEX "products_about_features_items_parent_id_idx" ON "products_about_features_items" USING btree ("_parent_id");
  CREATE INDEX "products_about_features_items_image_idx" ON "products_about_features_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "products_product_id_idx" ON "products" USING btree ("product_id");
  CREATE INDEX "products_logo_idx" ON "products" USING btree ("logo_id");
  CREATE INDEX "products_logo_long_idx" ON "products" USING btree ("logo_long_id");
  CREATE INDEX "products_image_idx" ON "products" USING btree ("image_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_staff_id_idx" ON "payload_locked_documents_rels" USING btree ("staff_id");
  CREATE INDEX "payload_locked_documents_rels_timeline_id_idx" ON "payload_locked_documents_rels" USING btree ("timeline_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "philosophy_representative_representative_avatar_idx" ON "philosophy" USING btree ("representative_avatar_id");
  CREATE INDEX "related_company_businesses_order_idx" ON "related_company_businesses" USING btree ("_order");
  CREATE INDEX "related_company_businesses_parent_id_idx" ON "related_company_businesses" USING btree ("_parent_id");
  CREATE INDEX "related_company_offices_order_idx" ON "related_company_offices" USING btree ("_order");
  CREATE INDEX "related_company_offices_parent_id_idx" ON "related_company_offices" USING btree ("_parent_id");
  CREATE INDEX "related_company_logo_idx" ON "related_company" USING btree ("logo_id");
  CREATE INDEX "overview_client_logos_order_idx" ON "overview_client_logos" USING btree ("_order");
  CREATE INDEX "overview_client_logos_parent_id_idx" ON "overview_client_logos" USING btree ("_parent_id");
  CREATE INDEX "overview_client_logos_image_idx" ON "overview_client_logos" USING btree ("image_id");
  CREATE INDEX "overview_strengths_points_order_idx" ON "overview_strengths_points" USING btree ("_order");
  CREATE INDEX "overview_strengths_points_parent_id_idx" ON "overview_strengths_points" USING btree ("_parent_id");
  CREATE INDEX "overview_strengths_order_idx" ON "overview_strengths" USING btree ("_order");
  CREATE INDEX "overview_strengths_parent_id_idx" ON "overview_strengths" USING btree ("_parent_id");
  CREATE INDEX "overview_hero_hero_main_logo_idx" ON "overview" USING btree ("hero_main_logo_id");
  CREATE INDEX "overview_hero_hero_background_image_idx" ON "overview" USING btree ("hero_background_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "staff_links" CASCADE;
  DROP TABLE "staff" CASCADE;
  DROP TABLE "timeline" CASCADE;
  DROP TABLE "products_about_process_steps" CASCADE;
  DROP TABLE "products_about_features_items" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "philosophy" CASCADE;
  DROP TABLE "related_company_businesses" CASCADE;
  DROP TABLE "related_company_offices" CASCADE;
  DROP TABLE "related_company" CASCADE;
  DROP TABLE "overview_client_logos" CASCADE;
  DROP TABLE "overview_strengths_points" CASCADE;
  DROP TABLE "overview_strengths" CASCADE;
  DROP TABLE "overview" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_products_about_process_steps_icon";
  DROP TYPE "public"."enum_products_about_features_items_icon";
  DROP TYPE "public"."enum_overview_strengths_icon";`)
}
