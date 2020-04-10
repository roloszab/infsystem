INSERT INTO
    `library`.`member` (
        `NAME`,
        `PHONE_NUMBER`,
        `AUTH_CARD_NUMBER`,
        `ADDRESS`
    )
VALUES
    (
        "Fazekas Levente",
        "+36303079443",
        "TITKOS69",
        "Right behind you"
    );

INSERT INTO
    `library`.`member` (
        `NAME`,
        `PHONE_NUMBER`,
        `AUTH_CARD_NUMBER`,
        `ADDRESS`
    )
VALUES
    (
        "Gipsz Jakab",
        "0646366242",
        "123456AB",
        "1062 Budapest, Andrássy út 60."
    );

INSERT INTO
    `library`.`media` (`TITLE`, `AUTHOR`, `TYPE`, `SOURCE_DATE`)
VALUES
    (
        "Pipacsok a buzaban",
        "Mikszath Kalman",
        "Novel",
        "1897-03-12"
    );

INSERT INTO
    `library`.`media` (`TITLE`, `AUTHOR`, `TYPE`, `SOURCE_DATE`)
VALUES
    (
        "Katanghy Menyhert",
        "Mikszath Kalman",
        "Novel",
        "1896-11-14"
    );

INSERT INTO
    `library`.`media` (`TITLE`, `AUTHOR`, `TYPE`, `SOURCE_DATE`)
VALUES
    (
        "Mikszath stilusa es nyelve",
        "Rubinyi Mozes",
        "Anthology",
        "1910-01-23"
    );

INSERT INTO
    `library`.`rent` (`MEDIA_ID`, `MEMBER_ID`)
VALUES
    (
        (
            SELECT
                `ID`
            FROM
                `library`.`media`
            WHERE
                `AUTHOR` = "Mikszath Kalman"
                AND `TITLE` = "Katanghy Menyhert"
        ),
        (
            SELECT
                `ID`
            FROM
                `library`.`member`
            WHERE
                `AUTH_CARD_NUMBER` = "TITKOS69"
        )
    );