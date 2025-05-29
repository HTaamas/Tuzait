-- Felhasználók tábla létrehozása
CREATE TABLE User (
    id INT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    beosztas VARCHAR(100),
    szazalek INT
);

-- Példa adatok beszúrása a User táblába
INSERT INTO User (id, nev, beosztas, szazalek) VALUES
('1', 'Szabó Alex Ciprián', 'Főnök', 25),
('2', 'Kiss Tamás', 'Programozó', 25),
('3', 'Major László', 'Hálózatos', 25),
('4', 'Tuza Miklós', 'Dokumentáció író', 25);