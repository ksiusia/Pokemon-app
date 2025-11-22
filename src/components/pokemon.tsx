import React, { useEffect, useState } from "react";
import "../styles/pokemon.css";

type PokemonProps = {
  url: string;
  name: string;
  typeFilter?: string | null;
};

const TYPE_COLORS: Record<string,string> = {
  normal:"#A8A878", fire:"#F08030", water:"#6890F0", electric:"#F8D030", grass:"#78C850",
  ice:"#98D8D8", fighting:"#C03028", poison:"#A040A0", ground:"#E0C068", flying:"#A890F0",
  psychic:"#F85888", bug:"#A8B820", rock:"#B8A038", ghost:"#705898", dark:"#705848",
  dragon:"#7038F8", steel:"#B8B8D0", fairy:"#EE99AC"
};

function Pokemon({ url, name, typeFilter }: PokemonProps) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(poke => setData(poke));
  }, [url]);

  if (!data) return <div className="pokemon-card loading">Loading...</div>;
  if (typeFilter && !data.types.some((t:any) => t.type.name === typeFilter)) return null;

  const primary = TYPE_COLORS[data.types[0].type.name] || "#888";
  const secondary = data.types[1] ? TYPE_COLORS[data.types[1].type.name] : primary;
  const bg = `linear-gradient(135deg, ${primary}, ${secondary})`;

  return (
    <div className="pokemon-card" style={{ background: bg }}>
      <span className="pokemon-id">#{data.id.toString().padStart(3,"0")}</span>
      <img src={data.sprites.front_default} alt={name} className="pokemon-img"/>
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <div className="types">
        {data.types.map((t:any) => (
          <span key={t.type.name}>{t.type.name}</span>
        ))}
      </div>
    </div>
  );
}

export default Pokemon;
