import React, { useEffect, useState } from "react";
import { Input, Row, Col, Spin, Button, Space } from "antd";
import Pokemon from "./pokemon";
import "../styles/pokemons.css";

type Poke = { name: string; url: string };
type Type = { name: string; url: string };

const TYPE_COLORS: Record<string,string> = {
  normal:"#A8A878", fire:"#F08030", water:"#6890F0", electric:"#F8D030", grass:"#78C850",
  ice:"#98D8D8", fighting:"#C03028", poison:"#A040A0", ground:"#E0C068", flying:"#A890F0",
  psychic:"#F85888", bug:"#A8B820", rock:"#B8A038", ghost:"#705898", dark:"#705848",
  dragon:"#7038F8", steel:"#B8B8D0", fairy:"#EE99AC"
};

export default function Pokemons() {
  const [pokemons, setPokemons] = useState<Poke[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(res => res.json())
      .then(data => {
        setPokemons(data.results);
        setLoading(false);
      });

    fetch("https://pokeapi.co/api/v2/type")
      .then(res => res.json())
      .then(data => {
        const filteredTypes = data.results.filter((t: Type) => t.name !== "unknown" && t.name !== "shadow" && t.name !== "stellar");
        setTypes(filteredTypes);
      });
  }, []);

  const filtered = pokemons.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleType = (type: string) => {
    setTypeFilter(typeFilter === type ? null : type);
  }

  return (
    <div className="pokemons-container">
      <div className="header">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" />
        <p>Pokémon Explorer</p>
      </div>

      <Input
        placeholder="Search Pokémon..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        size="large"
        className="search-input"
      />

      <Space className="type-buttons">
        {types.map(t => (
          <Button
            key={t.name}
            type={typeFilter === t.name ? "primary" : "default"}
            onClick={() => handleType(t.name)}
            style={{ 
              backgroundColor: TYPE_COLORS[t.name] || undefined,
              color: "#fff",
              borderColor: "#444"
            }}
          >
            {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
          </Button>
        ))}
      </Space>

      {loading ? <Spin size="large" className="spinner"/> :
        <Row gutter={[16,16]}>
          {filtered.map((p,i) => (
            <Col xs={24} sm={12} md={8} lg={6} key={p.name}>
              <Pokemon name={p.name} url={p.url} typeFilter={typeFilter}/>
            </Col>
          ))}
        </Row>
      }
    </div>
  );
}
