CREATE DATABASE website;

USE website;

CREATE TABLE produto (
	id INT NOT NULL auto_increment PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    estoque INT NOT NULL,
    imagem VARCHAR(255) NULL);
    
CREATE TABLE clientes (
	id INT NOT NULL auto_increment PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(10) NOT NULL);
    
CREATE TABLE carrinho (
	id INT auto_increment PRIMARY KEY,
    cliente_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (produto_id) REFERENCES produto(id));
    
CREATE TABLE administradores (
	id INT NOT NULL PRIMARY KEY auto_increment,
    cliente_id INT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id));

INSERT INTO clientes (id, nome, email, senha) VALUES 
	(1, 'Administrador', 'admin@nodomain.com', 'secret')
    ;
    
INSERT INTO administradores (id, cliente_id) VALUES (NULL, 1);
    
INSERT into produto (nome, descricao, preco, estoque, imagem) VALUES
	('JOGO RODAS TSW ASAN ARO 17', 'Jogo de 4 Rodas TSW Modelo ASAN Aro 17x7 (5X100) ET40', 3419.00 , 5, 'roda_17_TSW_ASAN.png'),
    ('ADITIVO P/ GASOLINA BARDAHL MAXPOWER', 'Aditivo para veículos a gasolina. Embalagem 200ml trata até 60L de gasolina.', 42.00, 20, 'aditivo-bardahl-maxpower.png'),
    ('FILTRO DE AR CONICO K&N RG-1001RD', 'Modelo RG-1001D cônico universal de encaixe duplo (3 medidas de encaixe), importado', 379.00, 15, 'filtro-kn-rg1001d-lado.png'),
    ('MOLAS ESPORTIVAS EIBACH GOLF AUDI A3 2016/2021', 'Compatível Volkswagen Golf 1.0 TSI 1.4 TSI 1.6 MSI 16/.. Audi A3 Sedan 1.4 TFSI 16 anos 2016 até 2021', 1789.80, 10, 'molas-eibach-golf-audi-2016-2021.png'),
    ('ABAFADOR ESCAPAMENTO ESPORTIVO AÇO INOX LUZIAN LP205 3,5POL', 'Modelo LP205 com ponteira de 3,5" com efeito burned', 674.82, 15, 'kit-ronco-luzian-lp205-1.png'),
    ('BANCO ESPORTIVO CONCHA RECLINÁVEL PERSONALIZADO COM TRILHO', 'Compatível com a maioria dos veículos, revestimento em Couro Sintético ou Tecido', 1445.00, 30, 'banco-esportivo-concha-reclinavel.png')
    ;