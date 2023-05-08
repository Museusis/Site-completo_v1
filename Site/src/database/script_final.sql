Create Database sprint3;

use sprint3;

create table empresa(
idEmpresa int auto_increment primary key,
nomeFantasia varchar(45),
cnpj char(18),
cep char(9),
fkEmpresaMatriz int,
constraint foreign key (fkEmpresaMatriz) references empresa(idEmpresa)
);

create table usuario(
idUsuario int auto_increment,
nome varchar(50),
sobrenome varchar(50),
cpf char(11),
email varchar(50),
dtNasc date,
cidade varchar(45),
CEP char(9),
senha char(7),
confirmaSenha char(7),
fkEmp_U int,
constraint foreign key (fkEmp_U) references empresa(idEmpresa),
constraint pkUsuario primary key (idUsuario,fkEmp_U)
);

create table sala(
idSala int auto_increment primary key,
andar varchar(4),
ssla varchar(20),
fkEmp_S int,
constraint foreign key (fkEmp_S) references empresa(idEmpresa)
);

create table sensor(
idSensor int primary key auto_increment,
nome varchar(50),
fkSala int,
constraint foreign key (fkSala) references sala(idSala)
);

create table registro(
idRegistro int auto_increment,
temperatura double,
umidade double,
dtHora datetime default current_timestamp,
fkSensor int,
constraint foreign key (fkSensor) references sensor(idSensor),
constraint pkRegistro primary key (idRegistro,fkSensor)
);

insert into empresa values
(null,'MASP','123456789034567890','123456789','1');

insert into usuario values
(null,'brandão','fernando','12345678901','brandao@gmail.com','1985-10-02','1195587768','12345678','1');

insert into sala values
(null,'2','salinhaJK','1');

insert into sensor values
(null,'dht11_3','1');

insert into registro values
(null,18,49,default,1);

select*from empresa;
select*from empresa as matriz join empresa as filial on matriz.idEmpresa=filial.fkEmpresaMatriz;
select*from usuario;
select*from usuario join empresa on fkEmp_U=idEmpresa;
select*from sala;
select*from sala join empresa on fkEmp_S=idEmpresa;
select*from sala join sensor on fkSala=idSala;
select*from sensor;
select*from sensor join registro on fkSensor=idSensor;
select*from sensor;
select*from usuario
join  empresa as matriz on fkEmp_U=idEmpresa
join empresa as filial on matriz.idEmpresa=filial.fkEmpresaMatriz
join sala on fkEmp_S=matriz.idEmpresa
join sensor on fkSala=idSala
join registro on fkSensor=idSensor;