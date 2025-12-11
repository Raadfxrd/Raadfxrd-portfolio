CREATE TABLE `blog_posts`
(
    `id`          int AUTO_INCREMENT NOT NULL,
    `slug`        varchar(255)       NOT NULL,
    `title`       varchar(255)       NOT NULL,
    `description` text               NOT NULL,
    `content`     text               NOT NULL,
    `author`      varchar(255)       NOT NULL,
    `date`        varchar(10)        NOT NULL,
    `published`   boolean            NOT NULL DEFAULT false,
    `created_at`  timestamp          NOT NULL DEFAULT (now()),
    `updated_at`  timestamp          NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `blog_posts_id` PRIMARY KEY (`id`),
    CONSTRAINT `blog_posts_slug_unique` UNIQUE (`slug`)
);

CREATE TABLE `newsletter`
(
    `id`            int AUTO_INCREMENT NOT NULL,
    `email`         varchar(255)       NOT NULL,
    `subscribed_at` timestamp          NOT NULL DEFAULT (now()),
    `active`        boolean            NOT NULL DEFAULT true,
    CONSTRAINT `newsletter_id` PRIMARY KEY (`id`),
    CONSTRAINT `newsletter_email_unique` UNIQUE (`email`)
);

CREATE TABLE `users`
(
    `id`         int AUTO_INCREMENT NOT NULL,
    `username`   varchar(255)       NOT NULL,
    `password`   varchar(255)       NOT NULL,
    `email`      varchar(255)       NOT NULL,
    `created_at` timestamp          NOT NULL DEFAULT (now()),
    CONSTRAINT `users_id` PRIMARY KEY (`id`),
    CONSTRAINT `users_username_unique` UNIQUE (`username`),
    CONSTRAINT `users_email_unique` UNIQUE (`email`)
);
