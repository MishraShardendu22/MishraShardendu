import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const files = pgTable("files",{
    id: uuid("id").defaultRandom().primaryKey(),

    name: text("name").notNull(),
    path: text("path").notNull(),
    type: text("type").notNull(),
    size: integer("size").notNull(),

    fileUrl: text("file_url").notNull(),
    thumbnailUrl: text("thumbnail_url"),

    userId : text("user_id").notNull(),
    parentId: text("parent_id"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    
    isTrash: boolean("is_trash").default(false).notNull(),
    isFolder: boolean("is_folder").default(false).notNull(),
    isStarred: boolean("is_starred").default(false).notNull(),
})

export const fileRelations = relations(files, ({ one, many }) => ({
    parent: one(files, {
        fields: [files.parentId],
        references: [files.id],
    }),

    children: many(files),
}));

export type File = typeof files.$inferSelect
export type NewFile = typeof files.$inferInsert