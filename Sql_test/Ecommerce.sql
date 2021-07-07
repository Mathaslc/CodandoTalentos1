create database ecommerce;
use ecommerce;

create table users (
	id integer auto_increment not null,
	name varchar(255) not null,
	email varchar(255) not null,
	password varchar(255) not null,
	cpf bigint not null,
	cel varchar(50) null,
	fl_adm boolean not null default 0,
	constraint PK_users
		primary key (id)
)

create table cards (
	id integer auto_increment not null,
	user_id integer not null,
	card_number bigint not null,
	card_name varchar(255) not null,
	expiration date not null,
	card_cpf integer not null,
	nickname varchar(255) null,
	constraint PK_cards
		primary key (id),
	constraint FK_cards
		foreign key (user_id) references users(id)
		on update cascade
		on delete cascade 
)

create table address (
	id integer auto_increment not null,
	user_id integer not null,
	cep integer not null,
	street varchar(255) null,
	district varchar(255) null,
	address_number integer not null,
	fl_main_addr boolean not null default 0,
	constraint PK_address
		primary key (id),
	constraint FK_address
		foreign key (user_id) references users(id)
		on update cascade
		on delete cascade 
)

create table products (
	id integer auto_increment not null,
	name varchar(255) not null,
	description varchar(255) null,
	price decimal not null,
	slug varchar(255) not null,
	constraint PK_products
		primary key (id)
)

create table product_photos (
	id integer auto_increment not null,
	product_id integer not null,
	image varchar(255) not null,
	constraint PK_product_photos
		primary key (id),
	constraint FK_product_photos
		foreign key (product_id) references products(id)
)

create table categories (
	id integer auto_increment not null,
	name varchar(255) not null,
	description varchar(255) null,
	slug varchar(255) not null,
	constraint PK_categories
		primary key (id)
)

create table category_product (
	category_id integer not null,
	product_id integer not null,
	constraint PK_category_product
		primary key (category_id, product_id),
	constraint FK_category_product
		foreign key (product_id) references products(id)
		on update cascade
		on delete cascade,
		foreign key (category_id) references categories(id)
		on update cascade
		on delete cascade 
)

create table user_orders (
	id integer auto_increment not null,
	user_id integer not null,
	user_address integer not null,
	total decimal not null,
	shipping decimal not null,
	status varchar(30) not null,
	order_date timestamp not null,
	constraint PK_user_orders
		primary key (id),
	constraint FK_user_orders
		foreign key (user_id) references users(id)
		on update cascade
		on delete cascade,
		foreign key (user_address) references address(id)
		on update cascade
		on delete cascade 
)

create table user_order_product (
	order_id integer not null,
	produt_id integer not null,
	amount integer not null,
	constraint PK_user_order_product
		primary key (order_id,produt_id),
	constraint FK_user_order_product
		foreign key (order_id) references user_orders(id)
		on update cascade
		on delete cascade,
		foreign key (produt_id) references products(id)
		on update cascade
		on delete cascade 
)


alter table cards modify card_cpf bigint;


INSERT INTO users ( name, email, password, cpf, cel) VALUES ('usuario1', 'usuario1@test.com', '12345678',1112223334,'34988888888');
INSERT INTO users ( name, email, password, cpf, cel) VALUES ('usuario2', 'usuario2@test.com', '87654321',5556667778,'34999999999');
INSERT INTO address ( user_id , cep , street , district , address_number, fl_main_addr) VALUES (1, 38400389, 'Rua das ruas','Um bairro ai',0,1);
INSERT INTO address ( user_id , cep , street , district , address_number, fl_main_addr) VALUES (2, 38668389, 'Rua X','O bairro',100,1);
INSERT INTO cards ( user_id, card_number , card_name , expiration , card_cpf, nickname) VALUES (1, 4111111111111111, 'Joao Da Silva','2030-12-01',1233214567,'cartao mae');
INSERT INTO cards ( user_id, card_number , card_name , expiration , card_cpf, nickname) VALUES (2, 3222222222222222, 'Joao Pereira','2030-12-01',654745849801,'cartao pai');
INSERT INTO categories (name,description,slug) values ('Memoria Ram','Modulos de memoria para computadores','memoria-ram');
INSERT INTO categories (name,description,slug) values ('Processadores','Processadores Intel e AMD para computadores','processadores');
INSERT INTO products (name,description,price,slug) values ('AMD Ryzen 5 3600X','Processador AMD, SOCKET AM4...',2500,'amd-ryzen-5-3600x');
INSERT INTO products (name,description,price,slug) values ('Memoria Ram hyperx 8gb ddr4','CL15, 2666Mhz ...',350,'memoria-ram-hyperx-8gb-ddr4');
INSERT INTO products (name,description,price,slug) values ('Memoria Ram corsair 8gb ddr4','2933Mhz, CL16, 1,2v',300,'memoria-ram-corsair-8gb-ddr4');
INSERT INTO products (name,description,price,slug) values ('Processador Intedsdsad i7 10700K','lga 1200, 4.1ghz, 8c 16t',200,'processador-intedsdsad-i7-10700K');
INSERT INTO category_product (category_id,product_id) values (2,1);
INSERT INTO category_product (category_id,product_id) values (1,2);
INSERT INTO category_product (category_id,product_id) values (1,3);

select * from products p
	left join category_product cp on cp.product_id = p.id 
	left join categories c on c.id = cp.category_id ;

delete from products 
	where products.name like '%i7 10700K';


select c.name, count(*) as qtd_produtos from categories c 
	join category_product cp on cp.category_id = c.id 
	join products p on p.id = cp.product_id 
	group by c.name;

select c.name from products p 
	join category_product cp on p.id = cp.category_id 
	join categories c on c.id = cp.category_id
	group by ;


drop table user_order_product;
drop table user_orders;
drop table address;
drop table cards;
drop table users;
drop table product_photos;
drop table category_product;
drop table categories;
drop table products;
