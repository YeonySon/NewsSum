
use newssumdb2;

-- 사용자(users) 테이블
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL PRIMARY KEY auto_increment,
    email VARCHAR(50),
    name VARCHAR(15),
    password TEXT,
    birth_date VARCHAR(8),
    authenticate varchar(4) NOT NULL DEFAULT 'UA01',
    refresh_token varchar(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 뉴스(news) 테이블
CREATE TABLE IF NOT EXISTS news (
    id INT NOT NULL PRIMARY KEY auto_increment,
    head VARCHAR(100),
    main TEXT,
    three_line VARCHAR(255),
    url VARCHAR(255),
    posted_date DATETIME,
    media_id INT NOT NULL,
    image VARCHAR(255),
    cg_id INT NOT NULL,
    total_like INT DEFAULT 0,
    total_scrap INT default 0,
    view_cnt INT default 0,
    nouns TEXT
);

-- 기술 블로그(tech_blog) 테이블
CREATE TABLE IF NOT EXISTS tech_blog (
    id INT NOT NULL PRIMARY KEY auto_increment,
    head VARCHAR(100),
    posted_date DATETIME,
    url VARCHAR(255),
    cp_id INT NOT NULL
);

-- 좋아요(dibs) 테이블
CREATE TABLE IF NOT EXISTS dibs (
    id INT NOT NULL PRIMARY KEY auto_increment,
    type CHAR(1) DEFAULT 'n',
    content_id INT,
    usr_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 스크랩(scrap) 테이블
CREATE TABLE IF NOT EXISTS scrap (
    id INT NOT NULL PRIMARY KEY auto_increment,
    type CHAR(1) DEFAULT 'n',
    content_id INT,
    usr_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 회사(company) 테이블
CREATE TABLE IF NOT EXISTS company (
    id INT NOT NULL PRIMARY KEY auto_increment,
    name VARCHAR(30),
    image VARCHAR(255)
);

-- 선호하는 기술 스택(preferred_stack) 테이블
CREATE TABLE IF NOT EXISTS preferred_stack (
    id INT NOT NULL PRIMARY KEY auto_increment,
    usr_id INT NOT NULL,
    stack_id INT NOT NULL
);

-- 선호하는 회사(preferred_company) 테이블
CREATE TABLE IF NOT EXISTS preferred_company (
    id INT NOT NULL PRIMARY KEY auto_increment,
    usr_id INT NOT NULL,
    cp_id INT NOT NULL
);

-- 미디어(media) 테이블
CREATE TABLE IF NOT EXISTS media (
    id INT NOT NULL PRIMARY KEY auto_increment,
    name VARCHAR(50),
    logo VARCHAR(255)
);

INSERT INTO `media` VALUES (1,'중앙일보','    https://mimgnews.pstatic.net/image/upload/office_logo/025/2021/08/24/logo_025_6_20210824123340.png'),(2,'동아일보','https://mimgnews.pstatic.net/image/upload/office_logo/020/2019/01/22/logo_020_6_20190122142722.png'),(3,'경향신문','https://mimgnews.pstatic.net/image/upload/office_logo/032/2020/09/15/logo_032_6_20200915155035.png'),(4,'국민일보','https://mimgnews.pstatic.net/image/upload/office_logo/005/2020/09/15/logo_005_6_20200915155137.png'),(5,'문화일보','https://mimgnews.pstatic.net/image/upload/office_logo/021/2022/08/04/logo_021_6_20220804125325.png'),(6,'서울신문','https://mimgnews.pstatic.net/image/upload/office_logo/081/2022/01/07/logo_081_6_20220107180811.png'),(7,'세계일보','https://mimgnews.pstatic.net/image/upload/office_logo/022/2020/09/15/logo_022_6_20200915183753.png'),(8,'조선일보','https://mimgnews.pstatic.net/image/upload/office_logo/023/2020/09/03/logo_023_6_20200903164340.png'),(9,'한겨례','https://mimgnews.pstatic.net/image/upload/office_logo/028/2020/09/15/logo_028_6_20200915190845.png'),(10,'한국일보','https://mimgnews.pstatic.net/image/upload/office_logo/469/2020/09/15/logo_469_6_20200915191039.png'),(11,'뉴스1','https://mimgnews.pstatic.net/image/upload/office_logo/421/2017/01/05/logo_421_11_20170105110805.gif'),(12,'뉴시스','https://mimgnews.pstatic.net/image/upload/office_logo/003/2019/01/23/logo_003_6_20190123191323.jpg'),(13,'연합뉴스','https://mimgnews.pstatic.net/image/upload/office_logo/001/2017/01/05/logo_001_11_20170105111305.jpg'),(14,'연합뉴스TV','https://mimgnews.pstatic.net/image/upload/office_logo/422/2017/01/05/logo_422_11_20170105110805.gif'),(15,'채널A','https://mimgnews.pstatic.net/image/upload/office_logo/449/2020/09/15/logo_449_6_20200915190621.png'),(16,'한국경제TV','https://mimgnews.pstatic.net/image/upload/office_logo/215/2023/09/22/logo_215_6_20230922144846.png'),(17,'JTBC','https://mimgnews.pstatic.net/image/upload/office_logo/437/2018/09/19/logo_437_6_20180919153419.png'),(18,'KBS','https://mimgnews.pstatic.net/image/upload/office_logo/056/2020/09/15/logo_056_6_20200915153508.png'),(19,'MBC','https://mimgnews.pstatic.net/image/upload/office_logo/214/2020/09/15/logo_214_6_20200915153641.png'),(20,'MBN','https://mimgnews.pstatic.net/image/upload/office_logo/057/2020/09/15/logo_057_6_20200915153924.png'),(21,'SBS','https://mimgnews.pstatic.net/image/upload/office_logo/055/2020/09/15/logo_055_6_20200915154015.png'),(22,'SBS Biz','https://mimgnews.pstatic.net/image/upload/office_logo/374/2021/01/07/logo_374_6_20210107162903.png'),(23,'매일경제','https://mimgnews.pstatic.net/image/upload/office_logo/009/2018/10/05/logo_009_6_20181005175405.png'),(24,'머니투데이','https://mimgnews.pstatic.net/image/upload/office_logo/008/2020/09/24/logo_008_6_20200924115228.png'),(25,'비즈워치','https://mimgnews.pstatic.net/image/upload/office_logo/648/2023/02/13/logo_648_6_20230213165836.png'),(26,'서울경제','https://mimgnews.pstatic.net/image/upload/office_logo/011/2020/09/15/logo_011_6_20200915182907.png'),(27,'아시아경제','https://mimgnews.pstatic.net/image/upload/office_logo/277/2020/09/15/logo_277_6_20200915184035.png'),(28,'이데일리','https://mimgnews.pstatic.net/image/upload/office_logo/018/2020/09/15/logo_018_6_20200915185838.png'),(29,'조선비즈','https://mimgnews.pstatic.net/image/upload/office_logo/366/2020/09/15/logo_366_6_20200915190031.png'),(30,'조세일보','https://mimgnews.pstatic.net/image/upload/office_logo/123/2017/01/11/logo_123_6_20170111151211.jpg'),(31,'파이낸셜뉴스','https://mimgnews.pstatic.net/image/upload/office_logo/014/2020/09/18/logo_014_6_20200918175030.png'),(32,'한국경제','https://mimgnews.pstatic.net/image/upload/office_logo/015/2020/09/15/logo_015_6_20200915190950.png'),(33,'해럴드경제','https://mimgnews.pstatic.net/image/upload/office_logo/016/2019/01/22/logo_016_6_20190122142922.png'),(34,'노컷뉴스','https://mimgnews.pstatic.net/image/upload/office_logo/079/2020/09/15/logo_079_6_20200915155310.png'),(35,'더팩트','https://mimgnews.pstatic.net/image/upload/office_logo/629/2020/09/16/logo_629_6_20200916191806.png'),(36,'데일리안','https://mimgnews.pstatic.net/image/upload/office_logo/119/2020/09/15/logo_119_6_20200915174844.png'),(37,'머니S','https://mimgnews.pstatic.net/image/upload/office_logo/417/2020/09/15/logo_417_6_20200915182549.png'),(38,'미디어오늘','https://mimgnews.pstatic.net/image/upload/office_logo/006/2020/09/15/logo_006_6_20200915182709.png'),(39,'아이뉴스24','https://mimgnews.pstatic.net/image/upload/office_logo/031/2020/12/02/logo_031_6_20201202114450.png'),(40,'오마이뉴스','https://mimgnews.pstatic.net/image/upload/office_logo/047/2020/09/15/logo_047_6_20200915184324.png'),(41,'프레시안','https://mimgnews.pstatic.net/image/upload/office_logo/002/2018/09/19/logo_002_6_20180919150419.png'),(42,'디지털데일리','https://mimgnews.pstatic.net/image/upload/office_logo/138/2019/01/22/logo_138_6_20190122142522.png'),(43,'디지털타임스','https://mimgnews.pstatic.net/image/upload/office_logo/029/2020/08/07/logo_029_6_20200807185910.png'),(44,'블로터','https://mimgnews.pstatic.net/image/upload/office_logo/293/2020/09/15/logo_293_6_20200915182838.png'),(45,'전자신문','https://mimgnews.pstatic.net/image/upload/office_logo/030/2020/08/07/logo_030_6_20200807184834.png'),(46,'지디넷코리아','https://mimgnews.pstatic.net/image/upload/office_logo/092/2022/09/05/logo_092_6_20220905112542.png'),(47,'더스쿠프','https://mimgnews.pstatic.net/image/upload/office_logo/665/2022/11/24/logo_665_6_20221124175925.png'),(48,'레이디경향','https://mimgnews.pstatic.net/image/upload/office_logo/145/2020/09/15/logo_145_6_20200915191339.png'),(49,'매경이코노미','https://mimgnews.pstatic.net/image/upload/office_logo/024/2020/09/15/logo_024_6_20200915175103.png'),(50,'시사IN','https://mimgnews.pstatic.net/image/upload/office_logo/308/2020/09/15/logo_308_6_20200915190556.png'),(51,'시사저널','https://mimgnews.pstatic.net/image/upload/office_logo/586/2020/09/15/logo_586_6_20200915191139.png'),(52,'신동아','https://mimgnews.pstatic.net/image/upload/office_logo/262/2020/09/15/logo_262_6_20200915183818.png'),(53,'월간 산','https://mimgnews.pstatic.net/image/upload/office_logo/094/2020/09/15/logo_094_6_20200915185800.png'),(54,'이코노미스트','https://mimgnews.pstatic.net/image/upload/office_logo/243/2020/09/15/logo_243_6_20200915185921.png'),(55,'주간경향','https://mimgnews.pstatic.net/image/upload/office_logo/033/2020/09/15/logo_033_6_20200915190247.png'),(56,'주간동아','https://mimgnews.pstatic.net/image/upload/office_logo/037/2022/07/13/logo_037_6_20220713135116.png'),(57,'주간조선','https://mimgnews.pstatic.net/image/upload/office_logo/053/2020/09/15/logo_053_6_20200915190333.png'),(58,'중안SUNDAY','https://mimgnews.pstatic.net/image/upload/office_logo/353/2020/09/15/logo_353_6_20200915190359.png'),(59,'한겨례21','https://mimgnews.pstatic.net/image/upload/office_logo/036/2020/09/15/logo_036_6_20200915190904.png'),(60,'한경비즈니스','https://n.news.naver.com/mnews/article/050/0000068585'),(61,'기자협회보','https://mimgnews.pstatic.net/image/upload/office_logo/127/2017/11/30/logo_127_6_20171130120030.gif'),(62,'농민신문','https://mimgnews.pstatic.net/image/upload/office_logo/662/2022/04/29/logo_662_6_20220429195404.png'),(63,'뉴스타파','https://mimgnews.pstatic.net/image/upload/office_logo/607/2020/09/15/logo_607_6_20200915191237.png'),(64,'동아사이언스','https://mimgnews.pstatic.net/image/upload/office_logo/584/2020/09/15/logo_584_6_20200915191204.png'),(65,'여성신문','https://mimgnews.pstatic.net/image/upload/office_logo/310/2020/09/15/logo_310_6_20200915184129.png'),(66,'일다','https://mimgnews.pstatic.net/image/upload/office_logo/007/2020/09/15/logo_007_6_20200915185952.png'),(67,'코리아중앙데일리','https://mimgnews.pstatic.net/image/upload/office_logo/640/2020/08/04/logo_640_11_20200804095014.png'),(68,'코리아헤럴드','https://mimgnews.pstatic.net/image/upload/office_logo/044/2020/09/15/logo_044_6_20200915190716.png'),(69,'코메디닷컴','https://mimgnews.pstatic.net/image/upload/office_logo/296/2017/01/11/logo_296_6_20170111151211.jpg'),(70,'헬스조선','https://mimgnews.pstatic.net/image/upload/office_logo/346/2020/09/15/logo_346_6_20200915191114.png'),(71,'강원도민일보','https://mimgnews.pstatic.net/image/upload/office_logo/654/2022/01/24/logo_654_6_20220124173220.png'),(72,'강원일보','https://mimgnews.pstatic.net/image/upload/office_logo/087/2019/09/02/logo_087_6_20190902111302.png'),(73,'경기일보','https://mimgnews.pstatic.net/image/upload/office_logo/666/2023/01/05/logo_666_6_20230105135918.png'),(74,'국제신문','https://mimgnews.pstatic.net/image/upload/office_logo/658/2022/01/20/logo_658_11_20220120164912.png'),(75,'대구MBC','https://mimgnews.pstatic.net/image/upload/office_logo/657/2022/02/16/logo_657_6_20220216164248.png'),(76,'대전일보','https://mimgnews.pstatic.net/image/upload/office_logo/656/2022/01/24/logo_656_6_20220124173440.png'),(77,'매일신문','https://mimgnews.pstatic.net/image/upload/office_logo/088/2020/09/15/logo_088_6_20200915182417.png'),(78,'부산일보','https://mimgnews.pstatic.net/image/upload/office_logo/082/2020/09/15/logo_082_6_20200915182739.png'),(79,'전주MBC','https://mimgnews.pstatic.net/image/upload/office_logo/659/2022/01/24/logo_659_6_20220124173612.png'),(80,'CJB청주방송','https://mimgnews.pstatic.net/image/upload/office_logo/655/2022/01/24/logo_655_6_20220124173419.png'),(81,'JIBS','https://mimgnews.pstatic.net/image/upload/office_logo/661/2022/01/24/logo_661_6_20220124173713.png'),(82,'kbc광주방송','https://mimgnews.pstatic.net/image/upload/office_logo/660/2022/01/24/logo_660_6_20220124173640.png'),(83,'신화사 연합뉴스','https://mimgnews.pstatic.net/image/upload/office_logo/348/2017/01/05/logo_348_6_20170105111005.gif'),(84,'AP연합뉴스','https://mimgnews.pstatic.net/image/upload/office_logo/077/2017/01/11/logo_077_6_20170111151211.jpg'),(85,'EPA연합뉴스','https://mimgnews.pstatic.net/image/upload/office_logo/091/2017/01/11/logo_091_6_20170111151211.jpg'),(86,'TV조선','https://mimgnews.pstatic.net/image/upload/office_logo/448/2020/09/15/logo_448_6_20200915154233.png'),(87,'YTN','https://mimgnews.pstatic.net/image/upload/office_logo/052/2020/11/17/logo_052_6_20201117112951.png');

-- 기술 스택(stack) 테이블
CREATE TABLE IF NOT EXISTS stack (
    id INT NOT NULL PRIMARY KEY auto_increment,
    name VARCHAR(10)
);

-- 단어(words) 테이블
CREATE TABLE IF NOT EXISTS words (
    id int NOT NULL PRIMARY KEY auto_increment,
    write_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 키워드(keyword) 테이블
CREATE TABLE IF NOT EXISTS keyword (
    id INT NOT NULL PRIMARY KEY auto_increment,
    name VARCHAR(20),
    news_id INT NOT NULL,
    frequency INT
);

-- 추천 뉴스(recommend_news) 테이블
CREATE TABLE IF NOT EXISTS recommend_news (
    id INT NOT NULL PRIMARY KEY auto_increment,
    news_id INT,
    usr_id INT,
    is_read TINYINT default 0
);

-- 읽은 목록(read_news) 테이블
CREATE TABLE IF NOT EXISTS read_news (
    id INT NOT NULL PRIMARY KEY auto_increment,
    type CHAR(1) DEFAULT 'n',
    content_id INT,
    read_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usr_id INT NOT NULL
);

-- 헤드라인(headline) 테이블
CREATE TABLE IF NOT EXISTS headline (
    id INT NOT NULL PRIMARY KEY auto_increment,
    name VARCHAR(100)
);

-- 선호하는 헤드라인(preferred_headline) 테이블
CREATE TABLE IF NOT EXISTS preferred_headline (
    id INT NOT NULL PRIMARY KEY auto_increment,
    usr_id INT NOT NULL,
    hl_id INT NOT NULL
);

-- 카테고리(category) 테이블
CREATE TABLE IF NOT EXISTS category (
    id INT NOT NULL PRIMARY KEY auto_increment,
    name VARCHAR(20)
);

INSERT INTO `category` VALUES (1,'모바일'),(2,'인터넷/SNS'),(3,'통신/뉴미디어'),(4,'IT 일반'),(5,'보안/해킹'),(6,'컴퓨터'),(7,'게임/리뷰');


-- 외래 키 제약 조건 추가
ALTER TABLE news ADD CONSTRAINT FK_media_TO_news_1 FOREIGN KEY (media_id)
REFERENCES media (id);

ALTER TABLE news ADD CONSTRAINT FK_category_TO_news_1 FOREIGN KEY (cg_id)
REFERENCES category (id);

ALTER TABLE tech_blog ADD CONSTRAINT FK_company_TO_tech_blog_1 FOREIGN KEY (cp_id)
REFERENCES company (id);

ALTER TABLE dibs ADD CONSTRAINT FK_users_TO_dibs_1 FOREIGN KEY (usr_id)
REFERENCES users (id);

ALTER TABLE scrap ADD CONSTRAINT FK_users_TO_scrap_1 FOREIGN KEY (usr_id)
REFERENCES users (id);

ALTER TABLE preferred_stack ADD CONSTRAINT FK_users_TO_preferred_stack_1 FOREIGN KEY (usr_id)
REFERENCES users (id);

ALTER TABLE preferred_stack ADD CONSTRAINT FK_stack_TO_preferred_stack_1 FOREIGN KEY (stack_id)
REFERENCES stack (id);

ALTER TABLE preferred_company ADD CONSTRAINT FK_users_TO_preferred_company_1 FOREIGN KEY (usr_id)
REFERENCES users (id);

ALTER TABLE preferred_company ADD CONSTRAINT FK_company_TO_preferred_company_1 FOREIGN KEY (cp_id)
REFERENCES company (id);

ALTER TABLE keyword ADD CONSTRAINT FK_news_TO_keyword_1 FOREIGN KEY (news_id)
REFERENCES news (id);

ALTER TABLE read_news ADD CONSTRAINT FK_users_TO_read_news_1 FOREIGN KEY (usr_id)
REFERENCES users (id);

ALTER TABLE preferred_headline ADD CONSTRAINT FK_users_TO_preferred_headline_1 FOREIGN KEY (usr_id)
REFERENCES users (id);

ALTER TABLE preferred_headline ADD CONSTRAINT FK_headline_TO_preferred_headline_1 FOREIGN KEY (hl_id)
REFERENCES headline (id);


