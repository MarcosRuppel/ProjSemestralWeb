-- Script para a criação do banco de dados a ser utilizado pelo website "AutoShop",
-- do projeto semestral de Programação Web.
-- Autoria: Marcos Paulo Ruppel - Turma 2U

CREATE DATABASE website DEFAULT CHARACTER SET utf8mb4;

USE website;

CREATE TABLE produto (
	id INT NOT NULL auto_increment PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    estoque INT NOT NULL,
    imagem VARCHAR(255) NULL);
    
CREATE TABLE cliente (
	id INT NOT NULL auto_increment PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nasc DATE NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(50) NOT NULL);
    
CREATE TABLE carrinho (
	id INT auto_increment PRIMARY KEY,
    cliente_id INT NOT NULL DEFAULT 1,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (produto_id) REFERENCES produto(id));

CREATE TABLE pagamento  (
    id INT NOT NULL PRIMARY KEY,
    cliente_id INT NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    valor_pago DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    forma_pgto VARCHAR(45) NULL,
    FOREIGN KEY (cliente_id) REFERENCES website.cliente(id)
);
    
CREATE TABLE admins (
	id INT NOT NULL PRIMARY KEY auto_increment,
    cliente_id INT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id));

INSERT INTO cliente (id, nome, data_nasc, email, senha) VALUES
	(1, 'Administrador', '1990-01-01', 'admin@nodomain.com', 'secret');
    
INSERT INTO admins (id, cliente_id) VALUES (NULL, 1);
    
INSERT into produto (nome, descricao, preco, estoque, imagem) VALUES
	('JOGO RODAS TSW ASAN ARO 17', 'Jogo de 4 Rodas TSW Modelo ASAN Aro 17x7 (5X100) ET40', 3419.00 , 5, '1.png'),
    ('ADITIVO P/ GASOLINA BARDAHL MAXPOWER', 'Aditivo para veículos a gasolina. Embalagem 200ml trata até 60L de gasolina.', 42.00, 30, '2.png'),
    ('FILTRO DE AR CONICO K&N RG-1001RD', 'Modelo RG-1001D cônico universal de encaixe duplo (3 medidas de encaixe), importado', 379.00, 15, '3.png'),
    ('MOLAS ESPORTIVAS EIBACH GOLF AUDI A3 2016/2021', 'Compatível Volkswagen Golf 1.0 TSI 1.4 TSI 1.6 MSI 16/.. Audi A3 Sedan 1.4 TFSI 16 anos 2016 até 2021', 1789.80, 10, '4.png'),
    ('ABAFADOR ESCAPAMENTO ESPORTIVO AÇO INOX LUZIAN LP205 3,5POL', 'Modelo LP205 com ponteira de 3,5" com efeito burned', 674.82, 15, '5.png'),
    ('BANCO ESPORTIVO CONCHA RECLINÁVEL PERSONALIZADO COM TRILHO', 'Compatível com a maioria dos veículos, revestimento em Couro Sintético ou Tecido', 1445.00, 10, '6.png'),
    ('INTAKE RACE CHROME RENAULT SANDERO RS 15/..VERMELHO - RCI COM FILTRO DE AR', 'Admissão de ar 50% mais eficiente, sob medida para o motor 2.0 F4R do Sandero RS modelo 2015 e superiores', 1180.00, 5, '7.png'),
    ('TURBINA AVIONICS T4 .72/1.00 PULSATIVA A40-4', 'Turbina de Duplo Fluxo (Pulsativa), Flange T4, Rotor Frio: 66/74.15, Rotor Quente: 65/88, Pressão da válvula até 2Kg', 2056.73, 5, '8.png'),
    ('CHIP POTÊNCIA PIGGYBACK AUDI A4 2.0 TFSI SEDAN AVANT','Compatível com veículos Audi A4 motor 2.0 TFSI anos 2017 e superiores, aumento de +54cv +9,1KGFM', 4994.00, 4, '9.png')
;

DELIMITER //
CREATE FUNCTION totalCarrinho() RETURNS INT DETERMINISTIC
BEGIN
  DECLARE total INT;
  SELECT SUM(quantidade) INTO total FROM carrinho;
  RETURN total;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER calcula_valor_total
BEFORE INSERT ON carrinho
FOR EACH ROW
BEGIN
	DECLARE valor_unitario DECIMAL(10, 2);
    SELECT preco INTO valor_unitario FROM produto WHERE id = NEW.produto_id;
    SET NEW.valor_total = NEW.quantidade * valor_unitario;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER atualizar_valor_total
BEFORE UPDATE ON carrinho
FOR EACH ROW
BEGIN
	DECLARE valor_unitario DECIMAL(10, 2);
    SELECT preco INTO valor_unitario FROM produto WHERE id = NEW.produto_id;
    SET NEW.valor_total = NEW.quantidade * valor_unitario;
END;
//
DELIMITER ;

CREATE VIEW vw_prod_sem_estoque AS
    SELECT id, nome, preco FROM produto
    WHERE estoque = 0;