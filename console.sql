create table favorite
(
    gcode  varchar(256) not null comment '游戏编码',
    uemail varchar(256) not null comment '用户邮箱',
    primary key (gcode, uemail)
)
    comment '`favorite`';

insert into favorite (gcode, uemail) value ('101','mazhj180@163.com');
insert into favorite (gcode, uemail) value ('102','mazhj180@163.com');

# ------- game -----------
create table game
(
    gid     varchar(256) not null comment 'id'
        primary key,
    name    varchar(256) not null comment '名称',
    code    varchar(256) not null comment '编码',
    url     varchar(256) not null comment '地址',
    players bigint       not null comment '粉丝',
    price   varchar(256) null
)
    comment '`game`';

insert into game (gid, name, code, url, players, price) value ('asdfg','像素鸟','104','像素鸟',10002,'10');
insert into game (gid, name, code, url, players, price) value ('qqqqsd','万圣节','103','halloween-game',1000000,'20');
insert into game (gid, name, code, url, players, price) value ('qwerty','别踩白块','105','别踩白块',1000234,'12');
insert into game (gid, name, code, url, players, price) value ('sadasdasd','飞机','101','https//shdsd',100032,'100');
insert into game (gid, name, code, url, players, price) value ('sdsadaswww','扫雷','102','mineClearance',10001,'2');
insert into game (gid, name, code, url, players, price) value ('wadsddd','好玩的2D桌球游戏','106','好玩的2D桌球游戏',299933,'200');
insert into game (gid, name, code, url, players, price) value ('飞机躲避子弹','飞机躲避子弹','107','飞机躲避子弹',9999999,'212');

#--------- user --------------
create table user
(
    id       varchar(256) not null comment 'id'
        primary key,
    email    varchar(256) not null comment '邮箱',
    password varchar(256) not null comment '密码',
    role     int          not null comment '权限',
    birthday date         null,
    tel      varchar(256) null
)
    comment '`user`';

insert into user (id, email, password, role, birthday, tel) VALUE ('1','mazhj180@163.com','12345','1',null,null);

